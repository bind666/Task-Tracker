# 📝 Task Tracker (MERN Stack)

A full-stack Task Management App built with **React**, **Express**, **MongoDB**, and **Node.js**.  
Users can register, log in, manage projects and tasks with authentication using **JWT** and cookies.

---

## 🚀 Features

- ✅ Signup & Login (JWT Auth with HttpOnly Cookies)
- 🧑‍💼 User profile
- 📁 Create & manage Projects (max 4 per user)
- 📌 Full CRUD for Tasks under Projects
- 📊 Protected Routes with role-based access
- 🎯 Filtered task views
- 🌐 Responsive UI

---

## 🛠 Tech Stack

| Frontend       | Backend           | Auth            | Hosting (Free)  |
|----------------|-------------------|------------------|------------------|
| React (Vite)   | Node.js + Express | JWT + Cookies   | Vercel (FE), Render (BE) |
| Tailwind CSS   | MongoDB (Atlas)   | Axios + Interceptor | MongoDB Atlas  |

---

## 📁 Folder Structure

```bash
frontend/       # React frontend
backend/        # Node.js + Express backend

env already provided in repo

💻 Local Setup
1️⃣ Clone the Repo or /download zip and extraxt

git clone https://github.com/your-username/task-tracker.git
cd task-tracker

2️⃣ Setup Backend
cd backend
npm install
npm run dev

3️⃣ Setup Frontend
cd frontend
npm install
npm run dev
Visit: http://localhost:5173 or 5174 whatever provided by vite



