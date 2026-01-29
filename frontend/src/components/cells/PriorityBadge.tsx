import { PRIORITY_COLORS, DEFAULT_PRIORITY } from '../../constants/filters'

interface PriorityBadgeProps {
  priority: string
}

export function PriorityBadge({ priority }: PriorityBadgeProps) {
  const backgroundColor =
    PRIORITY_COLORS[priority as keyof typeof PRIORITY_COLORS] ||
    PRIORITY_COLORS[DEFAULT_PRIORITY]

  return (
    <span className="priority-badge" style={{ backgroundColor }}>
      {priority}
    </span>
  )
}
