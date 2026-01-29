export const DEFAULT_PAGE_SIZE = 20
export const PAGE_SIZE_OPTIONS = [10, 20, 50, 100] as const

export const DATE_FORMAT = 'dd.MM.yyyy'
export const DATE_FORMAT_EXPORT = 'yyyy-MM-dd'

export const CSV_MIME_TYPE = 'text/csv;charset=utf-8;'
export const CSV_ARRAY_SEPARATOR = '; '
export const CSV_QUOTE = '"'

export const PROGRESS_WARNING_THRESHOLD = 80
export const PROGRESS_ERROR_THRESHOLD = 100

export const MAX_VISIBLE_TAGS = 2

export const ICON_SIZE_SMALL = 14
export const ICON_SIZE_MEDIUM = 16
export const ICON_SIZE_LARGE = 18

export const EMPTY_STATE_MESSAGES = {
  NO_DATA: 'No data to display',
  LOADING: 'Loading...',
  ERROR: 'Error',
} as const

export const SEARCH_PLACEHOLDER = 'Search across all columns...'

export const EXPORT_FILENAME_PREFIX = 'jira-statistics'
