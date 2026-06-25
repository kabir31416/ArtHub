# 🎨 ArtHub

ArtHub is a modern digital artwork marketplace where artists can upload and sell their artwork, and users can discover and purchase digital art through a clean and responsive interface.

---

## 🌐 Live Website

https://art-hub-369.vercel.app/

---

## 🎯 Project Purpose

ArtHub provides a secure marketplace for digital artists to showcase and monetize their work while allowing buyers to browse, purchase, and manage their digital artwork collection.

---

## ✨ Key Features

- 🔐 Authentication with Email/Password & Google Login
- 👤 Role-based Dashboard (User, Artist, Admin)
- 🎨 Artists can upload, edit and delete artworks
- 🖼️ Artwork details page with modern product layout
- 📷 Image upload using ImgBB
- ❤️ Purchase system with subscription limits
- 💳 Subscription plans (Free, Pro, Premium)
- 📊 Dashboard for managing artworks and purchases
- 📱 Fully responsive design
- ⚡ Protected routes based on user role

---

## 🛠️ Tech Stack

### Frontend

- Next.js 16
- React
- Tailwind CSS
- React Icons
- Lucide React

### Backend

- Node.js
- Express.js
- MongoDB
- Better Auth

---

## 📦 NPM Packages Used

### Frontend

```bash
next
react
react-dom
tailwindcss
react-icons
lucide-react
better-auth
```

### Backend

```bash
express
mongodb
better-auth
cors
dotenv
```

---

## 🚀 Installation

Clone the repository

```bash
git clone  https://github.com/kabir31416/ArtHub
```

Install dependencies

```bash
npm install
```

Run development server

```bash
npm run dev
```

---

## 🔑 Environment Variables

Frontend

```env
NEXT_PUBLIC_SERVER_URL=
NEXT_PUBLIC_IMGBB_API=
NEXT_PUBLIC_APP_URL=
```

Backend

```env
MONGODB_URI=
GOOGLE_CLIENT_ID=
GOOGLE_CLIENT_SECRET=
BETTER_AUTH_SECRET=
BETTER_AUTH_URL=
```

---

## 👥 User Roles

### User

- Browse artworks
- Purchase artworks
- Manage subscription
- View purchase history

### Artist

- Upload artworks
- Edit artworks
- Delete artworks
- View sales

### Admin

- Manage users
- Manage artworks
- View transactions
- View analytics

---

## 📄 License

This project is developed for educational purposes.
