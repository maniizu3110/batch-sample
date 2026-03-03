import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import DataTable from '../DataTable'

interface TestRow {
  name: string
  age: number
  role: string
}

const columns = [
  { key: 'name' as const, header: 'Name' },
  { key: 'age' as const, header: 'Age' },
  { key: 'role' as const, header: 'Role' },
]

const data: TestRow[] = [
  { name: 'Alice', age: 30, role: 'Engineer' },
  { name: 'Bob', age: 25, role: 'Designer' },
]

describe('DataTable', () => {
  it('renders column headers', () => {
    render(<DataTable columns={columns} data={data} />)
    expect(screen.getByText('Name')).toBeInTheDocument()
    expect(screen.getByText('Age')).toBeInTheDocument()
    expect(screen.getByText('Role')).toBeInTheDocument()
  })

  it('renders row data', () => {
    render(<DataTable columns={columns} data={data} />)
    expect(screen.getByText('Alice')).toBeInTheDocument()
    expect(screen.getByText('30')).toBeInTheDocument()
    expect(screen.getByText('Engineer')).toBeInTheDocument()
    expect(screen.getByText('Bob')).toBeInTheDocument()
    expect(screen.getByText('25')).toBeInTheDocument()
    expect(screen.getByText('Designer')).toBeInTheDocument()
  })

  it('renders empty state with default message', () => {
    render(<DataTable columns={columns} data={[]} />)
    expect(screen.getByText('No data available')).toBeInTheDocument()
  })

  it('renders empty state with custom message', () => {
    render(<DataTable columns={columns} data={[]} emptyMessage="Nothing to show" />)
    expect(screen.getByText('Nothing to show')).toBeInTheDocument()
  })

  it('does not render table when data is empty', () => {
    render(<DataTable columns={columns} data={[]} />)
    expect(screen.queryByRole('table')).not.toBeInTheDocument()
  })

  it('renders table element when data is present', () => {
    render(<DataTable columns={columns} data={data} />)
    expect(screen.getByRole('table')).toBeInTheDocument()
  })

  it('renders correct number of rows', () => {
    render(<DataTable columns={columns} data={data} />)
    const rows = screen.getAllByRole('row')
    // 1 header row + 2 data rows
    expect(rows).toHaveLength(3)
  })

  it('supports custom render function', () => {
    const columnsWithRender = [
      { key: 'name' as const, header: 'Name' },
      {
        key: 'age' as const,
        header: 'Age',
        render: (value: unknown) => <strong>{String(value)} years</strong>,
      },
    ]
    render(<DataTable columns={columnsWithRender} data={data} />)
    expect(screen.getByText('30 years')).toBeInTheDocument()
    expect(screen.getByText('25 years')).toBeInTheDocument()
  })
})
