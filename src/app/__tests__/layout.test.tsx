import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import RootLayout from '../layout'

vi.mock('next/font/google', () => ({
  Geist: () => ({ className: 'geist-mock', variable: '--font-geist-sans' }),
  Geist_Mono: () => ({ className: 'geist-mono-mock', variable: '--font-geist-mono' }),
}))

vi.mock('next/link', () => ({
  default: ({ children, href, ...props }: any) => <a href={href} {...props}>{children}</a>,
}))

vi.mock('next/navigation', () => ({
  usePathname: () => '/',
  useRouter: () => ({ push: vi.fn(), back: vi.fn() }),
}))

describe('RootLayout', () => {
  it('renders children content', () => {
    render(
      <RootLayout>
        <div>Test Child Content</div>
      </RootLayout>
    )
    expect(screen.getByText('Test Child Content')).toBeInTheDocument()
  })

  it('renders the Header with BatchSample branding', () => {
    render(
      <RootLayout>
        <div>Child</div>
      </RootLayout>
    )
    const batchSampleElements = screen.getAllByText('BatchSample')
    expect(batchSampleElements.length).toBeGreaterThanOrEqual(1)
    // Header has it as a link
    const headerLink = batchSampleElements.find((el) => el.tagName === 'A')
    expect(headerLink).toBeTruthy()
  })

  it('renders the Header navigation links', () => {
    render(
      <RootLayout>
        <div>Child</div>
      </RootLayout>
    )
    expect(screen.getByText('Home')).toBeInTheDocument()
    // About, Blog, and Contact appear in both Header and Footer
    expect(screen.getAllByText('About').length).toBeGreaterThanOrEqual(1)
    expect(screen.getAllByText('Blog').length).toBeGreaterThanOrEqual(1)
    expect(screen.getByText('Dashboard')).toBeInTheDocument()
    expect(screen.getAllByText('Contact').length).toBeGreaterThanOrEqual(1)
    expect(screen.getByText('Settings')).toBeInTheDocument()
  })

  it('renders the Footer', () => {
    render(
      <RootLayout>
        <div>Child</div>
      </RootLayout>
    )
    expect(screen.getByText(/2026 BatchSample/)).toBeInTheDocument()
  })

  it('wraps children in a main element', () => {
    render(
      <RootLayout>
        <div data-testid="child">Child Content</div>
      </RootLayout>
    )
    const child = screen.getByTestId('child')
    expect(child.closest('main')).toBeTruthy()
  })
})
