import { useEffect, useState, type FormEvent } from "react";
import type { Todo } from "../types";

const STORAGE_KEY = "raya_todo_items";

export default function TodoApp() {
  const [todos, setTodos] = useState<Todo[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      return saved ? (JSON.parse(saved) as Todo[]) : [];
    } catch {
      return [];
    }
  });

  const [newTitle, setNewTitle] = useState("");
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editingText, setEditingText] = useState("");

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(todos));
  }, [todos]);

  const handleAddTodo = (e: FormEvent) => {
    e.preventDefault();
    const trimmed = newTitle.trim();
    if (!trimmed) return;

    const newTodo: Todo = {
      id: crypto.randomUUID(),
      title: trimmed,
      completed: false,
    };

    setTodos((prev) => [newTodo, ...prev]);
    setNewTitle("");
  };

  const handleToggleComplete = (id: string) => {
    setTodos((prev) =>
      prev.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo,
      ),
    );
  };

  const handleStartEdit = (todo: Todo) => {
    setEditingId(todo.id);
    setEditingText(todo.title);
  };

  const handleSaveEdit = (id: string) => {
    const trimmed = editingText.trim();
    if (!trimmed) return;

    setTodos((prev) =>
      prev.map((todo) => (todo.id === id ? { ...todo, title: trimmed } : todo)),
    );
    setEditingId(null);
    setEditingText("");
  };

  const handleCancelEdit = () => {
    setEditingId(null);
    setEditingText("");
  };

  const handleDelete = (id: string) => {
    setTodos((prev) => prev.filter((todo) => todo.id !== id));
    if (editingId === id) {
      handleCancelEdit();
    }
  };

  return (
    <section className="panel">
      <div className="panel-header">
        <h2>Tugas 2 — Todo List</h2>
        <p className="subtitle">CRUD Sederhana Todo List</p>
      </div>

      <form onSubmit={handleAddTodo} className="todo-form">
        <input
          type="text"
          value={newTitle}
          onChange={(e) => setNewTitle(e.target.value)}
          placeholder="Tulis tugas baru..."
          aria-label="Tugas baru"
        />
        <button type="submit" className="btn-primary">
          Tambah
        </button>
      </form>

      {todos.length === 0 ? (
        <p className="empty-state">Belum ada tugas.</p>
      ) : (
        <ul className="todo-list">
          {todos.map((todo) => (
            <li key={todo.id} className="todo-item">
              {editingId === todo.id ? (
                <div className="todo-edit-row">
                  <input
                    type="text"
                    value={editingText}
                    onChange={(e) => setEditingText(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") handleSaveEdit(todo.id);
                      if (e.key === "Escape") handleCancelEdit();
                    }}
                    autoFocus
                  />
                  <div className="todo-actions">
                    <button
                      type="button"
                      className="btn-small btn-primary"
                      onClick={() => handleSaveEdit(todo.id)}
                    >
                      Simpan
                    </button>
                    <button
                      type="button"
                      className="btn-small"
                      onClick={handleCancelEdit}
                    >
                      Batal
                    </button>
                  </div>
                </div>
              ) : (
                <>
                  <label className="todo-label">
                    <input
                      type="checkbox"
                      checked={todo.completed}
                      onChange={() => handleToggleComplete(todo.id)}
                    />
                    <span className={todo.completed ? "completed" : ""}>
                      {todo.title}
                    </span>
                  </label>

                  <div className="todo-actions">
                    <button
                      type="button"
                      className="btn-small"
                      onClick={() => handleStartEdit(todo)}
                    >
                      Edit
                    </button>
                    <button
                      type="button"
                      className="btn-small btn-danger"
                      onClick={() => handleDelete(todo.id)}
                    >
                      Hapus
                    </button>
                  </div>
                </>
              )}
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
