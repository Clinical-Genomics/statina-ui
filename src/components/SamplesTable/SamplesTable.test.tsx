import React from 'react'
import { fireEvent, render, waitFor } from '@testing-library/react'
import { SamplesTable } from './SamplesTable'
import { mockSamples } from 'mocks/samples'
import { MemoryRouter } from 'react-router-dom'
import { UserContext } from 'services/userContext'
import axios from 'axios'
import { REACT_APP_BACKEND_URL } from '../../services/StatinaApi'
import type { Mocked } from 'vitest'

const initializeUserContext = () => null
const logout = () => null

vi.mock('axios')
const mockedAxios = axios as Mocked<typeof axios>
vi.mock('react-router-dom', async () => ({
  ...(await vi.importActual<typeof import('react-router-dom')>('react-router-dom')),
  useLocation: () => ({
    pathname: 'https://statina.scilifelab.se/batches',
  }),
}))

describe('Samples Table', () => {
  test('Samples Table should display UI correctly', async () => {
    mockedAxios.get.mockReturnValueOnce(
      Promise.resolve({
        data: {
          documents: mockSamples,
          document_count: mockSamples.length,
        },
      })
    )
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
            <SamplesTable />
          </MemoryRouter>
        </UserContext.Provider>
      )
    )
    const sample_id = await waitFor(() => getByText(mockSamples[0].sample_id))
    await waitFor(() => expect(sample_id).toBeVisible())
    const batch_id = await waitFor(() => queryAllByText(mockSamples[0].batch_id))
    await waitFor(() => expect(batch_id[1]).toBeVisible())
  })
  test('Batch ID column should not render in the batch samples page', async () => {
    mockedAxios.get.mockReturnValueOnce(
      Promise.resolve({
        data: {
          documents: mockSamples,
          document_count: mockSamples.length,
        },
      })
    )
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
    const batch_id = await waitFor(() => queryByText(/Batch ID/i))
    await waitFor(() => expect(batch_id).toBeNull())
    const sample_id = await waitFor(() => getByText(mockSamples[0].sample_id))
    await waitFor(() => expect(sample_id).toBeVisible())
  })
})

test('Call to backend has correct query parameters on sort', async () => {
  mockedAxios.get.mockReturnValue(
    Promise.resolve({
      data: {
        documents: mockSamples,
        document_count: mockSamples.length,
      },
    })
  )
  const batch = 'NGh678'
  const { getAllByText } = await waitFor(() =>
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
          <SamplesTable batchId={batch} />
        </MemoryRouter>
      </UserContext.Provider>
    )
  )
  await waitFor(() => fireEvent.click(getAllByText(/Sample/i)[0]))
  expect(axios.get).toHaveBeenLastCalledWith(
    `${REACT_APP_BACKEND_URL}/samples?&page_size=100&page_num=0&batch_id=${batch}&query_string=&sort_key=sample_id&sort_direction=ascend`,
    expect.any(Object)
  )
})
