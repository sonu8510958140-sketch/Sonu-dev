# React + Vite

## Firebase password reset

The forgot-password page sends a password-reset email with Firebase Authentication.
To configure it:

1. Create a Firebase project and register a web app in the Firebase console.
2. Enable **Email/Password** under **Authentication → Sign-in method**.
3. Add the website domain under **Authentication → Settings → Authorized domains**.
4. Copy `.env.example` to `.env` and set the Firebase web app's API key, auth domain,
   project ID, and app ID.
5. Restart the Vite development server after changing `.env`.

The reset page submits the account email; Firebase sends the reset link. Configure
the email template and allowed redirect URL from the Firebase console as needed.

## MongoDB local development

The MongoDB connection runs in the Node.js server, not in browser code. Install and
start MongoDB locally, then copy `.env.example` to `.env`. Keep the Firebase values
and set `MONGODB_URI` to your local MongoDB URI or MongoDB Atlas connection string.
Set `MONGODB_DB` to the database name. Do not commit `.env` or expose the MongoDB
URI through a `VITE_` variable.

Run `npm run dev:server` in one terminal and `npm run dev` in another. The server
connects once at startup and exposes `GET /api/health`; from the Vite app, visit
`/api/health` to verify the connection. The MongoDB driver defaults are used for
this low-traffic development setup; tune pool settings only if measured workload
requires it.

This template provides a minimal setup to get React working in Vite with HMR and some Oxlint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Oxc](https://oxc.rs)
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/)

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the Oxlint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and Oxlint's TypeScript related rules in your project.
