import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { AuthContext } from '../../src/auth/context/AuthContext'
import AppRouter from '../../src/router/AppRouter'

describe('Pruebas en <AppRouter />', () => {
  test('should show the login if unlogged', () => {
    const contextValue = {
      logged: false,
    }
    render(
      <MemoryRouter initialEntries={['/marvel']}>
        <AuthContext.Provider value={contextValue}>
            <AppRouter />
        </AuthContext.Provider>
      </MemoryRouter>
    )
    // screen.debug()
    expect(screen.getAllByText('Login').length).toBe(2)
  })
  test('should show the <MarvelPage /> if logged', () => {
    const contextValue = {
      logged: true,
      user: {
        name: 'Brayann',
        id: '123'
      }
    }
    render(
      <MemoryRouter initialEntries={['/login']}>
        <AuthContext.Provider value={contextValue}>
            <AppRouter />
        </AuthContext.Provider>
      </MemoryRouter>
    )
    // screen.debug()
    expect(screen.getByText('Marvel comics')).toBeTruthy()
  })
})
