import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import StatsCard from '../StatsCard'

describe('StatsCard', () => {
  it('renders title', () => {
    render(<StatsCard title="Total Users" value={1234} icon="👥" />)
    expect(screen.getByText('Total Users')).toBeInTheDocument()
  })

  it('renders numeric value', () => {
    render(<StatsCard title="Total Users" value={1234} icon="👥" />)
    expect(screen.getByText('1234')).toBeInTheDocument()
  })

  it('renders string value', () => {
    render(<StatsCard title="Revenue" value="$12,345" icon="💰" />)
    expect(screen.getByText('$12,345')).toBeInTheDocument()
  })

  it('renders icon', () => {
    render(<StatsCard title="Total Users" value={1234} icon="👥" />)
    expect(screen.getByText('👥')).toBeInTheDocument()
  })

  it('renders change text when provided', () => {
    render(<StatsCard title="Total Users" value={1234} icon="👥" change="+12% from last month" />)
    expect(screen.getByText('+12% from last month')).toBeInTheDocument()
  })

  it('does not render change text when not provided', () => {
    render(<StatsCard title="Total Users" value={1234} icon="👥" />)
    expect(screen.queryByText(/from last month/)).not.toBeInTheDocument()
  })

  it('applies green color for positive changeType', () => {
    render(
      <StatsCard title="Users" value={100} icon="👥" change="+10%" changeType="positive" />
    )
    const changeElement = screen.getByText('+10%')
    expect(changeElement).toHaveClass('text-green-600')
  })

  it('applies red color for negative changeType', () => {
    render(
      <StatsCard title="Users" value={100} icon="👥" change="-5%" changeType="negative" />
    )
    const changeElement = screen.getByText('-5%')
    expect(changeElement).toHaveClass('text-red-600')
  })

  it('applies gray color for neutral changeType', () => {
    render(
      <StatsCard title="Users" value={100} icon="👥" change="0%" changeType="neutral" />
    )
    const changeElement = screen.getByText('0%')
    expect(changeElement).toHaveClass('text-gray-600')
  })

  it('defaults to neutral changeType when not specified', () => {
    render(
      <StatsCard title="Users" value={100} icon="👥" change="No change" />
    )
    const changeElement = screen.getByText('No change')
    expect(changeElement).toHaveClass('text-gray-600')
  })
})
