import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import Badge from '../Badge'

describe('Badge', () => {
  it('renders children text', () => {
    render(<Badge>Active</Badge>)
    expect(screen.getByText('Active')).toBeInTheDocument()
  })

  it('applies default blue color styles', () => {
    render(<Badge>Default</Badge>)
    const badge = screen.getByText('Default')
    expect(badge).toHaveClass('bg-blue-100', 'text-blue-800')
  })

  it('applies green color styles', () => {
    render(<Badge color="green">Success</Badge>)
    const badge = screen.getByText('Success')
    expect(badge).toHaveClass('bg-green-100', 'text-green-800')
  })

  it('applies red color styles', () => {
    render(<Badge color="red">Error</Badge>)
    const badge = screen.getByText('Error')
    expect(badge).toHaveClass('bg-red-100', 'text-red-800')
  })

  it('applies yellow color styles', () => {
    render(<Badge color="yellow">Warning</Badge>)
    const badge = screen.getByText('Warning')
    expect(badge).toHaveClass('bg-yellow-100', 'text-yellow-800')
  })

  it('applies gray color styles', () => {
    render(<Badge color="gray">Inactive</Badge>)
    const badge = screen.getByText('Inactive')
    expect(badge).toHaveClass('bg-gray-100', 'text-gray-800')
  })

  it('renders as a span element with base styles', () => {
    render(<Badge>Test</Badge>)
    const badge = screen.getByText('Test')
    expect(badge.tagName).toBe('SPAN')
    expect(badge).toHaveClass('inline-flex', 'items-center', 'rounded-full', 'text-xs', 'font-medium')
  })
})
