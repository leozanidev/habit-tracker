# 📌 Habit Tracker

![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)
![CSS Modules](https://img.shields.io/badge/CSS%20Modules-000000?style=for-the-badge&logo=cssmodules&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white)
![JSON Server](https://img.shields.io/badge/JSON%20Server-000000?style=for-the-badge&logo=json&logoColor=white)
![Recharts](https://img.shields.io/badge/Recharts-22B5BF?style=for-the-badge&logo=chart.js&logoColor=white)

A web application for tracking daily habits, focused on consistency and streak building.

<img width="800" height="386" alt="ezgif com-video-to-gif-converter" src="https://github.com/user-attachments/assets/1bb8d2dd-373e-40f6-81ab-34590d110f25" />
)

🔗 **[Live Demo](https://leozanidev.github.io/habit-tracker/)**

---

## 🚀 About the Project

This project was developed to practice and deepen front-end development concepts using React, including state management, custom hooks, API consumption, and interactive UI building.

The application allows you to create habits, mark their daily completion, track consecutive day streaks, and visualize progress through a bar chart.

---

## ✨ Features

- ✅ Create, edit, and delete habits
- ✅ Mark habits as completed for today
- ✅ Current streak tracking (consecutive days)
- ✅ Longest streak tracking (best historical record)
- ✅ Progress bar chart (powered by Recharts)
- ✅ Data persistence with JSON Server
- ✅ Loading state feedback
- ✅ Modal confirmation for destructive actions
- ✅ Close modals with ESC key or by clicking outside
- ✅ Toast notifications for user feedback
- ✅ Responsive layout for mobile and desktop

---

## 🧠 Key Concepts Practiced

- **Custom Hooks** — all business logic isolated in `useHabits.js`
- **Service Layer** — HTTP requests centralized in `habitService.js`
- **Pure Functions & Utils** — streak calculations separated in `habitUtils.js`
- **Async/Await** — asynchronous data fetching with proper error handling
- **REST API** — GET, POST, PUT, DELETE operations with JSON Server
- **Component Composition** — reusable and focused components
- **Side Effects** — proper use of `useEffect` with cleanup functions

---

## 🗂️ Project Structure

```
src/
├── components/
│   ├── HabitForm/
│   ├── HabitItem/
│   ├── HabitChart/
│   ├── DelModal/
│   ├── EditModal/
│   └── Loading/
├── hooks/
│   └── useHabits.js
├── services/
│   └── habitService.js
├── utils/
│   └── habitUtils.js
└── App.jsx
```

---

## 🛠️ Tech Stack

- **React** — UI library
- **JavaScript (ES6+)** — language
- **CSS Modules** — scoped component styling
- **Vite** — build tool and dev server
- **JSON Server** — mock REST API
- **Recharts** — chart library
- **React Toastify** — toast notifications

---

## ▶️ How to Run Locally

Make sure you have **Node.js** installed.

**1. Clone the repository**
```bash
git clone https://github.com/leozanidev/habit-tracker.git
cd habit-tracker
```

**2. Install dependencies**
```bash
npm install
```

**3. Start the JSON Server (mock API)**
```bash
npm run server
```

**4. Start the development server** (in a separate terminal)
```bash
npm run dev
```

**5. Open in the browser**
```
http://localhost:5173
```

> ⚠️ Both servers must be running at the same time for the app to work correctly.

---

## 👨‍💻 Author

Developed by **Leonardo Zani de Souza**

[![LinkedIn](https://img.shields.io/badge/LinkedIn-0077B5?style=for-the-badge&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/leozani-dev/)
[![GitHub](https://img.shields.io/badge/GitHub-100000?style=for-the-badge&logo=github&logoColor=white)](https://github.com/leozanidev)

---

## 🔗 Other Projects

- 📝 [Todo List](https://leozanidev.github.io/todo-list/)
