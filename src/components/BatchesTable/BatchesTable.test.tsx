import React from 'react'
import { fireEvent, render, waitFor } from '@testing-library/react'
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
    mockedAxios.get.mockReturnValueOnce(
      Promise.resolve({
        data: {
          documents: mockBatches[0].documents,
          document_count: mockBatches[0].document_count,
        },
      })
    )
    const initializeUserContext = () => null
    const logout = () => null
    const { getByText, queryAllByText } = await waitFor(() =>
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
    const batch_id = await waitFor(() => getByText(/2116014_NIPT/i))
    await waitFor(() => expect(batch_id).toBeVisible())
    const deleteBtn = await waitFor(() => queryAllByText(/Delete Batch/i))
    await waitFor(() => expect(deleteBtn).toEqual([]))
  })
  test('Read write user can delete batch', async () => {
    mockedAxios.get.mockReturnValueOnce(
      Promise.resolve({
        data: {
          documents: mockBatches[0].documents,
          document_count: mockBatches[0].document_count,
        },
      })
    )
    const initializeUserContext = () => null
    const logout = () => null
    const { getByText, queryAllByLabelText } = await waitFor(() =>
      render(
        <UserContext.Provider
          value={{
            initializeUserContext,
            logout,
            token: 'token',
            username: 'elevu',
            email: 'testemail',
            permissions: ['RW'],
          }}
        >
          <MemoryRouter>
            <BatchesTable />
          </MemoryRouter>
        </UserContext.Provider>
      )
    )
    const deleteCol = await waitFor(() => getByText(/Delete Batch/i))
    await waitFor(() => expect(deleteCol).toBeVisible())
    const deleteBtn = await waitFor(() => queryAllByLabelText('delete'))
    await waitFor(() => expect(deleteBtn).toHaveLength(mockBatches[0].document_count))
    const deletBatch = await waitFor(() => deleteBtn[0])
    fireEvent.click(deletBatch)
    const confirmation = await waitFor(() =>
      getByText(/Are you sure you want to delete this batch?/i)
    )
    await waitFor(() => expect(confirmation).toBeInTheDocument())
  })
})
