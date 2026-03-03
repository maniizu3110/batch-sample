import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import BlogPostCard from '../BlogPostCard'

const defaultProps = {
  title: 'Getting Started with React',
  excerpt: 'Learn the basics of React including components, props, and state management.',
  author: 'Jane Doe',
  date: '2026-03-01',
  category: 'React',
  readTime: '5 min read',
}

describe('BlogPostCard', () => {
  it('renders title', () => {
    render(<BlogPostCard {...defaultProps} />)
    expect(screen.getByText('Getting Started with React')).toBeInTheDocument()
  })

  it('renders excerpt', () => {
    render(<BlogPostCard {...defaultProps} />)
    expect(
      screen.getByText('Learn the basics of React including components, props, and state management.')
    ).toBeInTheDocument()
  })

  it('renders author', () => {
    render(<BlogPostCard {...defaultProps} />)
    expect(screen.getByText('Jane Doe')).toBeInTheDocument()
  })

  it('renders date', () => {
    render(<BlogPostCard {...defaultProps} />)
    expect(screen.getByText('2026-03-01')).toBeInTheDocument()
  })

  it('renders category as a badge', () => {
    render(<BlogPostCard {...defaultProps} />)
    expect(screen.getByText('React')).toBeInTheDocument()
  })

  it('renders read time', () => {
    render(<BlogPostCard {...defaultProps} />)
    expect(screen.getByText('5 min read')).toBeInTheDocument()
  })

  it('renders as an article element', () => {
    render(<BlogPostCard {...defaultProps} />)
    expect(screen.getByRole('article')).toBeInTheDocument()
  })

  it('renders heading with correct level', () => {
    render(<BlogPostCard {...defaultProps} />)
    const heading = screen.getByRole('heading', { level: 2 })
    expect(heading).toHaveTextContent('Getting Started with React')
  })
})
