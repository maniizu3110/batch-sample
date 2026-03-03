import { render, screen, fireEvent } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'
import Modal from '../Modal'

describe('Modal', () => {
  const defaultProps = {
    isOpen: true,
    onClose: vi.fn(),
    title: 'Test Modal',
    children: <p>Modal content</p>,
  }

  it('renders title and children when open', () => {
    render(<Modal {...defaultProps} />)
    expect(screen.getByText('Test Modal')).toBeInTheDocument()
    expect(screen.getByText('Modal content')).toBeInTheDocument()
  })

  it('does not render when isOpen is false', () => {
    render(<Modal {...defaultProps} isOpen={false} />)
    expect(screen.queryByText('Test Modal')).not.toBeInTheDocument()
    expect(screen.queryByText('Modal content')).not.toBeInTheDocument()
  })

  it('calls onClose when close button is clicked', () => {
    const onClose = vi.fn()
    render(<Modal {...defaultProps} onClose={onClose} />)
    fireEvent.click(screen.getByText('\u2715'))
    expect(onClose).toHaveBeenCalledTimes(1)
  })

  it('calls onClose when backdrop is clicked', () => {
    const onClose = vi.fn()
    const { container } = render(<Modal {...defaultProps} onClose={onClose} />)
    const backdrop = container.querySelector('.bg-black.bg-opacity-50')
    expect(backdrop).toBeInTheDocument()
    fireEvent.click(backdrop!)
    expect(onClose).toHaveBeenCalledTimes(1)
  })

  it('renders the title in the header', () => {
    render(<Modal {...defaultProps} title="My Dialog" />)
    const heading = screen.getByText('My Dialog')
    expect(heading.tagName).toBe('H2')
  })

  it('renders children in the body section', () => {
    render(
      <Modal {...defaultProps}>
        <span>Custom child</span>
      </Modal>
    )
    expect(screen.getByText('Custom child')).toBeInTheDocument()
  })
})
