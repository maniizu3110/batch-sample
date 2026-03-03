import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import ContactPage from '../page'

vi.mock('next/link', () => ({
  default: ({ children, href, ...props }: any) => <a href={href} {...props}>{children}</a>,
}))

vi.mock('next/navigation', () => ({
  usePathname: () => '/',
  useRouter: () => ({ push: vi.fn(), back: vi.fn() }),
}))

describe('ContactPage', () => {
  it('renders the page heading', () => {
    render(<ContactPage />)
    expect(screen.getByText('Contact Us')).toBeInTheDocument()
  })

  it('renders the ContactForm section', () => {
    render(<ContactPage />)
    expect(screen.getByText('Send us a message')).toBeInTheDocument()
  })

  it('renders the contact form with input fields', () => {
    render(<ContactPage />)
    expect(screen.getByPlaceholderText('Your name')).toBeInTheDocument()
    expect(screen.getByPlaceholderText('your@email.com')).toBeInTheDocument()
    expect(screen.getByPlaceholderText('Subject')).toBeInTheDocument()
    expect(screen.getByPlaceholderText('Your message...')).toBeInTheDocument()
  })

  it('renders the Send Message button', () => {
    render(<ContactPage />)
    expect(screen.getByText('Send Message')).toBeInTheDocument()
  })

  it('renders contact info cards', () => {
    render(<ContactPage />)
    // "Email" appears both as a card title and as the form input label, so use getAllByText
    const emailElements = screen.getAllByText('Email')
    expect(emailElements.length).toBeGreaterThanOrEqual(2)
    expect(screen.getByText('example@batch-sample.dev')).toBeInTheDocument()
    expect(screen.getByText('Office')).toBeInTheDocument()
    expect(screen.getByText('Tokyo, Japan')).toBeInTheDocument()
    expect(screen.getByText('Social')).toBeInTheDocument()
  })

  it('renders social media links', () => {
    render(<ContactPage />)
    expect(screen.getByText('Twitter')).toBeInTheDocument()
    expect(screen.getByText('GitHub')).toBeInTheDocument()
    expect(screen.getByText('LinkedIn')).toBeInTheDocument()
  })
})
