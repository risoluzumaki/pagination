# Simple Pagination — Fullstack Demo

![status](https://img.shields.io/badge/status-prototype-orange)
![Node.js](https://img.shields.io/badge/Node.js-%3E%3D18-brightgreen?logo=node.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5.9-blue?logo=typescript)
![Express](https://img.shields.io/badge/Express-5.x-lightgrey?logo=express)
![Vite](https://img.shields.io/badge/Vite-7.2.4-646cff?logo=vite)
![PostgreSQL](https://img.shields.io/badge/Postgres-13-blue?logo=postgresql)

Project ini adalah demo sederhana tentang pagination (server-side) yang terdiri dari:
- Server: Node + Express + TypeScript — menyediakan endpoint paginated contacts (GET /api/v1/contacts?page=&limit=)
- Client: dua contoh client — sebuah client ringan Vanila (Vite) dan contoh React (client/react)
- Database: PostgreSQL (migrations ada di folder server/migration/postgre)

Tujuan:
- Contoh arsitektur minimal fullstack yang menunjukkan cara menerapkan pagination di server dan bagaimana client mengkonsumsi API paginated.

---

## Struktur singkat

- server/node-express-ts — Express + TypeScript backend (port 3000)
- client/vanilla — Frontend kecil, Vite, implementasi pagination (UI + logic) yang sudah ditambahkan
- client/react — contoh React app (boilerplate)
- server/migration/postgre — SQL untuk membuat tabel contacts dan mengisi dummy data

---

## Cara menjalankan (quick start)

Berikut langkah cepat untuk menjalankan seluruh demo ini di mesin lokal (menggunakan bash). Pastikan kamu punya Node.js (>18), npm/yarn, dan Docker (opsional untuk PostgreSQL).

1) Jalankan PostgreSQL (opsional — kalau sudah punya DB, sesuaikan env)

	- Jalankan dengan Docker Compose (direkomendasikan untuk testing cepat):

```bash
cd server/node-express-ts/
docker compose -f docker/docker-compose up -d
```

	- File .env di `server/node-express-ts/.env` sudah berisi default yang digunakan oleh docker-compose.

2) Jalankan server Express (TypeScript)

```bash
cd server/node-express-ts
npm install
npm run dev
```

Server default akan berjalan di http://localhost:3000

3) Jalankan client vanilla (frontend yang sudah berisi pagination)

```bash
cd client/vanilla
npm install
npm run dev
```

Buka browser ke URL Vite (biasanya http://localhost:5173). Client akan memanggil endpoint:

```
GET http://localhost:3000/api/v1/contacts?page={page}&limit={limit}
```

Jika kamu menjalankan server dan client di origin berbeda (mis. vite di 5173 dan server di 3000), pastikan server mengizinkan CORS.

Contoh menambahkan CORS di server (quick):

---

## API (singkat)

- GET /api/v1/contacts?page={number}&limit={number}
	- Response: array of contact objects
	- Contact: { id, name, email, phone }