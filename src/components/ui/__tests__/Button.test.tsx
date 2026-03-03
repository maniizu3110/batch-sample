import { render, screen, fireEvent } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'
import Button from '../Button'

describe('Button', () => {
  it('renders children text', () => {
    render(<Button>Click me</Button>)
    expect(screen.getByRole('button', { name: 'Click me' })).toBeInTheDocument()
  })

  // Variant tests
  describe('variants', () => {
    it('applies primary variant styles by default', () => {
      render(<Button>Primary</Button>)
      const button = screen.getByRole('button')
      expect(button).toHaveClass('bg-blue-600', 'text-white')
    })

    it('applies secondary variant styles', () => {
      render(<Button variant="secondary">Secondary</Button>)
      const button = screen.getByRole('button')
      expect(button).toHaveClass('bg-gray-200', 'text-gray-800')
    })

    it('applies danger variant styles', () => {
      render(<Button variant="danger">Danger</Button>)
      const button = screen.getByRole('button')
      expect(button).toHaveClass('bg-red-600', 'text-white')
    })
  })

  // Size tests
  describe('sizes', () => {
    it('applies md size styles by default', () => {
      render(<Button>Medium</Button>)
      const button = screen.getByRole('button')
      expect(button).toHaveClass('px-4', 'py-2', 'text-base')
    })

    it('applies sm size styles', () => {
      render(<Button size="sm">Small</Button>)
      const button = screen.getByRole('button')
      expect(button).toHaveClass('px-3', 'py-1', 'text-sm')
    })

    it('applies lg size styles', () => {
      render(<Button size="lg">Large</Button>)
      const button = screen.getByRole('button')
      expect(button).toHaveClass('px-6', 'py-3', 'text-lg')
    })
  })

  // Disabled state
  it('renders as disabled when disabled prop is true', () => {
    render(<Button disabled>Disabled</Button>)
    const button = screen.getByRole('button')
    expect(button).toBeDisabled()
    expect(button).toHaveClass('opacity-50', 'cursor-not-allowed')
  })

  it('is not disabled by default', () => {
    render(<Button>Enabled</Button>)
    expect(screen.getByRole('button')).not.toBeDisabled()
  })

  // onClick callback
  it('calls onClick when clicked', () => {
    const handleClick = vi.fn()
    render(<Button onClick={handleClick}>Click</Button>)
    fireEvent.click(screen.getByRole('button'))
    expect(handleClick).toHaveBeenCalledTimes(1)
  })

  it('does not call onClick when disabled', () => {
    const handleClick = vi.fn()
    render(<Button onClick={handleClick} disabled>Click</Button>)
    fireEvent.click(screen.getByRole('button'))
    expect(handleClick).not.toHaveBeenCalled()
  })
})
