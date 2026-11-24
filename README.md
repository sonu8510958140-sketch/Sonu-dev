# React + Vite

## Complaint API (Express + MongoDB)

### Admin status updates

Set `ADMIN_EMAIL` in the root `.env` to the registered admin account's email. Promote that account in `mongosh` (using the configured database):

```js
db.users.updateOne(
  { email: "admin@example.com" },
  { $set: { role: "admin" } }
)
```

Restart the API after changing `.env`. Only this logged-in account can change complaint statuses.

Set `MONGODB_URI` in a root `.env` file. See `.env.example` for the local MongoDB defaults. Keep database credentials on the server; never add them to frontend environment variables.

Install dependencies, then run the API and frontend in separate terminals:

```sh
npm run server
npm run dev
```

The frontend proxies `/api` requests to the Express API on port `3001`. Complaint submissions are saved in the `complaints` collection in the configured database. The API returns a reference number for each submission.

Signup saves accounts in the `users` collection with scrypt-hashed passwords, and login verifies credentials against those accounts.

This template provides a minimal setup to get React working in Vite with HMR and some Oxlint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Oxc](https://oxc.rs)
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/)

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the Oxlint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and Oxlint's TypeScript related rules in your project.
