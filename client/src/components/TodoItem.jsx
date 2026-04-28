export default function TodoItem({
  todo,
  deleteTodo,
  toggleDone,
  startEdit,
}) {
  return (
    <div className="bg-white p-4 rounded-xl shadow flex justify-between items-center transition hover:scale-[1.02]">

      <div>
        <h2 className={`font-semibold ${todo.done ? "line-through text-gray-400" : ""}`}>
          {todo.title}
        </h2>

        <p className="text-sm text-gray-500">
          {todo.description}
        </p>
      </div>

      <div className="flex gap-2">

        <button
          onClick={() => toggleDone(todo._id)}
          className="bg-green-500 text-white px-3 py-1 rounded"
        >
          {todo.done ? "Undo" : "Done"}
        </button>

        <button
          onClick={() => startEdit(todo)}
          className="bg-yellow-500 text-white px-3 py-1 rounded"
        >
          Edit
        </button>

        <button
          onClick={() => deleteTodo(todo._id)}
          className="bg-red-500 text-white px-3 py-1 rounded"
        >
          Delete
        </button>

      </div>
    </div>
  );
}