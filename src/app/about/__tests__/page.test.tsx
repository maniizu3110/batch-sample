import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import AboutPage from '../page'

describe('AboutPage', () => {
  it('renders without crashing', () => {
    render(<AboutPage />)
    expect(screen.getByText('About Us')).toBeInTheDocument()
  })

  it('renders the mission section', () => {
    render(<AboutPage />)
    expect(screen.getByText('Our Mission')).toBeInTheDocument()
    expect(
      screen.getByText(/We build sample applications to demonstrate the power of modern development tools/)
    ).toBeInTheDocument()
  })

  it('renders the team section heading', () => {
    render(<AboutPage />)
    expect(screen.getByText('Our Team')).toBeInTheDocument()
  })

  it('renders all team members', () => {
    render(<AboutPage />)
    expect(screen.getByText('Alice')).toBeInTheDocument()
    expect(screen.getByText('Bob')).toBeInTheDocument()
    expect(screen.getByText('Charlie')).toBeInTheDocument()
    expect(screen.getByText('Diana')).toBeInTheDocument()
  })

  it('renders team member roles', () => {
    render(<AboutPage />)
    expect(screen.getByText('Frontend Developer')).toBeInTheDocument()
    expect(screen.getByText('Backend Developer')).toBeInTheDocument()
    expect(screen.getByText('Designer')).toBeInTheDocument()
    expect(screen.getByText('DevOps Engineer')).toBeInTheDocument()
  })

  it('renders team member skill badges', () => {
    render(<AboutPage />)
    expect(screen.getByText('React')).toBeInTheDocument()
    expect(screen.getByText('Node.js')).toBeInTheDocument()
    expect(screen.getByText('Figma')).toBeInTheDocument()
    expect(screen.getByText('AWS')).toBeInTheDocument()
  })
})
