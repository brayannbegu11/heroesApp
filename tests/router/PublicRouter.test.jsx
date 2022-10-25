import { render, screen } from '@testing-library/react'
import { MemoryRouter, Route, Routes } from 'react-router-dom'
import { AuthContext } from '../../src/auth/context/AuthContext'
import { PublicRouter } from '../../src/router/PublicRouter'

describe('Pruebas en <PublicRouter />', () => {
  test('should show children if unlogged', () => {
    const contextValue = {
      logged: false,
    }
    render(
      <AuthContext.Provider value={contextValue}>
        <PublicRouter>
          <h1>Ruta pública</h1>
        </PublicRouter>
      </AuthContext.Provider>
    )
    expect(screen.getByText('Ruta pública')).toBeTruthy()
  })
  test('should navegate if is authenticated', () => {
    const contextValue = {
      logged: true,
      user: {
        name: 'Brayann',
        id: '123',
      },
    }
    render(
      <AuthContext.Provider value={contextValue}>
        <MemoryRouter initialEntries={['/login']}>
          <Routes>
            <Route
              path="login"
              element={
                <PublicRouter>
                  <h1>Ruta pública</h1>
                </PublicRouter>
              }
            />
            <Route path="marvel" element={<h1>Página Marvel</h1>} />
          </Routes>
        </MemoryRouter>
      </AuthContext.Provider>
    )
    screen.debug()
    expect(screen.getByText('Página Marvel')).toBeTruthy()
  })
})
