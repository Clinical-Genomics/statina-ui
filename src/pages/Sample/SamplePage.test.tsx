import React from 'react'
import { render, waitFor } from '@testing-library/react'
import { SamplePage } from '../Sample/SamplePage'
import axios from 'axios'
import { mockSample, mockSamplePlot } from '../../mocks/sample'
import { BrowserRouter } from 'react-router-dom'
import { UserContext } from 'services/userContext'

jest.mock('axios')
const mockedAxios = axios as jest.Mocked<typeof axios>
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useLocation: () => ({
    pathname: 'https://statina.scilifelab.se/samples/2018-21237-04',
  }),
}))

describe('Sample Page', () => {
  test('Sample Page component should display UI correctly', async () => {
    mockedAxios.get.mockReturnValueOnce(Promise.resolve({ data: mockSample }))
    mockedAxios.get.mockReturnValueOnce(Promise.resolve({ data: mockSamplePlot }))
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
          <BrowserRouter>
            <SamplePage />
          </BrowserRouter>
        </UserContext.Provider>
      )
    )
    const sampleId = await waitFor(() => getAllByText(/2117030_NIPT/i))
    await waitFor(() => expect(sampleId).toHaveLength(1))
  })

  test('Error from backend should display error', async () => {
    mockedAxios.get.mockReturnValueOnce(Promise.reject('Something went wrong'))
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
          <BrowserRouter>
            <SamplePage />
          </BrowserRouter>
        </UserContext.Provider>
      )
    )
    const errorMessage = await waitFor(() => getAllByText(/Something went wrong/i))
    await waitFor(() => expect(errorMessage).toHaveLength(1))
  })
})
