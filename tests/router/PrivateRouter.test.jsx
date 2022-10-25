import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { AuthContext } from '../../src/auth/context/AuthContext'
import { PrivateRouter } from '../../src/router/PrivateRouter'

describe('Pruebas en <PrivateRouter />', () => {
  test('should show children if logged', () => {

    Storage.prototype.setItem = jest.fn()

    const contextValue = {
      logged: true,
      user: {
        name: 'Brayann',
        id: '123',
      },
    }
    render(
      <AuthContext.Provider value={contextValue}>
        <MemoryRouter initialEntries={['/marvel']}>
          <PrivateRouter>
            <h1>Ruta privada</h1>
          </PrivateRouter>
        </MemoryRouter>
      </AuthContext.Provider>
    )
    expect(screen.getByText('Ruta privada')).toBeTruthy()
    expect(localStorage.setItem).toHaveBeenCalledWith("lastPath", "/marvel")
  })
})
