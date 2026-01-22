import React from 'react'
import { fireEvent, render, waitFor } from '@testing-library/react'
import { BatchesTable } from './BatchesTable'
import { mockBatches } from 'mocks/batches'
import { MemoryRouter } from 'react-router-dom'
import { UserContext } from 'services/userContext'
import axios from 'axios'
import type { Mocked } from 'vitest'

vi.mock('axios')
const mockedAxios = axios as Mocked<typeof axios>
vi.mock('react-router-dom', async () => ({
  ...(await vi.importActual<typeof import('react-router-dom')>('react-router-dom')),
  useLocation: () => ({
    pathname: 'https://statina.scilifelab.se/batches',
  }),
}))

describe('Batches Table', () => {
  test('Batches Table should display UI correctly', async () => {
    mockedAxios.get.mockReturnValueOnce(
      Promise.resolve({
        data: {
          documents: mockBatches,
          document_count: mockBatches.length,
        },
      })
    )
    const initializeUserContext = () => null
    const logout = () => null
    const { getByText } = await waitFor(() =>
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
          <MemoryRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
            <BatchesTable />
          </MemoryRouter>
        </UserContext.Provider>
      )
    )
    const batch_id = await waitFor(() => getByText(mockBatches[0].batch_id))
    await waitFor(() => expect(batch_id).toBeVisible())
  })
  test('Delete Batch button should not render for read user', async () => {
    mockedAxios.get.mockReturnValueOnce(
      Promise.resolve({
        data: {
          documents: mockBatches,
          document_count: mockBatches.length,
        },
      })
    )
    const initializeUserContext = () => null
    const logout = () => null
    const { queryAllByText } = await waitFor(() =>
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
          <MemoryRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
            <BatchesTable />
          </MemoryRouter>
        </UserContext.Provider>
      )
    )
    const deleteBtn = await waitFor(() => queryAllByText(/Delete Batch/i))
    await waitFor(() => expect(deleteBtn).toEqual([]))
  })
  test('Read write user can delete batch', async () => {
    mockedAxios.get.mockReturnValueOnce(
      Promise.resolve({
        data: {
          documents: mockBatches,
          document_count: mockBatches.length,
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
          <MemoryRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
            <BatchesTable />
          </MemoryRouter>
        </UserContext.Provider>
      )
    )
    const deleteCol = await waitFor(() => getByText(/Delete Batch/i))
    await waitFor(() => expect(deleteCol).toBeVisible())
    const deleteBtn = await waitFor(() => queryAllByLabelText('delete'))
    await waitFor(() => expect(deleteBtn).toHaveLength(mockBatches.length))
    const deletBatch = await waitFor(() => deleteBtn[0])
    fireEvent.click(deletBatch)
    const confirmation = await waitFor(() =>
      getByText(/Are you sure you want to delete this batch?/i)
    )
    await waitFor(() => expect(confirmation).toBeInTheDocument())
  })
})
