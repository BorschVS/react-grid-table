import { ColumnDef } from '@tanstack/react-table'
import { JiraTask } from '@react-grid-table/shared/types'
import { formatDateForExport, getCurrentDateForFilename } from './date'
import {
  CSV_MIME_TYPE,
  CSV_ARRAY_SEPARATOR,
  CSV_QUOTE,
  EXPORT_FILENAME_PREFIX,
} from '../constants/table'

/**
 * Gets column header name from column definition
 * @param col - Column definition
 * @returns Header name or empty string
 */
function getColumnHeader(col: ColumnDef<JiraTask>): string {
  if (typeof col.header === 'string') return col.header
  if ('accessorKey' in col && col.accessorKey) return col.accessorKey as string
  return ''
}

/**
 * Formats cell value for CSV export
 * @param value - Cell value to format
 * @returns Formatted string for CSV
 */
function formatCellValue(value: unknown): string {
  if (value === null || value === undefined) return ''
  if (Array.isArray(value)) return value.join(CSV_ARRAY_SEPARATOR)
  if (value instanceof Date) return formatDateForExport(value)
  if (typeof value === 'string') return `${CSV_QUOTE}${value}${CSV_QUOTE}`
  return String(value)
}

/**
 * Converts table data to CSV content
 * @param rows - Table rows with original data
 * @param columns - Column definitions
 * @returns CSV content as string
 */
export function generateCSVContent(
  rows: { original: JiraTask }[],
  columns: ColumnDef<JiraTask>[],
): string {
  const headers = columns.map(getColumnHeader)
  const csvRows = rows.map((row) =>
    columns
      .map((col) => {
        const value =
          'accessorKey' in col && col.accessorKey
            ? row.original[col.accessorKey as keyof JiraTask]
            : ''
        return formatCellValue(value)
      })
      .join(','),
  )

  return [headers.join(','), ...csvRows].join('\n')
}

/**
 * Exports data to CSV file
 * @param csvContent - CSV content to export
 * @param filename - Optional filename, defaults to date-based filename
 */
export function exportToCSV(
  csvContent: string,
  filename?: string,
): void {
  const blob = new Blob([csvContent], { type: CSV_MIME_TYPE })
  const link = document.createElement('a')
  link.href = URL.createObjectURL(blob)
  link.download = filename || `${EXPORT_FILENAME_PREFIX}-${getCurrentDateForFilename()}.csv`
  link.click()
}
