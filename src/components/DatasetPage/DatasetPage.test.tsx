import React from 'react'
import { render, waitFor } from '@testing-library/react'
import { DatasetPage } from './DatasetPage'
import { mockDataset } from 'mocks/datasets'
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
  test('RW user should be able to edit dataset', async () => {
    const user = userEvent.setup()
    mockedAxios.get.mockReturnValue(
      Promise.resolve({
        data: {
          dataset: mockDataset,
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
    await waitFor(() => expect(editBtn).toHaveLength(1))
    await user.click(editBtn[0])
    const saveBtn = await waitFor(() => queryAllByText(/Save/i))
    await user.click(saveBtn[0])
    expect(axios.patch).toHaveBeenLastCalledWith('undefined/dataset/default', '', {
      headers: {
        Authorization: 'Bearer token',
        ContentType: 'application/x-www-form-urlencoded',
      },
    })
  })
  test('R user should not be able to edit dataset', async () => {
    mockedAxios.get.mockReturnValue(
      Promise.resolve({
        data: {
          dataset: mockDataset,
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
  })
})
