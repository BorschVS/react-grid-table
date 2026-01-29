/**
 * Toggles a value in a filter array
 * @param currentFilter - Current filter array
 * @param value - Value to toggle
 * @returns New filter array or undefined if empty
 */
export function toggleFilterValue<T>(
  currentFilter: T[],
  value: T,
): T[] | undefined {
  const newFilter = currentFilter.includes(value)
    ? currentFilter.filter((item) => item !== value)
    : [...currentFilter, value]

  return newFilter.length > 0 ? newFilter : undefined
}
