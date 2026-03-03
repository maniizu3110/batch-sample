import { render, screen, fireEvent } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'
import Input from '../Input'

describe('Input', () => {
  it('renders the label text', () => {
    render(<Input label="Email" />)
    expect(screen.getByText('Email')).toBeInTheDocument()
  })

  it('renders with placeholder text', () => {
    render(<Input label="Email" placeholder="Enter email" />)
    expect(screen.getByPlaceholderText('Enter email')).toBeInTheDocument()
  })

  it('uses text type by default', () => {
    render(<Input label="Name" placeholder="Enter name" />)
    const input = screen.getByPlaceholderText('Enter name')
    expect(input).toHaveAttribute('type', 'text')
  })

  it('accepts a custom type prop', () => {
    render(<Input label="Password" type="password" placeholder="Enter password" />)
    const input = screen.getByPlaceholderText('Enter password')
    expect(input).toHaveAttribute('type', 'password')
  })

  it('displays error message when error prop is provided', () => {
    render(<Input label="Email" error="Invalid email" />)
    expect(screen.getByText('Invalid email')).toBeInTheDocument()
  })

  it('applies error border styles when error is present', () => {
    render(<Input label="Email" error="Required" placeholder="Email" />)
    const input = screen.getByPlaceholderText('Email')
    expect(input).toHaveClass('border-red-500')
  })

  it('applies normal border styles when no error', () => {
    render(<Input label="Email" placeholder="Email" />)
    const input = screen.getByPlaceholderText('Email')
    expect(input).toHaveClass('border-gray-300')
  })

  it('does not display error message when error is not provided', () => {
    const { container } = render(<Input label="Email" />)
    const errorP = container.querySelector('p.text-red-600')
    expect(errorP).not.toBeInTheDocument()
  })

  it('calls onChange when value changes', () => {
    const handleChange = vi.fn()
    render(<Input label="Name" placeholder="Enter name" onChange={handleChange} />)
    fireEvent.change(screen.getByPlaceholderText('Enter name'), {
      target: { value: 'John' },
    })
    expect(handleChange).toHaveBeenCalledTimes(1)
  })

  it('shows required indicator when required is true', () => {
    render(<Input label="Email" required />)
    expect(screen.getByText('*')).toBeInTheDocument()
  })

  it('does not show required indicator by default', () => {
    const { container } = render(<Input label="Email" />)
    const asterisk = container.querySelector('.text-red-500')
    expect(asterisk).not.toBeInTheDocument()
  })
})
