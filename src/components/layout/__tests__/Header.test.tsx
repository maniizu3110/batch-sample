import { render, screen } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'
import Header from '../Header'

vi.mock('next/link', () => ({
  default: ({ children, href, ...props }: any) => <a href={href} {...props}>{children}</a>
}))

vi.mock('next/navigation', () => ({
  usePathname: () => '/'
}))

describe('Header', () => {
  it('renders the brand logo link', () => {
    render(<Header />)
    const logo = screen.getByText('BatchSample')
    expect(logo).toBeInTheDocument()
    expect(logo.closest('a')).toHaveAttribute('href', '/')
  })

  it('renders all navigation links with correct hrefs', () => {
    render(<Header />)
    const expectedLinks = [
      { label: 'Home', href: '/' },
      { label: 'About', href: '/about' },
      { label: 'Blog', href: '/blog' },
      { label: 'Dashboard', href: '/dashboard' },
      { label: 'Contact', href: '/contact' },
      { label: 'Settings', href: '/settings' },
    ]

    for (const { label, href } of expectedLinks) {
      const link = screen.getByRole('link', { name: label })
      expect(link).toBeInTheDocument()
      expect(link).toHaveAttribute('href', href)
    }
  })

  it('renders a header element', () => {
    render(<Header />)
    expect(screen.getByRole('banner')).toBeInTheDocument()
  })

  it('renders a nav element', () => {
    render(<Header />)
    expect(screen.getByRole('navigation')).toBeInTheDocument()
  })
})
