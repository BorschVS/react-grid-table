import { useMemo, useState } from 'react'
import {
  useReactTable,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  getGroupedRowModel,
  flexRender,
  ColumnDef,
  SortingState,
  ColumnFiltersState,
  GroupingState,
  VisibilityState,
} from '@tanstack/react-table'
import { JiraTask } from '@react-grid-table/shared/types'
import { useTasks } from '../hooks/useTasks'
import {
  ChevronDown,
  ChevronUp,
  Search,
  Filter,
  Download,
  ChevronLeft,
  ChevronRight,
  MoreHorizontal,
} from 'lucide-react'
import { StatusBadge, PriorityBadge, ProgressBar, TagsCell } from './cells'
import { formatDate } from '../utils/date'
import { generateCSVContent, exportToCSV } from '../utils/export'
import { toggleFilterValue } from '../utils/filters'
import {
  DEFAULT_PAGE_SIZE,
  PAGE_SIZE_OPTIONS,
  EMPTY_STATE_MESSAGES,
  SEARCH_PLACEHOLDER,
  ICON_SIZE_SMALL,
  ICON_SIZE_MEDIUM,
  ICON_SIZE_LARGE,
} from '../constants/table'
import {
  STATUS_OPTIONS,
  PRIORITY_OPTIONS,
} from '../constants/filters'
import './JiraStatsTable.css'

// Column filter function
const arrayIncludesFilter = (row: any, id: string, value: string[]) => {
  return value.includes(row.getValue(id))
}

