import { fireEvent, render, screen } from '@testing-library/react'
import { MemoryRouter, useNavigate } from 'react-router-dom'
import { AuthContext } from '../../../src/auth/context/AuthContext'
import { Navbar } from '../../../src/ui/components/Navbar'

const mockedUseNavigate = jest.fn()
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockedUseNavigate,
}))

describe('Pruebas en <NavBar />', () => {
  test('should show the name of the user logged', () => {
    const contextValue = {
      logged: true,
      user: {
        name: 'Brayann',
        id: '123',
      },
    }
    render(
      <AuthContext.Provider value={contextValue}>
        <MemoryRouter>
          <Navbar />
        </MemoryRouter>
      </AuthContext.Provider>
    )
    // screen.debug()
    expect(screen.getByText(contextValue.user.name)).toBeTruthy()
  })
  test('should call the logout and navigate on click in the button', () => {
    const contextValue = {
      logged: true,
      user: {
        name: 'Brayann',
        id: '123',
      },
      logout: jest.fn(),
    }
    render(
      <AuthContext.Provider value={contextValue}>
        <MemoryRouter>
          <Navbar />
        </MemoryRouter>
      </AuthContext.Provider>
    )
    const button = screen.getByRole('button')
    fireEvent.click(button)
    expect(contextValue.logout).toHaveBeenCalled()
    expect(mockedUseNavigate).toHaveBeenCalledWith("/login", {"replace": true})
  })
})
