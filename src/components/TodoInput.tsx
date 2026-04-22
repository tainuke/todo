import { useState, type KeyboardEvent } from 'react'

interface Props {
  onAdd: (text: string) => void
}

export default function TodoInput({ onAdd }: Props) {
  const [value, setValue] = useState('')

  const handleAdd = () => {
    const trimmed = value.trim()
    if (!trimmed) return
    onAdd(trimmed)
    setValue('')
  }

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') handleAdd()
  }

  return (
    <div className="flex gap-2">
      <input
        type="text"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="新しいタスクを入力..."
        className="flex-1 rounded-lg border border-gray-300 px-4 py-2 text-sm focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-200"
      />
      <button
        onClick={handleAdd}
        className="rounded-lg bg-indigo-600 px-5 py-2 text-sm font-medium text-white transition-colors hover:bg-indigo-700 active:bg-indigo-800"
      >
        追加
      </button>
    </div>
  )
}
