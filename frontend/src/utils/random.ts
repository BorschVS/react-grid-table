/**
 * Returns a random element from an array
 * @param array - Array to select from
 * @returns Random element from array
 */
export function randomElement<T>(array: readonly T[]): T {
  return array[Math.floor(Math.random() * array.length)]
}

/**
 * Returns random elements from an array
 * @param array - Array to select from
 * @param count - Number of elements to return
 * @returns Array of random elements
 */
export function randomElements<T>(
  array: readonly T[],
  count: number,
): T[] {
  const shuffled = [...array].sort(() => 0.5 - Math.random())
  return shuffled.slice(0, count)
}

/**
 * Generates a random date between start and end
 * @param start - Start date
 * @param end - End date
 * @returns Random date between start and end
 */
export function randomDate(start: Date, end: Date): Date {
  return new Date(
    start.getTime() + Math.random() * (end.getTime() - start.getTime()),
  )
}

/**
 * Generates a random integer between min and max (inclusive)
 * @param min - Minimum value
 * @param max - Maximum value
 * @returns Random integer
 */
export function randomInt(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min
}

/**
 * Returns a random element based on weights
 * @param weights - Object with items as keys and weights as values
 * @returns Random element based on weights
 */
export function weightedRandom<T extends string>(
  weights: Record<T, number>,
): T {
  const items = Object.keys(weights) as T[]
  const totalWeight = items.reduce((sum, item) => sum + weights[item], 0)
  let random = Math.random() * totalWeight

  for (const item of items) {
    random -= weights[item]
    if (random <= 0) return item
  }

  return items[items.length - 1]
}
