import React from 'react'
import { render, waitFor } from '@testing-library/react'
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
    pathname: 'https://statina.scilifelab.se/batches',
  }),
}))

describe('Batches Table', () => {
  test('Batches Table should display UI correctly', async () => {
    mockedAxios.get.mockReturnValueOnce(
      Promise.resolve({
        data: {
          documents: mockSamples[0].documents,
          document_count: mockSamples[0].document_count,
        },
      })
    )
    const initializeUserContext = () => null
    const logout = () => null
    const { getByText, queryByText } = await waitFor(() =>
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
    expect(mockedAxios.get).toHaveBeenCalledTimes(1)
    const sample_id = await waitFor(() => getByText(mockSamples[0].documents[0].sample_id))
    await waitFor(() => expect(sample_id).toBeVisible())
    const batch_id = await waitFor(() => queryByText(/Batch ID/i))
    await waitFor(() => expect(batch_id).toBeVisible())
  })
  test('Batch ID column should not render in the batch samples page', async () => {
    mockedAxios.get.mockReturnValueOnce(
      Promise.resolve({
        data: {
          documents: mockSamples[0].documents,
          document_count: mockSamples[0].document_count,
        },
      })
    )
    const initializeUserContext = () => null
    const logout = () => null
    const { queryByText, getByText } = await waitFor(() =>
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
            <SamplesTable batchId={'batch_id'} />
          </MemoryRouter>
        </UserContext.Provider>
      )
    )
    expect(mockedAxios.get).toHaveBeenCalledTimes(1)
    const batch_id = await waitFor(() => queryByText(/Batch ID/i))
    await waitFor(() => expect(batch_id).toBeNull())
    const sample_id = await waitFor(() => getByText(mockSamples[0].documents[1].sample_id))
    await waitFor(() => expect(sample_id).toBeVisible())
  })
})
