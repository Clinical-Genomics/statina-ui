import React from 'react'
import { render } from '@testing-library/react'
import { UsersTable } from './UsersTable'
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
    mockedAxios.get.mockReturnValue(Promise.resolve({ data: mockBatches }))
    const initializeUserContext = () => null
    const logout = () => null
    const { getAllByText } = render(
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
          <UsersTable />
        </MemoryRouter>
      </UserContext.Provider>
    )
    console.log(getAllByText)
    /* const batchID = await waitFor(() => getAllByText(mockBatches[0].batch_id))
    await waitFor(() => expect(batchID).toBeVisible())
    const date = await waitFor(() => getAllByText(mockBatches[0].sequencing_date))
    await waitFor(() => expect(date).toBeVisible())
    const flowcell = await waitFor(() => getAllByText(mockBatches[0].segmental_calls))
    await waitFor(() => expect(flowcell).toBeVisible()) */
  })
  /* test('Search batches should work', () => {
    const { queryByText } = render(
      <MemoryRouter>
        <UsersTable></UsersTable>
      </MemoryRouter>
    )
    expect(queryByText(mockBatches[1].batch_id)).toBeVisible()
    const inputElement = screen.getByPlaceholderText('Search Batches') as HTMLInputElement
    const buttonElement = screen.getByRole('button', {
      name: /Search/i,
    })
    fireEvent.change(inputElement, { target: { value: mockBatches[0].batch_id } })
    expect(inputElement.value).toBe(mockBatches[0].batch_id)
    fireEvent.click(buttonElement)
    expect(screen.getByText(mockBatches[0].flowcell)).toBeInTheDocument()
  }) */
})
