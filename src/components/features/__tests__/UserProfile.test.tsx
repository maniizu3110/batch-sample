import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import UserProfile from '../UserProfile'

const defaultProps = {
  name: 'John Doe',
  email: 'john@example.com',
  role: 'Admin',
}

describe('UserProfile', () => {
  it('renders the user name', () => {
    render(<UserProfile {...defaultProps} />)

    expect(screen.getByText('John Doe')).toBeInTheDocument()
  })

  it('renders the user email', () => {
    render(<UserProfile {...defaultProps} />)

    expect(screen.getByText('john@example.com')).toBeInTheDocument()
  })

  it('renders the role as a badge', () => {
    render(<UserProfile {...defaultProps} />)

    expect(screen.getByText('Admin')).toBeInTheDocument()
  })

  it('renders initials when no avatar URL is provided', () => {
    render(<UserProfile {...defaultProps} />)

    expect(screen.getByText('J')).toBeInTheDocument()
  })

  it('renders avatar image when avatarUrl is provided', () => {
    render(<UserProfile {...defaultProps} avatarUrl="https://example.com/avatar.jpg" />)

    const img = screen.getByAltText('John Doe')
    expect(img).toBeInTheDocument()
    expect(img).toHaveAttribute('src', 'https://example.com/avatar.jpg')
  })

  it('does not render an image when no avatarUrl is provided', () => {
    render(<UserProfile {...defaultProps} />)

    expect(screen.queryByRole('img')).not.toBeInTheDocument()
  })

  it('renders Edit Profile button', () => {
    render(<UserProfile {...defaultProps} />)

    expect(screen.getByRole('button', { name: 'Edit Profile' })).toBeInTheDocument()
  })

  it('renders Message button', () => {
    render(<UserProfile {...defaultProps} />)

    expect(screen.getByRole('button', { name: 'Message' })).toBeInTheDocument()
  })

  it('renders correctly with different props', () => {
    render(<UserProfile name="Alice Smith" email="alice@test.com" role="Editor" />)

    expect(screen.getByText('Alice Smith')).toBeInTheDocument()
    expect(screen.getByText('alice@test.com')).toBeInTheDocument()
    expect(screen.getByText('Editor')).toBeInTheDocument()
    expect(screen.getByText('A')).toBeInTheDocument()
  })
})
