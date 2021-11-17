import React from 'react'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { BatchSamplesTable } from './BatchSamplesTable'
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
            <BatchSamplesTable batchId={mockSamples[0].batch_id} />
          </MemoryRouter>
        </UserContext.Provider>
      )
    )
  })
})
