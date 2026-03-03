import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import BlogPage from '../page'

describe('BlogPage', () => {
  it('renders without crashing', () => {
    render(<BlogPage />)
    expect(screen.getByText('Blog')).toBeInTheDocument()
  })

  it('renders all blog post titles', () => {
    render(<BlogPage />)
    expect(screen.getByText('Getting Started with Next.js')).toBeInTheDocument()
    expect(screen.getByText('Understanding React Server Components')).toBeInTheDocument()
    expect(screen.getByText('Tailwind CSS Best Practices')).toBeInTheDocument()
    expect(screen.getByText('TypeScript Tips for Next.js')).toBeInTheDocument()
    expect(screen.getByText('Building Accessible Components')).toBeInTheDocument()
    expect(screen.getByText('Deploying Next.js to Vercel')).toBeInTheDocument()
  })

  it('renders blog post excerpts', () => {
    render(<BlogPage />)
    expect(
      screen.getByText(/Learn the basics of Next\.js and build your first application/)
    ).toBeInTheDocument()
    expect(
      screen.getByText(/Deep dive into React Server Components/)
    ).toBeInTheDocument()
  })

  it('renders blog post categories', () => {
    render(<BlogPage />)
    expect(screen.getByText('Tutorial')).toBeInTheDocument()
    expect(screen.getAllByText('Technical')).toHaveLength(2)
    expect(screen.getByText('Design')).toBeInTheDocument()
    expect(screen.getByText('Accessibility')).toBeInTheDocument()
    expect(screen.getByText('DevOps')).toBeInTheDocument()
  })

  it('renders blog post authors', () => {
    render(<BlogPage />)
    expect(screen.getAllByText('Alice')).toHaveLength(2)
    expect(screen.getAllByText('Bob')).toHaveLength(2)
    expect(screen.getByText('Charlie')).toBeInTheDocument()
    expect(screen.getByText('Diana')).toBeInTheDocument()
  })

  it('renders read time for posts', () => {
    render(<BlogPage />)
    expect(screen.getByText('5 min read')).toBeInTheDocument()
    expect(screen.getByText('8 min read')).toBeInTheDocument()
    expect(screen.getByText('4 min read')).toBeInTheDocument()
  })
})