export default function JiraStatsTable() {
  const { tasks: data, loading, error, usingMockData } = useTasks()
  const [sorting, setSorting] = useState<SortingState>([])
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])
  const [grouping, setGrouping] = useState<GroupingState>([])
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({})
  const [globalFilter, setGlobalFilter] = useState('')

  const columns = useMemo<ColumnDef<JiraTask>[]>(
    () => [
      {
        accessorKey: 'key',
        header: 'Key',
        cell: (info) => (
          <span className="task-key">{info.getValue() as string}</span>
        ),
        enableGrouping: true,
        size: 120,
      },
      {
        accessorKey: 'title',
        header: 'Title',
        cell: (info) => (
          <div className="task-title">{info.getValue() as string}</div>
        ),
        enableSorting: true,
        size: 300,
      },
      {
        accessorKey: 'status',
        header: 'Status',
        cell: (info) => <StatusBadge status={info.getValue() as string} />,
        enableGrouping: true,
        enableSorting: true,
        filterFn: arrayIncludesFilter,
        size: 140,
      },
      {
        accessorKey: 'priority',
        header: 'Priority',
        cell: (info) => <PriorityBadge priority={info.getValue() as string} />,
        enableGrouping: true,
        enableSorting: true,
        filterFn: arrayIncludesFilter,
        size: 130,
      },
      {
        accessorKey: 'type',
        header: 'Type',
        cell: (info) => (
          <span className="task-type">{info.getValue() as string}</span>
        ),
        enableGrouping: true,
        enableSorting: true,
        size: 100,
      },
      {
        accessorKey: 'assignee',
        header: 'Assignee',
        cell: (info) => (
          <span className="assignee">{info.getValue() as string}</span>
        ),
        enableSorting: true,
        size: 180,
      },
      {
        accessorKey: 'storyPoints',
        header: 'Story Points',
        cell: (info) => {
          const value = info.getValue() as number | null
          return value !== null ? (
            <span className="story-points">{value}</span>
          ) : (
            <span className="no-value">—</span>
          )
        },
        enableSorting: true,
        size: 120,
      },
      {
        id: 'timeProgress',
        header: 'Time Progress',
        cell: (info) => {
          const row = info.row.original
          return (
            <ProgressBar
              timeSpent={row.timeSpent}
              timeEstimated={row.timeEstimated}
            />
          )
        },
        size: 180,
      },
      {
        accessorKey: 'createdDate',
        header: 'Created',
        cell: (info) => {
          const date = info.getValue() as Date
          return <span className="date-cell">{formatDate(date)}</span>
        },
        enableSorting: true,
        size: 120,
      },
      {
        accessorKey: 'resolvedDate',
        header: 'Resolved',
        cell: (info) => {
          const date = info.getValue() as Date | null
          return <span className="date-cell">{formatDate(date)}</span>
        },
        enableSorting: true,
        size: 120,
      },
      {
        accessorKey: 'month',
        header: 'Month',
        cell: (info) => (
          <span className="month-cell">{info.getValue() as string}</span>
        ),
        enableGrouping: true,
        enableSorting: true,
        size: 150,
      },
      {
        accessorKey: 'sprint',
        header: 'Sprint',
        cell: (info) => (
          <span className="sprint-cell">{info.getValue() as string}</span>
        ),
        enableGrouping: true,
        size: 120,
      },
      {
        accessorKey: 'labels',
        header: 'Labels',
        cell: (info) => <TagsCell tags={info.getValue() as string[]} />,
        size: 200,
      },
      {
        accessorKey: 'components',
        header: 'Components',
        cell: (info) => <TagsCell tags={info.getValue() as string[]} />,
        size: 200,
      },
    ],
    []
  )

  const table = useReactTable({
    data,
    columns,
    state: {
      sorting,
      columnFilters,
      grouping,
      columnVisibility,
      globalFilter,
    },
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    onGroupingChange: setGrouping,
    onColumnVisibilityChange: setColumnVisibility,
    onGlobalFilterChange: setGlobalFilter,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getGroupedRowModel: getGroupedRowModel(),
    initialState: {
      pagination: {
        pageSize: DEFAULT_PAGE_SIZE,
      },
    },
    globalFilterFn: 'includesString',
  })

  const statusFilter =
    (table.getColumn('status')?.getFilterValue() as string[]) || []
  const priorityFilter =
    (table.getColumn('priority')?.getFilterValue() as string[]) || []

  const handleStatusFilter = (status: string) => {
    const column = table.getColumn('status')
    const currentFilter = (column?.getFilterValue() as string[]) || []
    const newFilter = toggleFilterValue(currentFilter, status)
    column?.setFilterValue(newFilter)
  }

  const handlePriorityFilter = (priority: string) => {
    const column = table.getColumn('priority')
    const currentFilter = (column?.getFilterValue() as string[]) || []
    const newFilter = toggleFilterValue(currentFilter, priority)
    column?.setFilterValue(newFilter)
  }

  const handleExport = () => {
    const rows = table.getFilteredRowModel().rows
    const csvContent = generateCSVContent(rows, columns)
    exportToCSV(csvContent)
  }

  const getSortIcon = (sortDirection: string | false) => {
    if (sortDirection === 'asc') return <ChevronUp size={ICON_SIZE_MEDIUM} />
    if (sortDirection === 'desc')
      return <ChevronDown size={ICON_SIZE_MEDIUM} />
    return <MoreHorizontal size={ICON_SIZE_SMALL} />
  }

  return (
    <div className="table-container">
      {usingMockData && (
        <div
          style={{
            padding: '0.75rem 1rem',
            background: 'var(--warning)',
            color: 'white',
            textAlign: 'center',
            fontSize: '0.9rem',
          }}
        >
          ⚠️ Using demo data (backend not connected)
        </div>
      )}
      <div className="table-toolbar">
        <div className="toolbar-left">
          <div className="search-box">
            <Search className="search-icon" size={ICON_SIZE_LARGE} />
            <input
              type="text"
              placeholder={SEARCH_PLACEHOLDER}
              value={globalFilter}
              onChange={(e) => setGlobalFilter(e.target.value)}
              className="search-input"
            />
          </div>
        </div>

        <div className="toolbar-right">
          <div className="filter-group">
            <Filter size={ICON_SIZE_LARGE} />
            <span className="filter-label">Status:</span>
            {STATUS_OPTIONS.map((status) => (
              <button
                key={status}
                className={`filter-chip ${
                  statusFilter.includes(status) ? 'active' : ''
                }`}
                onClick={() => handleStatusFilter(status)}
              >
                {status}
              </button>
            ))}
          </div>

          <div className="filter-group">
            <span className="filter-label">Priority:</span>
            {PRIORITY_OPTIONS.map((priority) => (
              <button
                key={priority}
                className={`filter-chip ${
                  priorityFilter.includes(priority) ? 'active' : ''
                }`}
                onClick={() => handlePriorityFilter(priority)}
              >
                {priority}
              </button>
            ))}
          </div>

          <button className="toolbar-button" onClick={handleExport}>
            <Download size={ICON_SIZE_LARGE} />
            Export
          </button>
        </div>
      </div>

      <div className="table-wrapper">
        <table className="data-table">
          <thead>
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <th
                    key={header.id}
                    style={{ width: header.getSize() }}
                    className={header.column.getCanSort() ? 'sortable' : ''}
                  >
                    <div className="header-content">
                      {header.isPlaceholder ? null : (
                        <div
                          className="header-text"
                          onClick={header.column.getToggleSortingHandler()}
                        >
                          {flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                          {header.column.getCanSort() && (
                            <span className="sort-indicator">
                              {getSortIcon(header.column.getIsSorted())}
                            </span>
                          )}
                        </div>
                      )}
                      {header.column.getCanGroup() && (
                        <button
                          className="group-button"
                          onClick={() => header.column.toggleGrouping()}
                        >
                          Group
                        </button>
                      )}
                    </div>
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan={columns.length} className="empty-state">
                  {EMPTY_STATE_MESSAGES.LOADING}
                </td>
              </tr>
            ) : error ? (
              <tr>
                <td colSpan={columns.length} className="empty-state">
                  {EMPTY_STATE_MESSAGES.ERROR}: {error}
                </td>
              </tr>
            ) : table.getRowModel().rows.length === 0 ? (
              <tr>
                <td colSpan={columns.length} className="empty-state">
                  {EMPTY_STATE_MESSAGES.NO_DATA}
                </td>
              </tr>
            ) : (
              table.getRowModel().rows.map((row) => (
                <tr key={row.id} className="table-row">
                  {row.getVisibleCells().map((cell) => (
                    <td key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </td>
                  ))}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      <div className="table-footer">
        <div className="footer-info">
          <span>
            Showing {table.getRowModel().rows.length} of{' '}
            {table.getFilteredRowModel().rows.length} entries
            {table.getFilteredRowModel().rows.length !== data.length &&
              ` (total ${data.length})`}
          </span>
        </div>

        <div className="pagination">
          <button
            className="pagination-button"
            onClick={() => table.setPageIndex(0)}
            disabled={!table.getCanPreviousPage()}
          >
            «
          </button>
          <button
            className="pagination-button"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            <ChevronLeft size={ICON_SIZE_MEDIUM} />
          </button>
          <span className="pagination-info">
            Page {table.getState().pagination.pageIndex + 1} of{' '}
            {table.getPageCount()}
          </span>
          <button
            className="pagination-button"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            <ChevronRight size={ICON_SIZE_MEDIUM} />
          </button>
          <button
            className="pagination-button"
            onClick={() => table.setPageIndex(table.getPageCount() - 1)}
            disabled={!table.getCanNextPage()}
          >
            »
          </button>
          <select
            className="page-size-select"
            value={table.getState().pagination.pageSize}
            onChange={(e) => {
              table.setPageSize(Number(e.target.value))
            }}
          >
            {PAGE_SIZE_OPTIONS.map((pageSize) => (
              <option key={pageSize} value={pageSize}>
                {pageSize} per page
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  )
}
