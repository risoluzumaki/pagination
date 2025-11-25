# Vanilla client — pagination demo

This is a tiny demo client that pulls paginated contact data from the server and shows a small pagination UI. The client now uses the server pagination metadata (total, totalPages) so it can display accurate page information and allow jumping directly to a page.

API used:
- GET http://localhost:3000/api/v1/contacts?page={page}&limit={limit}

Features:
- Previous / Next
- Per-page selector (5 / 10 / 20)
- Jump-to-page input + Go button
- Accurate page information using server metadata: total and totalPages

How to run (local dev):

1. Make sure the server is running. The server lives in `server/node-express-ts` and listens on port 3000 by default.
   - Start server (example):

```bash
# from repository root
cd server/node-express-ts
npm install
npm run dev
```

2. Start the client (vite):

```bash
cd client/vanilla
npm install
npm run dev
```

3. Open the client in the browser (Vite default port is 5173). If you run the client and server on different origins, the server must enable CORS.

Quick note about CORS ⚠️
- The Express TypeScript server in this repo doesn't include CORS middleware by default. If the client (vite) runs on a different origin and your browser blocks requests, enable CORS in the server with the `cors` package, for example:

```ts
// bootstrapp.ts
import cors from 'cors'
app.use(cors())
```

That's it — the client will call `/api/v1/contacts?page=&limit=` and handle simple previous/next UX based on the returned array size.
