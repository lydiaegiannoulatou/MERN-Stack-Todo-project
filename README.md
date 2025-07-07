# 📝 MERN Todo App

A modern full-stack Todo application built using the **MERN stack**: MongoDB, Express, React (with Vite), and Node.js.

Includes a theme toggle, responsive layout, and persistent tasks.

---

## ⚙️ Tech Stack

### 🖼️ Frontend (Vite + React 19)

- React 19
- Vite
- Axios
- Lucide React Icons

### 🛠️ Backend (Node + Express + MongoDB)

- Express.js
- Mongoose
- MongoDB
- Nodemon

---

## 📁 Project Structure

```bash
todoMern/
├── client/
│ └── viteMernTodo-Client/ # React + Vite frontend
├── backend/ # Express backend
│ └── server.js
└── README.md
```

---

## 🚀 Getting Started

### 🧩 1. Clone the repository

```bash
git clone https://github.com/lydiaegiannoulatou/MERN-Stack-Todo-project.git
cd todoMern
```

## 🔌 2. Backend Setup

```bash
cd backend
npm install
```

### Create a .env file:

```
PORT=5000
MONGODB_URI=your_mongodb_connection_string
```

### Start the server:

```bash
npm start
```

## 💻 3. Frontend Setup

```bash
cd client/viteMernTodo-Client
npm install
npm run dev
```

Runs at http://localhost:5173

### Create a .env file:

```
VITE_API=https://your-backend-api-url.com
```

---

## 🌐 Live Demo

Check out the deployed version of the project:

🔗 [todotheapp.netlify.app](https://todotheapp.netlify.app)

## 🌗 Theme Toggle

Includes a floating toggle button to switch between light and dark themes. Built using:

- lucide-react icons (🌞/🌙)

- Conditional CSS class toggling

- Custom styling or Tailwind-compatible logic

---

## ✅ Future Improvements

- User authentication (JWT, Google login)

- Drag-and-drop reordering

- Deadline reminders

---

## 🙋‍♀️ Questions?

- Email: lydiaelliegiannoulatou@gmail.com
