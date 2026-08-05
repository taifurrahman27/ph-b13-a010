# 📚 Fable – Ebook Sharing Platform

Fable is a full-stack ebook sharing platform where readers can discover, purchase, and manage ebooks, while writers can publish and manage their own content after completing a one-time verification payment. An admin dashboard provides complete control over users, ebooks, and transactions.

## 🌐 Live Demo

* **Client:** https://ph-b13-a010.vercel.app
* **Server:** https://ph-b13-a010-server.vercel.app

---

## 🎯 Project Purpose

Fable aims to connect readers and writers through a secure and user-friendly ebook marketplace. The platform provides role-based dashboards, secure authentication, online payments, analytics, and ebook management to deliver a seamless digital reading experience.

---

## ✨ Key Features

* Secure authentication using Better Auth
* Email/Password and Google Sign-In
* JWT-based authorization
* Role-based access (Reader, Writer, Admin)
* Browse and search ebooks
* Ebook details page
* Purchase ebooks using Stripe Checkout
* Reader purchase history
* Bookmark favorite ebooks
* Writer dashboard for managing ebooks
* Admin dashboard for user and ebook management
* Analytics dashboard
* Image upload with ImgBB
* Responsive design for desktop, tablet, and mobile
* Protected routes and secure API endpoints

---

## 🛠️ Technologies Used

### Frontend

* Next.js (App Router)
* React
* Tailwind CSS
* HeroUI
* React Icons
* React Hot Toast

### Backend

* Node.js
* Express.js
* MongoDB
* Better Auth
* JOSE (JWT Verification)

### Payment

* Stripe

### Image Hosting

* ImgBB API

### Deployment

* Vercel (Frontend)
* Vercel (Backend)

---

## 📦 NPM Packages Used

### Frontend

```bash
next
react
react-dom
tailwindcss
@heroui/react
better-auth
react-hot-toast
react-icons
```

### Backend

```bash
express
mongodb
better-auth
@better-auth/mongodb
jose
cors
dotenv
stripe
```

---

## ⚙️ Installation

### Clone the repository

```bash
git clone <your-client-repository-url>
```

```bash
cd <project-folder>
```

### Install dependencies

```bash
npm install
```

### Configure environment variables

Create a `.env.local` (frontend) and `.env` (backend) file with the required environment variables.

Example:

```env
NEXT_PUBLIC_SERVER_URL=your_server_url
BETTER_AUTH_SECRET=your_secret
MONGODB_URI=your_mongodb_uri
STRIPE_SECRET_KEY=your_stripe_secret
IMGBB_API_KEY=your_imgbb_key
```

### Start the development server

Frontend

```bash
npm run dev
```

Backend

```bash
npm run dev
```

---

## 📂 User Roles

### Reader

* Browse ebooks
* Purchase ebooks
* Bookmark ebooks
* View purchase history

### Writer

* Upload ebooks
* Edit ebooks
* Delete ebooks
* View analytics

### Admin

* Manage users
* Manage ebooks
* View platform statistics
* Monitor transactions

---

## 🔒 Authentication

* Email & Password Login
* Google OAuth Login
* JWT Authentication
* Protected Routes
* Role-Based Authorization

---

## 👨‍💻 Author

**Taifur Rahman**

TR TECH
