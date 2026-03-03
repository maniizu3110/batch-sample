import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import Home from '../page'

describe('HomePage', () => {
  it('renders without crashing', () => {
    render(<Home />)
    expect(screen.getByText('Welcome to BatchSample')).toBeInTheDocument()
  })

  it('renders the subtitle', () => {
    render(<Home />)
    expect(
      screen.getByText(/A sample Next\.js project for testing Claude Code \/batch command/)
    ).toBeInTheDocument()
  })

  it('renders Get Started and Learn More buttons', () => {
    render(<Home />)
    expect(screen.getByText('Get Started')).toBeInTheDocument()
    expect(screen.getByText('Learn More')).toBeInTheDocument()
  })

  it('renders three feature cards', () => {
    render(<Home />)
    expect(screen.getByText('Fast')).toBeInTheDocument()
    expect(screen.getByText('Scalable')).toBeInTheDocument()
    expect(screen.getByText('Modern')).toBeInTheDocument()
  })

  it('renders feature badges', () => {
    render(<Home />)
    expect(screen.getByText('Performance')).toBeInTheDocument()
    expect(screen.getByText('Architecture')).toBeInTheDocument()
    expect(screen.getByText('Technology')).toBeInTheDocument()
  })

  it('renders the CTA section', () => {
    render(<Home />)
    expect(screen.getByText('Ready to try /batch?')).toBeInTheDocument()
    expect(screen.getByText('Explore the Code')).toBeInTheDocument()
  })
})
