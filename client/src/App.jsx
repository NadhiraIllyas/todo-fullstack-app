import { useEffect, useState } from "react";
import axios from "axios";
import TodoItem from "./components/TodoItem";

const API = "http://localhost:5000/api/todos";

function App() {
  const [todos, setTodos] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  // NEW FEATURES
  const [filter, setFilter] = useState("all");
  const [search, setSearch] = useState("");

  // EDIT
  const [editingId, setEditingId] = useState(null);
  const [editTitle, setEditTitle] = useState("");
  const [editDescription, setEditDescription] = useState("");

  // FETCH TODOS
  const fetchTodos = async () => {
    setLoading(true);
    try {
      const res = await axios.get(API);
      setTodos(res.data);
    } catch {
      setError("⚠️ Failed to load tasks");
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  // ADD TODO (Optimistic)
  const addTodo = async () => {
    if (!title.trim()) {
      setError("⚠️ Title is required");
      return;
    }

    setError("");

    const tempTodo = {
      _id: Date.now(),
      title,
      description,
      done: false,
    };

    setTodos([tempTodo, ...todos]);

    try {
      const res = await axios.post(API, { title, description });

      setTodos((prev) =>
        prev.map((t) =>
          t._id === tempTodo._id ? res.data : t
        )
      );

      setTitle("");
      setDescription("");
    } catch {
      setError("⚠️ Failed to add task");
    }
  };

  // DELETE (Optimistic)
  const deleteTodo = async (id) => {
    const old = todos;
    setTodos(todos.filter((t) => t._id !== id));

    try {
      await axios.delete(`${API}/${id}`);
    } catch {
      setTodos(old);
      setError("⚠️ Delete failed");
    }
  };

  // TOGGLE DONE (Optimistic)
  const toggleDone = async (id) => {
    const old = todos;

    setTodos(
      todos.map((t) =>
        t._id === id ? { ...t, done: !t.done } : t
      )
    );

    try {
      await axios.patch(`${API}/${id}/done`);
    } catch {
      setTodos(old);
    }
  };

  // EDIT START
  const startEdit = (todo) => {
    setEditingId(todo._id);
    setEditTitle(todo.title);
    setEditDescription(todo.description);
  };

  // UPDATE
  const updateTodo = async () => {
    try {
      const res = await axios.put(`${API}/${editingId}`, {
        title: editTitle,
        description: editDescription,
      });

      setTodos((prev) =>
        prev.map((t) =>
          t._id === editingId ? res.data : t
        )
      );

      setEditingId(null);
    } catch {
      setError("⚠️ Update failed");
    }
  };

  // FILTER LOGIC
  const filteredTodos = todos
    .filter((todo) => {
      if (filter === "active") return !todo.done;
      if (filter === "completed") return todo.done;
      return true;
    })
    .filter((todo) =>
      todo.title.toLowerCase().includes(search.toLowerCase())
    );

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center p-6">
      <div className="w-full max-w-2xl">

        <h1 className="text-3xl font-bold text-center mb-4">
          📝 TODO App
        </h1>

        {/* INPUT / EDIT */}
        <div className="bg-white p-4 rounded-xl shadow mb-4">

          {editingId ? (
            <>
              <h2 className="font-bold mb-2">Edit Task</h2>

              <input
                className="w-full p-2 border rounded mb-2"
                value={editTitle}
                onChange={(e) => setEditTitle(e.target.value)}
              />

              <input
                className="w-full p-2 border rounded mb-2"
                value={editDescription}
                onChange={(e) => setEditDescription(e.target.value)}
              />

              <button
                onClick={updateTodo}
                className="bg-green-500 text-white px-4 py-2 rounded mr-2"
              >
                Update
              </button>

              <button
                onClick={() => setEditingId(null)}
                className="bg-gray-400 text-white px-4 py-2 rounded"
              >
                Cancel
              </button>
            </>
          ) : (
            <>
              <input
                className="w-full p-2 border rounded mb-2"
                placeholder="Task title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />

              <input
                className="w-full p-2 border rounded mb-2"
                placeholder="Description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />

              <button
                onClick={addTodo}
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
              >
                Add Task
              </button>
            </>
          )}

          {error && (
            <p className="text-red-500 mt-2">{error}</p>
          )}
        </div>

        {/* SEARCH + FILTER */}
        <div className="flex gap-2 mb-4">
          <input
            className="flex-1 p-2 border rounded"
            placeholder="Search tasks..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

          <select
            className="p-2 border rounded"
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
          >
            <option value="all">All</option>
            <option value="active">Active</option>
            <option value="completed">Completed</option>
          </select>
        </div>

        {/* LOADING */}
        {loading && (
          <p className="text-center text-gray-500">
            Loading tasks...
          </p>
        )}

        {/* EMPTY STATE */}
        {!loading && filteredTodos.length === 0 && (
          <p className="text-center text-gray-500">
            No tasks found 🚀
          </p>
        )}

        {/* TODO LIST */}
        <div className="space-y-3">
          {filteredTodos.map((todo) => (
            <TodoItem
              key={todo._id}
              todo={todo}
              deleteTodo={deleteTodo}
              toggleDone={toggleDone}
              startEdit={startEdit}
            />
          ))}
        </div>

      </div>
    </div>
  );
}

export default App;