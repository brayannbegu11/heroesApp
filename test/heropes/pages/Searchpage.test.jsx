import { fireEvent, render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import SearchPage from '../../../src/heroes/pages/SearchPage'

const mockedUseNavigate = jest.fn()
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockedUseNavigate,
}))

describe('Pruebas en <SearchPage />', () => {
  //   test('should show correctly with default values', () => {
  //     const { container } = render(
  //       <MemoryRouter>
  //         <SearchPage />
  //       </MemoryRouter>
  //     )
  //     // screen.debug()
  //     // expect(container).toMatchSnapshot()
  //   })
  test('should show Batman and the input with the queryString value', () => {
    const hero = 'batman'
    render(
      <MemoryRouter initialEntries={[`/search?q=${hero}`]}>
        <SearchPage />
      </MemoryRouter>
    )
    // screen.debug()
    const input = screen.getByRole('textbox')
    expect(input.value).toBe(hero)
    const img = screen.getByRole('img')
    expect(img.src).toContain('/assets/heroes/dc-batman.jpg')
  })

  test('should show an error if not found the hero', () => {
    const hero = 'batman123'
    render(
      <MemoryRouter initialEntries={[`/search?q=${hero}`]}>
        <SearchPage />
      </MemoryRouter>
    )
    // screen.debug()
    const input = screen.getByRole('textbox')
    expect(input.value).toBe(hero)
    const searchDiv = screen.getByLabelText('not-found')
    expect(searchDiv).toBeTruthy()
  })
  test('should call the navigate to the new screen', () => {
    const hero = 'batman123'
    render(
      <MemoryRouter initialEntries={['/search']}>
        <SearchPage />
      </MemoryRouter>
    )
    const input = screen.getByRole('textbox')
    fireEvent.change(input, { target: { name: 'searchText', value: hero } })

    const form = screen.getByRole('form')
    fireEvent.submit(form)
    // screen.debug()
    expect(mockedUseNavigate).toHaveBeenCalledWith(`?q=${hero}`)
  })
})
