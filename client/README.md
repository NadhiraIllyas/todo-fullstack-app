TODO App - Frontend

A simple and responsive TODO application built using React (Vite) and Tailwind CSS.

Features

- Add new tasks
- Edit existing tasks
- Delete tasks
- Mark tasks as completed / uncompleted
- Search tasks
- Filter tasks (All / Active / Completed)
- Optimistic UI updates
- Loading and empty states
- Responsive UI using Tailwind CSS

Setup Instructions

 1. Navigate to frontend folder
cd client

 2. Install dependencies
npm install

 3. Start development server
npm run dev

 4. Open in browser
http://localhost:5173
API Connection

The frontend connects to the backend API:
http://localhost:5000/api/todos
Make sure backend is running before starting frontend.

Assumptions
- Backend runs locally on port 5000
- MongoDB is properly connected and running
- No authentication is required

 Tech Stack
- React (Vite)
- Axios
- Tailwind CSS
