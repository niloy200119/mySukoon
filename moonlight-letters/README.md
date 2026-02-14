# 🌸 Moonlight Letters

A soft, dreamy, pastel-toned Valentine's Day web application — handcrafted with love.

> *"You are my quiet miracle."*

## ✨ Features

- **Cinematic Landing Page** — Floating clouds, sparkle particles, dreamy gradient
- **Our Story Timeline** — Romantic vertical timeline with animated cards
- **Love Reasons Gallery** — 3D-tilt glassmorphism cards with staggered animations
- **Secret Letter** — Password-protected letter with line-by-line typing animation & falling petals
- **Memory Garden** — Masonry gallery with blur-to-clear reveals & lightbox
- **Countdown** — Animated circular progress rings counting to Valentine's Day & anniversary
- **Forever Finale** — Confetti heart explosion & "Every lifetime" reveal
- **Admin Dashboard** — Full CRUD for all content via a hidden `/admin` route

## 🛠 Tech Stack

| Frontend | Backend |
|----------|---------|
| React 19 + Vite | Node.js + Express 5 |
| Tailwind CSS v4 | MongoDB + Mongoose |
| Framer Motion | JWT + bcrypt |
| React Router | REST API |
| Axios | MVC Architecture |
| Lucide Icons | |

## 📦 Project Structure

```
moonlight-letters/
├── client/                  # React frontend
│   └── src/
│       ├── components/      # Navbar, Footer, Sparkles, etc.
│       ├── pages/           # All pages
│       ├── hooks/           # Custom hooks
│       └── services/        # API layer
├── server/                  # Express backend
│   ├── config/              # DB connection
│   ├── controllers/         # Route handlers
│   ├── middleware/           # Auth middleware
│   ├── models/              # Mongoose schemas
│   ├── routes/              # API routes
│   └── seed.js              # Database seeder
└── README.md
```

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- MongoDB (local or Atlas)

### 1. Clone & Install

```bash
# Server
cd moonlight-letters/server
npm install

# Client
cd ../client
npm install
```

### 2. Environment Setup

Create `server/.env`:

```env
NODE_ENV=development
PORT=5000
MONGO_URI=mongodb://localhost:27017/moonlight-letters
JWT_SECRET=your_secret_key_change_this
```

### 3. Seed Database

```bash
cd server
node seed.js
```

This creates:
- Admin user: `admin` / `admin123`
- 5 timeline events
- 8 love reasons
- 1 secret letter (password: `iloveyou`)
- 6 gallery images (Unsplash placeholders)

### 4. Run Development

```bash
# Terminal 1 — Server
cd server
node index.js

# Terminal 2 — Client
cd client
npm run dev
```

The client proxies `/api` requests to `http://localhost:5000`.

## 🎨 Design Palette

| Name | Color |
|------|-------|
| Blush Pink | `#f8d7e3` |
| Soft Peach | `#ffe5d4` |
| Cream White | `#fff8f2` |
| Lavender Mist | `#e8e6ff` |
| Warm Rose | `#f4a6b5` |
| Dusty Mauve | `#c38eb4` |

## 🌐 Deployment

### Frontend (Vercel)

1. Connect your repo to [Vercel](https://vercel.com)
2. Set root directory to `client`
3. Build command: `npm run build`
4. Output directory: `dist`
5. Add environment variable: `VITE_API_URL` = your backend URL

### Backend (Render)

1. Create a new Web Service on [Render](https://render.com)
2. Set root directory to `server`
3. Build command: `npm install`
4. Start command: `node index.js`
5. Add environment variables: `MONGO_URI`, `JWT_SECRET`, `NODE_ENV=production`

## 🔒 Admin Access

Navigate to `/admin` and log in with the seeded credentials.

## 📝 Customization

- **Her Name**: Edit `LandingPage.jsx` — change "Sukoon" to her name
- **Anniversary Date**: Edit `CountdownPage.jsx` — update `anniversaryDate`
- **Colors**: Edit `src/index.css` — modify the `@theme` block
- **Fonts**: Change Google Fonts links in `index.html`

---

*Made with 🌸 under moonlight*
