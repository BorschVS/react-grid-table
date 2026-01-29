import { MAX_VISIBLE_TAGS } from '../../constants/table'

interface TagsCellProps {
  tags: string[]
}

export function TagsCell({ tags }: TagsCellProps) {
  const visibleTags = tags.slice(0, MAX_VISIBLE_TAGS)
  const remainingCount = tags.length - MAX_VISIBLE_TAGS

  return (
    <div className="tags-cell">
      {visibleTags.map((tag, idx) => (
        <span key={idx} className="tag">
          {tag}
        </span>
      ))}
      {remainingCount > 0 && (
        <span className="tag-more">+{remainingCount}</span>
      )}
    </div>
  )
}
