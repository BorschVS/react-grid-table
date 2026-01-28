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
import { JiraTask } from '../types/jira'
import { useTasks } from '../hooks/useTasks'
import { format } from 'date-fns'
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
import './JiraStatsTable.css'

// Cell components
const StatusBadge = ({ status }: { status: string }) => {
  const statusColors: Record<string, string> = {
    Done: 'var(--success)',
    'In Progress': 'var(--info)',
    'To Do': 'var(--text-tertiary)',
    Blocked: 'var(--error)',
    Review: 'var(--warning)',
  }

  return (
    <span
      className="status-badge"
      style={{ backgroundColor: statusColors[status] || statusColors['To Do'] }}
    >
      {status}
    </span>
  )
}

const PriorityBadge = ({ priority }: { priority: string }) => {
  const priorityColors: Record<string, string> = {
    Critical: 'var(--error)',
    High: 'var(--warning)',
    Medium: 'var(--info)',
    Low: 'var(--text-tertiary)',
  }

  return (
    <span
      className="priority-badge"
      style={{ backgroundColor: priorityColors[priority] || priorityColors['Low'] }}
    >
      {priority}
    </span>
  )
}

const ProgressBar = ({
  timeSpent,
  timeEstimated,
}: {
  timeSpent: number
  timeEstimated: number
}) => {
  const percentage = Math.min((timeSpent / timeEstimated) * 100, 100)
  const color =
    percentage > 100
      ? 'var(--error)'
      : percentage > 80
      ? 'var(--warning)'
      : 'var(--success)'

  return (
    <div className="progress-bar-container">
      <div className="progress-bar" style={{ width: `${percentage}%`, backgroundColor: color }} />
      <span className="progress-text">
        {timeSpent}h / {timeEstimated}h
      </span>
    </div>
  )
}

const TagsCell = ({ tags }: { tags: string[] }) => {
  return (
    <div className="tags-cell">
      {tags.slice(0, 2).map((tag, idx) => (
        <span key={idx} className="tag">
          {tag}
        </span>
      ))}
      {tags.length > 2 && (
        <span className="tag-more">+{tags.length - 2}</span>
      )}
    </div>
  )
}

export default function JiraStatsTable() {
  const { tasks: data, loading, error } = useTasks()
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
        filterFn: (row, id, value) => {
          return value.includes(row.getValue(id))
        },
        size: 140,
      },
      {
        accessorKey: 'priority',
        header: 'Priority',
        cell: (info) => <PriorityBadge priority={info.getValue() as string} />,
        enableGrouping: true,
        enableSorting: true,
        filterFn: (row, id, value) => {
          return value.includes(row.getValue(id))
        },
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
          return (
            <span className="date-cell">
              {format(date, 'dd.MM.yyyy')}
            </span>
          )
        },
        enableSorting: true,
        size: 120,
      },
      {
        accessorKey: 'resolvedDate',
        header: 'Resolved',
        cell: (info) => {
          const date = info.getValue() as Date | null
          return date ? (
            <span className="date-cell">
              {format(date, 'dd.MM.yyyy')}
            </span>
          ) : (
            <span className="no-value">—</span>
          )
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
        pageSize: 20,
      },
    },
    globalFilterFn: 'includesString',
  })

  const statusOptions = ['Done', 'In Progress', 'To Do', 'Blocked', 'Review']
  const priorityOptions = ['Critical', 'High', 'Medium', 'Low']

  const statusFilter = (table.getColumn('status')?.getFilterValue() as string[]) || []
  const priorityFilter = (table.getColumn('priority')?.getFilterValue() as string[]) || []

  const handleStatusFilter = (status: string) => {
    const column = table.getColumn('status')
    const currentFilter = (column?.getFilterValue() as string[]) || []
    const newFilter = currentFilter.includes(status)
      ? currentFilter.filter((s) => s !== status)
      : [...currentFilter, status]
    column?.setFilterValue(newFilter.length > 0 ? newFilter : undefined)
  }

  const handlePriorityFilter = (priority: string) => {
    const column = table.getColumn('priority')
    const currentFilter = (column?.getFilterValue() as string[]) || []
    const newFilter = currentFilter.includes(priority)
      ? currentFilter.filter((p) => p !== priority)
      : [...currentFilter, priority]
    column?.setFilterValue(newFilter.length > 0 ? newFilter : undefined)
  }

  const handleExport = () => {
    const rows = table.getFilteredRowModel().rows
    const headers = columns.map((col) => {
      if (typeof col.header === 'string') return col.header
      if ('accessorKey' in col && col.accessorKey) return col.accessorKey as string
      return ''
    })

    const csvContent = [
      headers.join(','),
      ...rows.map((row) =>
        columns
          .map((col) => {
            const value = 'accessorKey' in col && col.accessorKey
              ? row.original[col.accessorKey as keyof JiraTask]
              : ''
            if (value === null || value === undefined) return ''
            if (Array.isArray(value)) return value.join('; ')
            if (value instanceof Date) return format(value, 'dd.MM.yyyy')
            return typeof value === 'string' ? `"${value}"` : String(value)
          })
          .join(',')
      ),
    ].join('\n')

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' })
    const link = document.createElement('a')
    link.href = URL.createObjectURL(blob)
    link.download = `jira-statistics-${format(new Date(), 'yyyy-MM-dd')}.csv`
    link.click()
  }

  return (
    <div className="table-container">
      <div className="table-toolbar">
        <div className="toolbar-left">
          <div className="search-box">
            <Search className="search-icon" size={18} />
            <input
              type="text"
              placeholder="Search across all columns..."
              value={globalFilter}
              onChange={(e) => setGlobalFilter(e.target.value)}
              className="search-input"
            />
          </div>
        </div>

        <div className="toolbar-right">
          <div className="filter-group">
            <Filter size={18} />
            <span className="filter-label">Status:</span>
            {statusOptions.map((status) => (
              <button
                key={status}
                className={`filter-chip ${statusFilter.includes(status) ? 'active' : ''}`}
                onClick={() => handleStatusFilter(status)}
              >
                {status}
              </button>
            ))}
          </div>

          <div className="filter-group">
            <span className="filter-label">Priority:</span>
            {priorityOptions.map((priority) => (
              <button
                key={priority}
                className={`filter-chip ${priorityFilter.includes(priority) ? 'active' : ''}`}
                onClick={() => handlePriorityFilter(priority)}
              >
                {priority}
              </button>
            ))}
          </div>

          <button className="toolbar-button" onClick={handleExport}>
            <Download size={18} />
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
                              {{
                                asc: <ChevronUp size={16} />,
                                desc: <ChevronDown size={16} />,
                              }[header.column.getIsSorted() as string] ?? (
                                <MoreHorizontal size={14} />
                              )}
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
                  Loading...
                </td>
              </tr>
            ) : error ? (
              <tr>
                <td colSpan={columns.length} className="empty-state">
                  Error: {error}
                </td>
              </tr>
            ) : table.getRowModel().rows.length === 0 ? (
              <tr>
                <td colSpan={columns.length} className="empty-state">
                  No data to display
                </td>
              </tr>
            ) : (
              table.getRowModel().rows.map((row) => (
                <tr key={row.id} className="table-row">
                  {row.getVisibleCells().map((cell) => (
                    <td key={cell.id}>
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
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
            <ChevronLeft size={16} />
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
            <ChevronRight size={16} />
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
            {[10, 20, 50, 100].map((pageSize) => (
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
