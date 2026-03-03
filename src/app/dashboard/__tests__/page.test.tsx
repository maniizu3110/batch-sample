import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import DashboardPage from '../page'

describe('DashboardPage', () => {
  it('renders without crashing', () => {
    render(<DashboardPage />)
    expect(screen.getByText('Dashboard')).toBeInTheDocument()
  })

  it('renders all stats cards', () => {
    render(<DashboardPage />)
    expect(screen.getByText('Total Users')).toBeInTheDocument()
    expect(screen.getByText('12,345')).toBeInTheDocument()
    expect(screen.getByText('Revenue')).toBeInTheDocument()
    expect(screen.getByText('$45,678')).toBeInTheDocument()
    expect(screen.getByText('Orders')).toBeInTheDocument()
    expect(screen.getByText('1,234')).toBeInTheDocument()
    expect(screen.getByText('Conversion')).toBeInTheDocument()
    expect(screen.getByText('3.2%')).toBeInTheDocument()
  })

  it('renders stats change indicators', () => {
    render(<DashboardPage />)
    expect(screen.getByText('+12% from last month')).toBeInTheDocument()
    expect(screen.getByText('+8% from last month')).toBeInTheDocument()
    expect(screen.getByText('-3% from last month')).toBeInTheDocument()
    expect(screen.getByText('No change')).toBeInTheDocument()
  })

  it('renders the Recent Orders heading', () => {
    render(<DashboardPage />)
    expect(screen.getByText('Recent Orders')).toBeInTheDocument()
  })

  it('renders data table column headers', () => {
    render(<DashboardPage />)
    expect(screen.getByText('Order ID')).toBeInTheDocument()
    expect(screen.getByText('Customer')).toBeInTheDocument()
    expect(screen.getByText('Amount')).toBeInTheDocument()
    expect(screen.getByText('Status')).toBeInTheDocument()
    expect(screen.getByText('Date')).toBeInTheDocument()
  })

  it('renders order data rows', () => {
    render(<DashboardPage />)
    expect(screen.getByText('ORD-001')).toBeInTheDocument()
    expect(screen.getByText('Alice Johnson')).toBeInTheDocument()
    expect(screen.getByText('$120.00')).toBeInTheDocument()
    expect(screen.getByText('ORD-005')).toBeInTheDocument()
    expect(screen.getByText('Eve Davis')).toBeInTheDocument()
  })

  it('renders order status badges', () => {
    render(<DashboardPage />)
    expect(screen.getAllByText('completed')).toHaveLength(2)
    expect(screen.getAllByText('pending')).toHaveLength(2)
    expect(screen.getByText('cancelled')).toBeInTheDocument()
  })
})
