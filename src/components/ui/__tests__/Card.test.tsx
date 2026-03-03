import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import Card from '../Card'

describe('Card', () => {
  it('renders the title', () => {
    render(<Card title="Test Card" />)
    expect(screen.getByText('Test Card')).toBeInTheDocument()
  })

  it('renders the title as an h3 element', () => {
    render(<Card title="Heading" />)
    const heading = screen.getByText('Heading')
    expect(heading.tagName).toBe('H3')
  })

  it('renders description when provided', () => {
    render(<Card title="Title" description="Some description" />)
    expect(screen.getByText('Some description')).toBeInTheDocument()
  })

  it('does not render description when not provided', () => {
    const { container } = render(<Card title="Title" />)
    const paragraphs = container.querySelectorAll('p.text-gray-600')
    expect(paragraphs.length).toBe(0)
  })

  it('renders children content', () => {
    render(
      <Card title="Title">
        <span>Child content</span>
      </Card>
    )
    expect(screen.getByText('Child content')).toBeInTheDocument()
  })

  it('renders footer when provided', () => {
    render(
      <Card title="Title" footer={<span>Footer content</span>} />
    )
    expect(screen.getByText('Footer content')).toBeInTheDocument()
  })

  it('does not render footer section when footer is not provided', () => {
    const { container } = render(<Card title="Title" />)
    const footerDiv = container.querySelector('.bg-gray-50')
    expect(footerDiv).not.toBeInTheDocument()
  })

  it('renders footer in a separate bordered section', () => {
    const { container } = render(
      <Card title="Title" footer={<span>Footer</span>} />
    )
    const footerDiv = container.querySelector('.bg-gray-50')
    expect(footerDiv).toBeInTheDocument()
    expect(footerDiv).toHaveClass('border-t', 'border-gray-200')
  })
})
