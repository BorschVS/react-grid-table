import { STATUS_COLORS, DEFAULT_STATUS } from '../../constants/filters'

interface StatusBadgeProps {
  status: string
}

export function StatusBadge({ status }: StatusBadgeProps) {
  const backgroundColor = STATUS_COLORS[status as keyof typeof STATUS_COLORS] || STATUS_COLORS[DEFAULT_STATUS]

  return (
    <span className="status-badge" style={{ backgroundColor }}>
      {status}
    </span>
  )
}
