import React from 'react'
import { render, waitFor } from '@testing-library/react'
import { DatasetPage } from './DatasetPage'
import { mockDatasets } from 'mocks/datasets'
import { MemoryRouter } from 'react-router-dom'
import { UserContext } from 'services/userContext'
import axios from 'axios'
import userEvent from '@testing-library/user-event'

jest.mock('axios')
const mockedAxios = axios as jest.Mocked<typeof axios>
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useLocation: () => ({
    pathname: 'https://statina.scilifelab.se/datasets/default',
  }),
}))

describe('Dataset page', () => {
  test('Edit button should render for RW user', async () => {
    const user = userEvent.setup()
    mockedAxios.get.mockReturnValue(
      Promise.resolve({
        data: {
          dataset: mockDatasets[0],
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
            permissions: ['RW'],
          }}
        >
          <MemoryRouter>
            <DatasetPage />
          </MemoryRouter>
        </UserContext.Provider>
      )
    )
    const editBtn = await waitFor(() => queryAllByText(/Edit/i))
    await waitFor(() => expect(editBtn[0]).toBeVisible())
    const saveBtn = await waitFor(() => queryAllByText(/Save/i))
    await waitFor(() => expect(saveBtn[0]).not.toBeVisible())
    await user.click(editBtn[0])
    await waitFor(() => expect(saveBtn[0]).toBeVisible())
    await waitFor(() => expect(editBtn[0]).not.toBeVisible())
  })
  test('Edit button should not render for read user', async () => {
    mockedAxios.get.mockReturnValue(
      Promise.resolve({
        data: {
          dataset: mockDatasets[0],
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
          <MemoryRouter>
            <DatasetPage />
          </MemoryRouter>
        </UserContext.Provider>
      )
    )
    const editBtn = await waitFor(() => queryAllByText(/Edit/i))
    await waitFor(() => expect(editBtn).toHaveLength(0))
    const saveBtn = await waitFor(() => queryAllByText(/Save/i))
    await waitFor(() => expect(saveBtn).toHaveLength(0))
  })
})
