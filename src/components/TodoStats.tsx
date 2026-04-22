interface Props {
  total: number
  completed: number
  onClearCompleted: () => void
}

export default function TodoStats({ total, completed, onClearCompleted }: Props) {
  const active = total - completed

  return (
    <div className="flex items-center justify-between text-xs text-gray-500">
      <span>
        残り <span className="font-semibold text-indigo-600">{active}</span> 件
        {total > 0 && (
          <span className="ml-2 text-gray-400">
            （全 {total} 件中 {completed} 件完了）
          </span>
        )}
      </span>
      {completed > 0 && (
        <button
          onClick={onClearCompleted}
          className="rounded px-2 py-1 text-red-400 transition-colors hover:bg-red-50 hover:text-red-600"
        >
          完了済みを削除
        </button>
      )}
    </div>
  )
}
