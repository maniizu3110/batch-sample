import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import SettingsPage from '../page'

vi.mock('next/link', () => ({
  default: ({ children, href, ...props }: any) => <a href={href} {...props}>{children}</a>,
}))

vi.mock('next/navigation', () => ({
  usePathname: () => '/',
  useRouter: () => ({ push: vi.fn(), back: vi.fn() }),
}))

describe('SettingsPage', () => {
  it('renders the page heading', () => {
    render(<SettingsPage />)
    expect(screen.getByText('Settings')).toBeInTheDocument()
  })

  it('renders Profile Settings card with inputs', () => {
    render(<SettingsPage />)
    expect(screen.getByText('Profile Settings')).toBeInTheDocument()
    expect(screen.getByDisplayValue('John Doe')).toBeInTheDocument()
    expect(screen.getByDisplayValue('john@example.com')).toBeInTheDocument()
  })

  it('renders Preferences card with toggle labels', () => {
    render(<SettingsPage />)
    expect(screen.getByText('Preferences')).toBeInTheDocument()
    expect(screen.getByText('Email Notifications')).toBeInTheDocument()
    expect(screen.getByText('Dark Mode')).toBeInTheDocument()
  })

  it('renders Danger Zone card', () => {
    render(<SettingsPage />)
    expect(screen.getByText('Danger Zone')).toBeInTheDocument()
    expect(screen.getByText('Delete Account')).toBeInTheDocument()
  })

  it('renders Save and Cancel buttons', () => {
    render(<SettingsPage />)
    expect(screen.getByText('Save Changes')).toBeInTheDocument()
    expect(screen.getByText('Cancel')).toBeInTheDocument()
  })

  it('toggles notifications off when clicked', async () => {
    const user = userEvent.setup()
    render(<SettingsPage />)

    // Notifications toggle is the first toggle button (initially on = bg-blue-600)
    const toggleButtons = screen.getAllByRole('button').filter(
      (btn) => btn.className.includes('rounded-full')
    )
    const notificationsToggle = toggleButtons[0]

    // Initially notifications is true -> bg-blue-600
    expect(notificationsToggle.className).toContain('bg-blue-600')

    // Click to toggle off
    await user.click(notificationsToggle)

    // After clicking, notifications is false -> bg-gray-200
    expect(notificationsToggle.className).toContain('bg-gray-200')
  })

  it('toggles dark mode on when clicked', async () => {
    const user = userEvent.setup()
    render(<SettingsPage />)

    const toggleButtons = screen.getAllByRole('button').filter(
      (btn) => btn.className.includes('rounded-full')
    )
    const darkModeToggle = toggleButtons[1]

    // Initially darkMode is false -> bg-gray-200
    expect(darkModeToggle.className).toContain('bg-gray-200')

    // Click to toggle on
    await user.click(darkModeToggle)

    // After clicking, darkMode is true -> bg-blue-600
    expect(darkModeToggle.className).toContain('bg-blue-600')
  })

  it('toggles dark mode on and off again', async () => {
    const user = userEvent.setup()
    render(<SettingsPage />)

    const toggleButtons = screen.getAllByRole('button').filter(
      (btn) => btn.className.includes('rounded-full')
    )
    const darkModeToggle = toggleButtons[1]

    expect(darkModeToggle.className).toContain('bg-gray-200')

    await user.click(darkModeToggle)
    expect(darkModeToggle.className).toContain('bg-blue-600')

    await user.click(darkModeToggle)
    expect(darkModeToggle.className).toContain('bg-gray-200')
  })

  it('updates display name input', async () => {
    const user = userEvent.setup()
    render(<SettingsPage />)

    const displayNameInput = screen.getByDisplayValue('John Doe')
    await user.clear(displayNameInput)
    await user.type(displayNameInput, 'Jane Smith')

    expect(screen.getByDisplayValue('Jane Smith')).toBeInTheDocument()
  })
})
