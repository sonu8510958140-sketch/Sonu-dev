require("dotenv").config();

const path = require("node:path");
const { promisify } = require("node:util");
const {
    randomBytes,
    scrypt: scryptCallback,
    timingSafeEqual,
} = require("node:crypto");
const express = require("express");
const session = require("express-session");
const MongoStore = require("connect-mongo").default;
const mongoose = require("mongoose");
const rateLimit = require("express-rate-limit");

const scrypt = promisify(scryptCallback);
const app = express();
const port = Number(process.env.PORT) || 3000;
const mongoUri = process.env.MONGODB_URI;
const sessionSecret = process.env.SESSION_SECRET;

if (!mongoUri) {
    throw new Error("MONGODB_URI is required. Set it in your .env file.");
}

if (!sessionSecret || sessionSecret.length < 32) {
    throw new Error("SESSION_SECRET is required and must be at least 32 characters.");
}

const mongoClientPromise = mongoose
    .connect(mongoUri)
    .then(() => mongoose.connection.getClient());

const userSchema = new mongoose.Schema(
    {
        email: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            trim: true,
            maxlength: 254,
        },
        passwordHash: {
            type: String,
            required: true,
            select: false,
        },
    },
    { timestamps: true },
);

const User = mongoose.model("User", userSchema);

async function hashPassword(password) {
    const salt = randomBytes(16).toString("hex");
    const derivedKey = await scrypt(password, salt, 64);
    return `${salt}:${derivedKey.toString("hex")}`;
}

async function verifyPassword(password, storedHash) {
    const [salt, keyHex] = storedHash.split(":");
    if (!salt || !keyHex || !/^[a-f\d]+$/i.test(keyHex)) {
        return false;
    }

    const expectedKey = Buffer.from(keyHex, "hex");
    const derivedKey = await scrypt(password, salt, expectedKey.length);
    return expectedKey.length === derivedKey.length
        && timingSafeEqual(expectedKey, derivedKey);
}

function validCredentials(email, password) {
    return typeof email === "string"
        && email.length <= 254
        && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
        && typeof password === "string"
        && password.length >= 12
        && Buffer.byteLength(password, "utf8") <= 1024;
}

function regenerateSession(req) {
    return new Promise((resolve, reject) => {
        req.session.regenerate((error) => {
            if (error) {
                reject(error);
                return;
            }
            resolve();
        });
    });
}

function saveSession(req) {
    return new Promise((resolve, reject) => {
        req.session.save((error) => {
            if (error) {
                reject(error);
                return;
            }
            resolve();
        });
    });
}

const authLimiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 20,
    standardHeaders: true,
    legacyHeaders: false,
});

app.disable("x-powered-by");
app.use(express.urlencoded({ extended: false, limit: "10kb", parameterLimit: 10 }));
app.use(
    session({
        name: "trendora.sid",
        secret: sessionSecret,
        resave: false,
        saveUninitialized: false,
        store: MongoStore.create({
            clientPromise: mongoClientPromise,
            collectionName: "sessions",
        }),
        cookie: {
            httpOnly: true,
            sameSite: "lax",
            secure: process.env.NODE_ENV === "production",
            maxAge: 7 * 24 * 60 * 60 * 1000,
        },
    }),
);
app.use(express.static(__dirname));

app.get(["/login", "/login.html"], (req, res) => {
    res.sendFile(path.join(__dirname, "login.html"));
});

app.get(["/signup", "/signup.html"], (req, res) => {
    res.sendFile(path.join(__dirname, "signup.html"));
});

app.get(["/men", "/men.html"], (req, res) => {
    res.sendFile(path.join(__dirname, "men.html"));
});

app.get(["/women", "/women.html"], (req, res) => {
    res.sendFile(path.join(__dirname, "women.html"));
});

app.get(["/cart", "/cart.html"], (req, res) => {
    res.sendFile(path.join(__dirname, "cart.html"));
});

app.get(["/payment", "/payment.html"], (req, res) => {
    res.sendFile(path.join(__dirname, "payment.html"));
});

app.get(["/kid", "/kids", "/kids.html"], (req, res) => {
    res.sendFile(path.join(__dirname, "kids.html"));
});

app.post("/signup", authLimiter, async (req, res, next) => {
    const body = req.body ?? {};
    const email = typeof body.email === "string"
        ? body.email.trim().toLowerCase()
        : "";
    const { password } = body;

    if (typeof password === "string" && typeof body.confirmPassword === "string"
        && password !== body.confirmPassword) {
        res.redirect(303, "/signup?error=passwordMismatch");
        return;
    }

    if (!validCredentials(email, password)) {
        res.redirect(303, "/signup?error=invalidInput");
        return;
    }

    try {
        const passwordHash = await hashPassword(password);
        await User.create({ email, passwordHash });
        res.redirect(303, "/login?success=created");
    } catch (error) {
        if (error.code === 11000) {
            res.redirect(303, "/signup?error=exists");
            return;
        }
        next(error);
    }
});

app.post("/login", authLimiter, async (req, res, next) => {
    const body = req.body ?? {};
    const email = typeof body.email === "string"
        ? body.email.trim().toLowerCase()
        : "";
    const { password } = body;

    if (!email || typeof password !== "string" || password.length > 1024) {
        res.redirect(303, "/login?error=invalid");
        return;
    }

    try {
        const user = await User.findOne({ email }).select("+passwordHash");
        if (!user || !(await verifyPassword(password, user.passwordHash))) {
            res.redirect(303, "/login?error=invalid");
            return;
        }

        await regenerateSession(req);
        req.session.userId = user.id;
        await saveSession(req);
        res.redirect(303, "/");
    } catch (error) {
        next(error);
    }
});

app.post("/logout", (req, res, next) => {
    req.session.destroy((error) => {
        if (error) {
            next(error);
            return;
        }
        res.clearCookie("trendora.sid");
        res.redirect(303, "/");
    });
});

app.get("/api/me", async (req, res, next) => {
    if (!req.session.userId) {
        res.status(401).json({ error: "Not logged in" });
        return;
    }

    try {
        const user = await User.findById(req.session.userId).select("email");
        if (!user) {
            res.status(401).json({ error: "Not logged in" });
            return;
        }
        res.json({ email: user.email });
    } catch (error) {
        next(error);
    }
});

app.use((error, req, res, next) => {
    console.error("Request failed:", error);
    if (res.headersSent) {
        next(error);
        return;
    }
    res.status(500).send("An unexpected server error occurred.");
});

async function start() {
    await mongoClientPromise;
    app.listen(port, () => {
        console.log(`Trendora server listening at http://localhost:${port}`);
    });
}

start().catch((error) => {
    console.error("Unable to start Trendora server:", error);
    process.exitCode = 1;
});
