import React from 'react'
import { render, waitFor } from '@testing-library/react'
import { BatchesTable } from './BatchesTable'
import { mockBatches } from 'mocks/batches'
import { MemoryRouter } from 'react-router-dom'
import { UserContext } from 'services/userContext'
import axios from 'axios'

jest.mock('axios')
const mockedAxios = axios as jest.Mocked<typeof axios>
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useLocation: () => ({
    pathname: 'https://statina.scilifelab.se/batches',
  }),
}))

describe('Batches Table', () => {
  test('Batches Table should display UI correctly', async () => {
    mockedAxios.get.mockReturnValueOnce(Promise.resolve({ data: mockBatches }))
    /* mockedAxios.get.mockReturnValueOnce(Promise.reject('Something went wrong')) */
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
            <BatchesTable />
          </MemoryRouter>
        </UserContext.Provider>
      )
    )
    expect(mockedAxios.get).toHaveBeenCalledTimes(1)
    const batch_id = await waitFor(() => getAllByText(mockBatches[0].batch_id))
    await waitFor(() => expect(batch_id).toBeVisible())
    /* const errorMessage = await waitFor(() => getAllByText(/Something went wrong/i))
    await waitFor(() => expect(errorMessage).toHaveLength(1)) */
    /* const batch_id = await waitFor(() => getAllByText(mockBatches[0].batch_id))
    await waitFor(() => expect(batch_id).toBeVisible())
    const comment = await waitFor(() => getAllByText(mockBatches[0].comment))
    await waitFor(() => expect(comment).toBeVisible()) */
  })
  /* test('Search batches should work', async () => {
    const { queryByText } = render(
      <MemoryRouter>
        <BatchesTable></BatchesTable>
      </MemoryRouter>
    )
    await waitFor(() => expect(queryByText(mockBatches[0].batch_id)).toBeInTheDocument())
    const inputElement = screen.getByPlaceholderText('Search Batches') as HTMLInputElement
    const buttonElement = screen.getByRole('button', {
      name: /Search/i,
    })
    fireEvent.change(inputElement, { target: { value: mockBatches[0].batch_id } })
    expect(inputElement.value).toBe(mockBatches[0].batch_id)
    fireEvent.click(buttonElement)
    expect(screen.getByText(mockBatches[0].batch_id)).toBeVisible()
  }) */
})
