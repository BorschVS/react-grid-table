import {
  PROGRESS_WARNING_THRESHOLD,
  PROGRESS_ERROR_THRESHOLD,
} from '../../constants/table'

interface ProgressBarProps {
  timeSpent: number
  timeEstimated: number
}

export function ProgressBar({
  timeSpent,
  timeEstimated,
}: ProgressBarProps) {
  const percentage = Math.min((timeSpent / timeEstimated) * 100, 100)
  
  const getColor = (): string => {
    if (percentage >= PROGRESS_ERROR_THRESHOLD) return 'var(--error)'
    if (percentage >= PROGRESS_WARNING_THRESHOLD) return 'var(--warning)'
    return 'var(--success)'
  }

  return (
    <div className="progress-bar-container">
      <div
        className="progress-bar"
        style={{ width: `${percentage}%`, backgroundColor: getColor() }}
      />
      <span className="progress-text">
        {timeSpent}h / {timeEstimated}h
      </span>
    </div>
  )
}
