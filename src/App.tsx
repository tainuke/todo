import { useState, useEffect } from 'react'
import type { Todo, FilterType } from './types'
import TodoInput from './components/TodoInput'
import TodoItem from './components/TodoItem'
import TodoFilter from './components/TodoFilter'
import TodoStats from './components/TodoStats'

const STORAGE_KEY = 'todo-app-data'

function loadTodos(): Todo[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    return raw ? (JSON.parse(raw) as Todo[]) : []
  } catch {
    return []
  }
}

export default function App() {
  const [todos, setTodos] = useState<Todo[]>(loadTodos)
  const [filter, setFilter] = useState<FilterType>('all')

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(todos))
  }, [todos])

  const addTodo = (text: string) => {
    setTodos((prev) => [
      { id: crypto.randomUUID(), text, completed: false, createdAt: Date.now() },
      ...prev,
    ])
  }

  const toggleTodo = (id: string) => {
    setTodos((prev) =>
      prev.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t))
    )
  }

  const deleteTodo = (id: string) => {
    setTodos((prev) => prev.filter((t) => t.id !== id))
  }

  const clearCompleted = () => {
    setTodos((prev) => prev.filter((t) => !t.completed))
  }

  const filtered = todos.filter((t) => {
    if (filter === 'active') return !t.completed
    if (filter === 'completed') return t.completed
    return true
  })

  const completedCount = todos.filter((t) => t.completed).length

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-purple-50 px-4 py-12">
      <div className="mx-auto w-full max-w-md">
        <h1 className="mb-8 text-center text-3xl font-bold tracking-tight text-indigo-700">
          TODO
        </h1>

        <div className="space-y-4 rounded-2xl bg-white p-6 shadow-lg">
          <TodoInput onAdd={addTodo} />

          {todos.length > 0 && (
            <TodoFilter current={filter} onChange={setFilter} />
          )}

          {filtered.length === 0 ? (
            <p className="py-8 text-center text-sm text-gray-400">
              {filter === 'all'
                ? 'タスクはありません'
                : filter === 'active'
                ? '未完了のタスクはありません'
                : '完了済みのタスクはありません'}
            </p>
          ) : (
            <ul className="space-y-2">
              {filtered.map((todo) => (
                <TodoItem
                  key={todo.id}
                  todo={todo}
                  onToggle={toggleTodo}
                  onDelete={deleteTodo}
                />
              ))}
            </ul>
          )}

          {todos.length > 0 && (
            <TodoStats
              total={todos.length}
              completed={completedCount}
              onClearCompleted={clearCompleted}
            />
          )}
        </div>
      </div>
    </div>
  )
}
