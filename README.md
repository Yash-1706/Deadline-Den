# 📚 DeadlineDen

DeadlineDen is a minimalist academic planner designed to help students manage tasks with a sense of urgency. Featuring a color-based PanicMeter and AI-generated productivity tips, DeadlineDen is both practical and intelligent.

---

## 🚀 Live Demo

[Click to View DeadlineDen](https://deadline-den.vercel.app)

---

## ✨ Features

- Add, edit, and delete academic tasks
- AI-powered productivity tips using Gemini API
- PanicMeter to visualize urgency via color
- Mark tasks as completed
- Mobile responsive design
- Persistent data with localStorage
- Built with Context API and React Hooks
- Clean UI with Framer Motion animations

---

## 🛠 Tech Stack

- React.js (Hooks + Functional Components)
- React Router DOM
- Context API
- TailwindCSS
- Framer Motion
- Google Gemini AI API
- localStorage
- Vite

---

## 📁 Folder Structure

```
src/
├── components/
│   ├── Navbar.jsx
│   ├── PanicMeter.jsx
│   └── TaskCard.jsx
│
├── context/
│   └── TaskContext.jsx
│
├── pages/
│   ├── About.jsx
│   ├── AddTask.jsx
│   ├── Home.jsx
│   └── Tips.jsx
│
├── routes/
│   └── Router.jsx
│
├── App.jsx
├── index.css
└── main.jsx

.env
.gitignore
index.html
eslint.config.js
package.json
package-lock.json
vite.config.js
README.md
```

---

## 📦 Setup Instructions

```bash
# Clone the repo
git clone https://github.com/Yash-1706/deadlineden.git

cd deadlineden

# Install dependencies
npm install

# Add your Gemini API key
touch .env
echo VITE_GEMINI_API_KEY=your_api_key_here >> .env

# Run locally
npm run dev
```

---

## 🧠 AI Prompting

DeadlineDen dynamically sends task info to Gemini based on:
- Number of tasks
- Completion status
- Task types
- PanicMeter urgency

This ensures personalized and context-aware tips.

---

## 🙋‍♂️ Author

**Yash Gaikwad**  
GitHub: [Yash-1706](https://github.com/Yash-1706)

***