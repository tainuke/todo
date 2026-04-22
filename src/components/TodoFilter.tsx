import type { FilterType } from '../types'

interface Props {
  current: FilterType
  onChange: (filter: FilterType) => void
}

const filters: { label: string; value: FilterType }[] = [
  { label: '全て', value: 'all' },
  { label: '未完了', value: 'active' },
  { label: '完了済み', value: 'completed' },
]

export default function TodoFilter({ current, onChange }: Props) {
  return (
    <div className="flex gap-1 rounded-lg bg-gray-100 p-1">
      {filters.map(({ label, value }) => (
        <button
          key={value}
          onClick={() => onChange(value)}
          className={`flex-1 rounded-md px-3 py-1.5 text-xs font-medium transition-all ${
            current === value
              ? 'bg-white text-indigo-600 shadow-sm'
              : 'text-gray-500 hover:text-gray-700'
          }`}
        >
          {label}
        </button>
      ))}
    </div>
  )
}
