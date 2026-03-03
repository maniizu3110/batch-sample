import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import Footer from '../Footer'

describe('Footer', () => {
  it('renders copyright text', () => {
    render(<Footer />)
    expect(screen.getByText(/© 2026 BatchSample\. All rights reserved\./)).toBeInTheDocument()
  })

  it('renders the brand name section', () => {
    render(<Footer />)
    expect(screen.getByText('BatchSample')).toBeInTheDocument()
  })

  it('renders the description text', () => {
    render(<Footer />)
    expect(screen.getByText(/A sample Next\.js project for testing Claude Code \/batch command\./)).toBeInTheDocument()
  })

  it('renders footer links', () => {
    render(<Footer />)
    const expectedLinks = [
      { label: 'About', href: '/about' },
      { label: 'Blog', href: '/blog' },
      { label: 'Contact', href: '/contact' },
    ]

    for (const { label, href } of expectedLinks) {
      const link = screen.getByRole('link', { name: label })
      expect(link).toBeInTheDocument()
      expect(link).toHaveAttribute('href', href)
    }
  })

  it('renders contact email', () => {
    render(<Footer />)
    expect(screen.getByText('example@batch-sample.dev')).toBeInTheDocument()
  })

  it('renders a footer element', () => {
    render(<Footer />)
    expect(screen.getByRole('contentinfo')).toBeInTheDocument()
  })

  it('renders section headings', () => {
    render(<Footer />)
    expect(screen.getByText('Links')).toBeInTheDocument()
    const contactHeading = screen.getByRole('heading', { name: 'Contact' })
    expect(contactHeading).toBeInTheDocument()
  })
})
