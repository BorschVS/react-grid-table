import { format } from 'date-fns'
import { DATE_FORMAT, DATE_FORMAT_EXPORT } from '../constants/table'

/**
 * Formats a date to display format
 * @param date - Date to format or null
 * @returns Formatted date string or '—' if date is null
 */
export function formatDate(date: Date | null): string {
  if (!date) return '—'
  return format(date, DATE_FORMAT)
}

/**
 * Formats a date for export
 * @param date - Date to format
 * @returns Formatted date string in export format
 */
export function formatDateForExport(date: Date): string {
  return format(date, DATE_FORMAT_EXPORT)
}

/**
 * Formats current date for export filename
 * @returns Current date formatted for filename
 */
export function getCurrentDateForFilename(): string {
  return formatDateForExport(new Date())
}
