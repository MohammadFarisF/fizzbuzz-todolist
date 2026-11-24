import { useState } from "react";
import "./App.css";
import FizzBuzz from "./components/FizzBuzz";
import TodoApp from "./components/TodoApp";

export function App() {
  const [activeTab, setActiveTab] = useState<"fizzbuzz" | "todo">("fizzbuzz");

  return (
    <main className="container">
      <header className="app-header">
        <div>
          <h1>Technical Test — Programmer Staff</h1>
          <p className="subtitle">
            Pilih menu di bawah untuk melihat hasil masing-masing tugas.
          </p>
        </div>

        <nav className="menu-tabs" aria-label="Menu Tugas">
          <button
            type="button"
            className={`tab-btn ${activeTab === "fizzbuzz" ? "active" : ""}`}
            onClick={() => setActiveTab("fizzbuzz")}
          >
            Tugas 1: FizzBuzz
          </button>
          <button
            type="button"
            className={`tab-btn ${activeTab === "todo" ? "active" : ""}`}
            onClick={() => setActiveTab("todo")}
          >
            Tugas 2: Todo App
          </button>
        </nav>
      </header>

      {activeTab === "fizzbuzz" ? <FizzBuzz /> : <TodoApp />}
    </main>
  );
}

export default App;
