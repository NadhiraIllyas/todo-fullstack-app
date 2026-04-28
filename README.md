TODO App - Backend

A RESTful API built using Node.js, Express, and MongoDB for managing TODO tasks.

Features

- Create TODO
- Read all TODOs
- Update TODO (edit title/description)
- Toggle task completion
- Delete TODO
- MongoDB database integration using Mongoose

Setup Instructions

 1. Navigate to backend folder
cd server

 2. Install dependencies
npm install

 3. Create environment file

Create a .env file in the root of server folder:

MONGO_URI=your_mongodb_connection_string
PORT=5000

 4. Start server
npm run dev

Server will run on:
http://localhost:5000

MongoDB Setup

You can use either:

 Option 1: MongoDB Atlas 
- Create cluster on https://www.mongodb.com/atlas
- Get connection string
- Add it to .env as `MONGO_URI`

 Option 2: Local MongoDB
mongodb://127.0.0.1:27017/todo-app

API Endpoints

Method	Endpoint	Description
GET	/api/todos	Get all tasks
POST	/api/todos	Create task
PUT	/api/todos/:id	Update task
PATCH	/api/todos/:id/done	Toggle completion
DELETE	/api/todos/:id	Delete task

Assumptions

- MongoDB is running and accessible
- Frontend runs on localhost:5173
- No authentication required

 Tech Stack

- Node.js
- Express.js
- MongoDB
- Mongoose
