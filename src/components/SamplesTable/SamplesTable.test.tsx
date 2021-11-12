import React from 'react'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { SamplesTable } from './SamplesTable'
import { mockSamples } from 'mocks/samples'
import { MemoryRouter } from 'react-router-dom'
import { UserContext } from 'services/userContext'
import axios from 'axios'

jest.mock('axios')
const mockedAxios = axios as jest.Mocked<typeof axios>
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useLocation: () => ({
    pathname: 'https://statina.scilifelab.se/samples',
  }),
}))

describe('Samples Table', () => {
  test('Samples Table should display UI correctly', async () => {
    mockedAxios.get.mockReturnValueOnce(Promise.resolve({ data: mockSamples }))    
    const initializeUserContext = () => null
    const logout = () => null
    const { getAllByText } = await waitFor(() =>
      render(
        <UserContext.Provider
          value={{
            initializeUserContext,
            logout,
            token: 'token',
            username: 'elevu',
            email: 'testemail',
            permissions: ['R'],
          }}
        >
          <MemoryRouter>
            <SamplesTable />
          </MemoryRouter>
        </UserContext.Provider>
      )
    )
    /* const sample_id = await waitFor(() => getAllByText(mockSamples[0].sample_id))
    await waitFor(() => expect(sample_id).toBeVisible())
    const comment = await waitFor(() => getAllByText(mockSamples[0].comment))
    await waitFor(() => expect(comment).toBeVisible()) */
  })
  /* test('Search samples should work', async () => {
    const { queryByText } = render(
      <MemoryRouter>
        <SamplesTable></SamplesTable>
      </MemoryRouter>
    )
    await waitFor(() => expect(queryByText(mockSamples[0].sample_id)).toBeInTheDocument())
    const inputElement = screen.getByPlaceholderText('Search Samples') as HTMLInputElement
    const buttonElement = screen.getByRole('button', {
      name: /Search/i,
    })
    fireEvent.change(inputElement, { target: { value: mockSamples[0].sample_id } })
    expect(inputElement.value).toBe(mockSamples[0].sample_id)
    fireEvent.click(buttonElement)
    expect(screen.getByText(mockSamples[0].sample_id)).toBeVisible()
  }) */
})
