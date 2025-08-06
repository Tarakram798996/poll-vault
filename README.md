# Poll Vault 🗳️

Poll Vault is a full-stack voting application that enables users to create polls, cast votes, and view real-time results. Built using **Spring Boot** for the backend and **React.js** for the frontend.

## 🚀 Features

- 🧑 User registration and authentication (JWT-based)
- ✅ Create and manage polls
- 📊 Cast votes and track vote counts
- 🖥️ Admin panel (optional extension)
- 🎨 Responsive UI with TailwindCSS and Lucide icons

## 🛠️ Tech Stack

### Backend
- Java + Spring Boot
- Spring Security (JWT Authentication)
- Spring Data JPA
- H2 / MySQL (switchable)

### Frontend
- React.js
- Axios for API calls
- React Router for navigation
- Tailwind CSS for styling

## 🔧 Setup Instructions

### Backend (Spring Boot)
```bash
cd backend
./mvnw spring-boot:run
```

### Frontend (React)
```bash
cd vote-app
npm install
npm start
```

> Ensure the backend is running on `http://localhost:8080` and update the base URL in frontend if needed.

## 📂 Project Structure

```
poll-vault/
├── backend/         # Spring Boot backend
└── vote-app/        # React frontend
```

## 👤 Author
**Tarak Ram**  
GitHub: [@Tarakram798996](https://github.com/Tarakram798996)

---
Feel free to star ⭐ the repo if you find it helpful!