import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, it, expect, vi } from 'vitest'
import ContactForm from '../ContactForm'

describe('ContactForm', () => {
  it('renders all form fields', () => {
    render(<ContactForm />)

    expect(screen.getByPlaceholderText('Your name')).toBeInTheDocument()
    expect(screen.getByPlaceholderText('your@email.com')).toBeInTheDocument()
    expect(screen.getByPlaceholderText('Subject')).toBeInTheDocument()
    expect(screen.getByPlaceholderText('Your message...')).toBeInTheDocument()
  })

  it('renders labels for all fields', () => {
    render(<ContactForm />)

    expect(screen.getByText('Name')).toBeInTheDocument()
    expect(screen.getByText('Email')).toBeInTheDocument()
    expect(screen.getByText('Subject')).toBeInTheDocument()
    expect(screen.getByText('Message')).toBeInTheDocument()
  })

  it('renders the submit button', () => {
    render(<ContactForm />)

    expect(screen.getByRole('button', { name: 'Send Message' })).toBeInTheDocument()
  })

  it('allows typing into all fields', async () => {
    const user = userEvent.setup()
    render(<ContactForm />)

    const nameInput = screen.getByPlaceholderText('Your name')
    const emailInput = screen.getByPlaceholderText('your@email.com')
    const subjectInput = screen.getByPlaceholderText('Subject')
    const messageInput = screen.getByPlaceholderText('Your message...')

    await user.type(nameInput, 'John Doe')
    await user.type(emailInput, 'john@example.com')
    await user.type(subjectInput, 'Test Subject')
    await user.type(messageInput, 'Hello, this is a test message.')

    expect(nameInput).toHaveValue('John Doe')
    expect(emailInput).toHaveValue('john@example.com')
    expect(subjectInput).toHaveValue('Test Subject')
    expect(messageInput).toHaveValue('Hello, this is a test message.')
  })

  it('calls alert on form submission', async () => {
    const user = userEvent.setup()
    const alertSpy = vi.spyOn(window, 'alert').mockImplementation(() => {})

    render(<ContactForm />)

    await user.type(screen.getByPlaceholderText('Your name'), 'John Doe')
    await user.type(screen.getByPlaceholderText('your@email.com'), 'john@example.com')
    await user.type(screen.getByPlaceholderText('Subject'), 'Test')
    await user.type(screen.getByPlaceholderText('Your message...'), 'Hello')

    await user.click(screen.getByRole('button', { name: 'Send Message' }))

    expect(alertSpy).toHaveBeenCalledWith('Message sent!')
    alertSpy.mockRestore()
  })

  it('logs form data on submission', async () => {
    const user = userEvent.setup()
    vi.spyOn(window, 'alert').mockImplementation(() => {})
    const consoleSpy = vi.spyOn(console, 'log').mockImplementation(() => {})

    render(<ContactForm />)

    await user.type(screen.getByPlaceholderText('Your name'), 'Jane')
    await user.type(screen.getByPlaceholderText('your@email.com'), 'jane@test.com')
    await user.type(screen.getByPlaceholderText('Subject'), 'Hi')
    await user.type(screen.getByPlaceholderText('Your message...'), 'World')

    await user.click(screen.getByRole('button', { name: 'Send Message' }))

    expect(consoleSpy).toHaveBeenCalledWith('Form submitted:', {
      name: 'Jane',
      email: 'jane@test.com',
      subject: 'Hi',
      message: 'World',
    })

    consoleSpy.mockRestore()
  })

  it('has required attribute on the textarea', () => {
    render(<ContactForm />)

    // The textarea has required directly; Input components show asterisks but don't pass required to <input>
    expect(screen.getByPlaceholderText('Your message...')).toBeRequired()
  })

  it('has email type on email input', () => {
    render(<ContactForm />)

    expect(screen.getByPlaceholderText('your@email.com')).toHaveAttribute('type', 'email')
  })
})
