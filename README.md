# Chatbot

React + Vite frontend with an Express API and MongoDB-backed account registration and login.

## Local setup

1. Make sure MongoDB is running locally, or create a MongoDB Atlas cluster.
2. Copy `.env.example` to `.env` and set `MONGODB_URI` to your MongoDB connection string. Keep `.env` private.
3. Generate a session secret with `node -e "console.log(require('node:crypto').randomBytes(32).toString('hex'))"` and set it as `SESSION_SECRET` in `.env`.
4. In one terminal, run `npm run server`.
5. In another terminal, run `npm run dev`, then open the Vite URL it prints.

The API stores users in the `users` collection and login sessions in the `sessions` collection of the database set by `MONGODB_DB`. Passwords are hashed before they are stored. The MongoDB driver uses its default connection-pool settings; monitor MongoDB connection usage as traffic grows before changing pool options.

Before production deployment, set `NODE_ENV=production`, use HTTPS, a strong unique `SESSION_SECRET`, and a MongoDB account with only the required database permissions.
