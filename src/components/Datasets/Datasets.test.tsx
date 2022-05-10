import React from 'react'
import { render, waitFor } from '@testing-library/react'
import { Datasets } from './Datasets'
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
    pathname: 'https://statina.scilifelab.se/datasets',
  }),
}))

describe('Datasets Table', () => {
  test('Call to backend should be correct when search and pagination are combined', async () => {
    const user = userEvent.setup()
    mockedAxios.get.mockReturnValue(
      Promise.resolve({
        data: {
          documents: mockDatasets,
          document_count: mockDatasets.length,
        },
      })
    )
    const initializeUserContext = () => null
    const logout = () => null
    const { getByPlaceholderText, getAllByText } = await waitFor(() =>
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
            <Datasets />
          </MemoryRouter>
        </UserContext.Provider>
      )
    )
    await user.type(getByPlaceholderText('Search datasets'), 'testSearch')
    await user.keyboard('{enter}')
    expect(axios.get).toHaveBeenLastCalledWith(
      `undefined/datasets?query_string=testSearch&page_size=20&page_num=1`,
      {
        headers: {
          Authorization: 'Bearer token',
        },
      }
    )
    await user.click(getAllByText(/2/i)[1])
    expect(axios.get).toHaveBeenLastCalledWith(
      `undefined/datasets?query_string=testSearch&page_size=20&page_num=2`,
      {
        headers: {
          Authorization: 'Bearer token',
        },
      }
    )
  })

  test('Action column should render for RW user', async () => {
    mockedAxios.get.mockReturnValueOnce(
      Promise.resolve({
        data: {
          documents: mockDatasets,
          document_count: mockDatasets.length,
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
            <Datasets />
          </MemoryRouter>
        </UserContext.Provider>
      )
    )
    await waitFor(() => expect(queryAllByText(/Action/i)).toHaveLength(1))
  })

  test('Action column should not render for read user', async () => {
    mockedAxios.get.mockReturnValueOnce(
      Promise.resolve({
        data: {
          documents: mockDatasets,
          document_count: mockDatasets.length,
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
            <Datasets />
          </MemoryRouter>
        </UserContext.Provider>
      )
    )
    const deleteBtn = await waitFor(() => queryAllByText(/Action/i))
    await waitFor(() => expect(deleteBtn).toHaveLength(0))
  })
})
