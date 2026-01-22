import React from 'react'
import { render, waitFor } from '@testing-library/react'
import { SamplePage } from '../Sample/SamplePage'
import axios from 'axios'
import { mockSample, mockSamplePlot } from '../../mocks/sample'
import { BrowserRouter } from 'react-router-dom'
import { UserContext } from 'services/userContext'
import type { Mocked } from 'vitest'

vi.mock('axios')
const mockedAxios = axios as Mocked<typeof axios>
vi.mock('react-router-dom', async () => ({
  ...(await vi.importActual<typeof import('react-router-dom')>('react-router-dom')),
  useLocation: () => ({
    pathname: 'https://statina.scilifelab.se/samples/2018-21237-04',
  }),
}))

const initializeUserContext = () => null
const logout = () => null

describe('Sample Page', () => {
  test('Sample Page component should display UI correctly', async () => {
    mockedAxios.get.mockReturnValueOnce(Promise.resolve({ data: mockSample }))
    mockedAxios.get.mockReturnValueOnce(Promise.resolve({ data: mockSamplePlot }))
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
          <BrowserRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
            <SamplePage />
          </BrowserRouter>
        </UserContext.Provider>
      )
    )
    const sampleId = await waitFor(() => getAllByText(/2117030_NIPT/i))
    await waitFor(() => expect(sampleId).toHaveLength(1))
  })

  test('Read/write user should see edit comment icon', async () => {
    mockedAxios.get.mockReturnValueOnce(Promise.resolve({ data: mockSample }))
    mockedAxios.get.mockReturnValueOnce(Promise.resolve({ data: mockSamplePlot }))
    const { getByTestId } = await waitFor(() =>
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
          <BrowserRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
            <SamplePage />
          </BrowserRouter>
        </UserContext.Provider>
      )
    )

    const buttonElement = await waitFor(() => getByTestId('edit-comment'))
    await waitFor(() => expect(buttonElement).toBeVisible())
  })

  test('Read/write user should see status selector', async () => {
    mockedAxios.get.mockReturnValueOnce(Promise.resolve({ data: mockSample }))
    mockedAxios.get.mockReturnValueOnce(Promise.resolve({ data: mockSamplePlot }))
    const { getAllByTestId } = await waitFor(() =>
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
          <BrowserRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
            <SamplePage />
          </BrowserRouter>
        </UserContext.Provider>
      )
    )
    const buttonElement = await waitFor(() => getAllByTestId('status-selector'))
    await waitFor(() => expect(buttonElement).toHaveLength(7))
  })

  test('Read only user should not see edit comment icon', async () => {
    mockedAxios.get.mockReturnValueOnce(Promise.resolve({ data: mockSample }))
    mockedAxios.get.mockReturnValueOnce(Promise.resolve({ data: mockSamplePlot }))
    const { queryByTestId } = await waitFor(() =>
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
          <BrowserRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
            <SamplePage />
          </BrowserRouter>
        </UserContext.Provider>
      )
    )

    const buttonElement = await waitFor(() => queryByTestId('edit-comment'))
    await waitFor(() => expect(buttonElement).toBeNull())
  })

  test('Read only user should not see status selector', async () => {
    mockedAxios.get.mockReturnValueOnce(Promise.resolve({ data: mockSample }))
    mockedAxios.get.mockReturnValueOnce(Promise.resolve({ data: mockSamplePlot }))
    const { queryByTestId } = await waitFor(() =>
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
          <BrowserRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
            <SamplePage />
          </BrowserRouter>
        </UserContext.Provider>
      )
    )
    const buttonElement = await waitFor(() => queryByTestId('status-selector'))
    await waitFor(() => expect(buttonElement).toBeNull())
  })

  test('Error from backend should display error', async () => {
    mockedAxios.get.mockReturnValueOnce(Promise.reject('Something went wrong'))
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
          <BrowserRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
            <SamplePage />
          </BrowserRouter>
        </UserContext.Provider>
      )
    )
    const errorMessage = await waitFor(() => getAllByText(/Something went wrong/i))
    await waitFor(() => expect(errorMessage).toHaveLength(1))
  })
})
