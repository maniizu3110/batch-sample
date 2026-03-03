import { render, screen } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'
import Sidebar from '../Sidebar'

vi.mock('next/link', () => ({
  default: ({ children, href, ...props }: any) => <a href={href} {...props}>{children}</a>
}))

vi.mock('next/navigation', () => ({
  usePathname: () => '/'
}))

const sampleItems = [
  { href: '/dashboard', label: 'Dashboard', icon: '📊' },
  { href: '/users', label: 'Users', icon: '👥' },
  { href: '/settings', label: 'Settings', icon: '⚙️' },
]

describe('Sidebar', () => {
  it('renders all navigation items', () => {
    render(<Sidebar items={sampleItems} />)

    for (const item of sampleItems) {
      const link = screen.getByRole('link', { name: new RegExp(item.label) })
      expect(link).toBeInTheDocument()
      expect(link).toHaveAttribute('href', item.href)
    }
  })

  it('renders item icons', () => {
    render(<Sidebar items={sampleItems} />)
    expect(screen.getByText('📊')).toBeInTheDocument()
    expect(screen.getByText('👥')).toBeInTheDocument()
    expect(screen.getByText('⚙️')).toBeInTheDocument()
  })

  it('applies active styling to the active item', () => {
    render(<Sidebar items={sampleItems} activeHref="/dashboard" />)
    const activeLink = screen.getByRole('link', { name: /Dashboard/ })
    expect(activeLink).toHaveClass('bg-blue-100', 'text-blue-700')
  })

  it('applies inactive styling to non-active items', () => {
    render(<Sidebar items={sampleItems} activeHref="/dashboard" />)
    const inactiveLink = screen.getByRole('link', { name: /Users/ })
    expect(inactiveLink).toHaveClass('text-gray-600')
    expect(inactiveLink).not.toHaveClass('bg-blue-100')
  })

  it('renders no active styling when activeHref is not provided', () => {
    render(<Sidebar items={sampleItems} />)
    const links = screen.getAllByRole('link')
    for (const link of links) {
      expect(link).not.toHaveClass('bg-blue-100')
    }
  })

  it('renders an aside element with navigation', () => {
    render(<Sidebar items={sampleItems} />)
    expect(screen.getByRole('complementary')).toBeInTheDocument()
    expect(screen.getByRole('navigation')).toBeInTheDocument()
  })

  it('renders with empty items array', () => {
    render(<Sidebar items={[]} />)
    expect(screen.getByRole('complementary')).toBeInTheDocument()
    expect(screen.queryAllByRole('link')).toHaveLength(0)
  })
})
