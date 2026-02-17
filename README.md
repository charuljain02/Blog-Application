# Blog-Application
Blogify – Blog Application  Blogify is a full-stack blog application built using Node.js, Express, MongoDB, and EJS that allows users to create, manage, and interact with blog posts in a secure and user-friendly environment.
# 📝 Blogify – Full Stack Blog Application

Blogify is a full-stack blog application built using Node.js, Express, MongoDB, and EJS.  
It allows users to register, log in, create blogs, upload images, and interact through comments in a secure environment.

---

## 🚀 Features

- 🔐 User Authentication (Signup / Signin / Logout)
- 🔑 JWT-based Authentication with Cookies
- 🔒 Password Hashing with Salt
- ✍️ Create Blog Posts
- 🖼 Upload Cover Images (Multer)
- 💬 Comment on Blogs
- 🗑 Delete Blogs (Authorized Users Only)
- 📱 Responsive UI using Bootstrap
- 🌍 Dynamic Server-Side Rendering with EJS

---

## 🛠 Tech Stack

**Backend**
- Node.js
- Express.js

**Database**
- MongoDB (Mongoose)

**Authentication**
- JSON Web Tokens (JWT)

**Frontend**
- EJS (Templating Engine)
- Bootstrap
- Custom CSS

**Other Tools**
- Multer (File Upload)
- Cookie-Parser
- Dotenv (Environment Variables)

---
## Project structure

Blog-Application/
│
├── models/
├── routes/
├── services/
├── middlewares/
├── views/
│ ├── partials/
├── public/
│ ├── css/
│ ├── uploads/
├── index.js
├── package.json
├── .gitignore
└── README.md


---

## ⚙️ Installation & Setup

1️⃣ Clone the repository

```bash
git clone https://github.com/your-username/Blog-Application.git
cd Blog-Application
2️⃣ Install dependencies
npm install
4️⃣ Run the application

npm start
or
nodemon index.js

Server runs on:
http://localhost:8000

## 🔐 Security Features
Passwords are hashed before storing in database
JWT tokens stored in HTTP cookies
Protected routes for authenticated users
Environment variables for sensitive data

## 🌟 Future Improvements

Edit Blog Feature
Like / Share System
Admin Dashboard
Rich Text Editor
Pagination

## 📌 Author
Charul Jain
GitHub: https://github.com/charuljain02


