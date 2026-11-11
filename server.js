import 'dotenv/config'
import bcrypt from 'bcryptjs'
import MongoStore from 'connect-mongo'
import { rateLimit } from 'express-rate-limit'
import express from 'express'
import session from 'express-session'
import { MongoClient, ObjectId } from 'mongodb'

const { MONGODB_URI, MONGODB_DB = 'chatbot', SESSION_SECRET } = process.env
const port = Number(process.env.API_PORT || 3001)

if (!MONGODB_URI) {
  throw new Error('MONGODB_URI is required. Add it to your .env file.')
}

if (!SESSION_SECRET || SESSION_SECRET.length < 32) {
  throw new Error('SESSION_SECRET must be set to a random value of at least 32 characters.')
}

const client = new MongoClient(MONGODB_URI)
const clientPromise = client.connect()
const app = express()

app.disable('x-powered-by')
app.use(express.json({ limit: '10kb' }))
app.use(session({
  name: 'chatbot.sid',
  secret: SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  store: MongoStore.create({
    clientPromise,
    dbName: MONGODB_DB,
    collectionName: 'sessions',
    ttl: 60 * 60 * 24 * 7,
  }),
  cookie: {
    httpOnly: true,
    sameSite: 'strict',
    secure: process.env.NODE_ENV === 'production',
    maxAge: 1000 * 60 * 60 * 24 * 7,
  },
}))

const authRateLimit = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 10,
  standardHeaders: 'draft-8',
  legacyHeaders: false,
  message: { error: 'Too many attempts. Please try again later.' },
})

const sendUser = (user) => ({
  id: user._id.toString(),
  name: user.name,
  email: user.email,
})

const getUserId = (request) => {
  const { userId } = request.session
  return typeof userId === 'string' && ObjectId.isValid(userId)
    ? new ObjectId(userId)
    : null
}

async function startServer() {
  await clientPromise
  const database = client.db(MONGODB_DB)
  const users = database.collection('users')
  await users.createIndex({ email: 1 }, { unique: true })

  app.post('/api/auth/register', authRateLimit, async (request, response) => {
    const { name, email, password, confirmPassword } = request.body ?? {}

    if (typeof name !== 'string' || name.trim().length < 1 || name.trim().length > 80) {
      return response.status(400).json({ error: 'Name must be between 1 and 80 characters.' })
    }

    if (typeof email !== 'string' || email.length > 254 || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return response.status(400).json({ error: 'Enter a valid email address.' })
    }

    if (typeof password !== 'string' || password.length < 8 || Buffer.byteLength(password, 'utf8') > 72) {
      return response.status(400).json({ error: 'Password must be at least 8 characters and no more than 72 bytes.' })
    }

    if (password !== confirmPassword) {
      return response.status(400).json({ error: 'Passwords do not match.' })
    }

    const normalizedEmail = email.trim().toLowerCase()

    try {
      const passwordHash = await bcrypt.hash(password, 12)
      const result = await users.insertOne({
        name: name.trim(),
        email: normalizedEmail,
        passwordHash,
        createdAt: new Date(),
      })

      return response.status(201).json({
        message: 'Account created. You can now log in.',
        user: { id: result.insertedId.toString(), name: name.trim(), email: normalizedEmail },
      })
    } catch (error) {
      if (error.code === 11000) {
        return response.status(409).json({ error: 'An account with this email already exists.' })
      }

      throw error
    }
  })

  app.post('/api/auth/login', authRateLimit, async (request, response) => {
    const { email, password } = request.body ?? {}

    if (typeof email !== 'string' || typeof password !== 'string') {
      return response.status(400).json({ error: 'Enter your email and password.' })
    }

    const user = await users.findOne({ email: email.trim().toLowerCase() })
    const passwordMatches = user
      ? await bcrypt.compare(password, user.passwordHash)
      : false

    if (!user || !passwordMatches) {
      return response.status(401).json({ error: 'Invalid email or password.' })
    }

    await new Promise((resolve, reject) => {
      request.session.regenerate((error) => (error ? reject(error) : resolve()))
    })
    request.session.userId = user._id.toString()
    await new Promise((resolve, reject) => {
      request.session.save((error) => (error ? reject(error) : resolve()))
    })

    return response.json({ message: 'Login successful.', user: sendUser(user) })
  })

  app.get('/api/auth/me', async (request, response, next) => {
    const userId = getUserId(request)
    if (!userId) return response.json({ user: null })

    const user = await users.findOne(
      { _id: userId },
      { projection: { name: 1, email: 1 } },
    )

    if (!user) {
      return request.session.destroy((error) => {
        if (error) return next(error)
        return response.json({ user: null })
      })
    }

    return response.json({ user: sendUser(user) })
  })

  app.post('/api/auth/logout', (request, response, next) => {
    request.session.destroy((error) => {
      if (error) return next(error)
      response.clearCookie('chatbot.sid', { httpOnly: true, sameSite: 'strict' })
      return response.status(204).end()
    })
  })

  app.use('/api', (request, response) => {
    response.status(404).json({ error: 'API route not found.' })
  })

  app.use((error, request, response, next) => {
    console.error('API request failed:', error)
    if (response.headersSent) return next(error)
    return response.status(500).json({ error: 'Something went wrong. Please try again.' })
  })

  const server = app.listen(port, () => {
    console.log(`Chatbot API listening on http://localhost:${port}`)
  })

  const shutdown = () => {
    server.close(async () => {
      await client.close()
      process.exit(0)
    })
  }

  process.once('SIGINT', shutdown)
  process.once('SIGTERM', shutdown)
}

startServer().catch(async (error) => {
  console.error('Could not start the Chatbot API:', error)
  await client.close()
  process.exitCode = 1
})
