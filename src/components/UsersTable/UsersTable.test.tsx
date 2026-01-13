import React from 'react'
import { fireEvent, getByText, render, waitFor } from '@testing-library/react'
import { UsersTable } from './UsersTable'
import { mockUsers } from 'mocks/users'
import { MemoryRouter } from 'react-router-dom'
import { UserContext } from 'services/userContext'
import axios from 'axios'
import { VITE_BACKEND_URL } from '../../services/StatinaApi'
import type { Mocked } from 'vitest'

vi.mock('axios')
const mockedAxios = axios as Mocked<typeof axios>

const initializeUserContext = () => null
const logout = () => null

describe('Users Table', () => {
  test('Users Table should display UI correctly', async () => {
    mockedAxios.get.mockReturnValueOnce(
      Promise.resolve({
        data: {
          documents: mockUsers,
          document_count: mockUsers.length,
        },
      })
    )
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
          <MemoryRouter>
            <UsersTable />
          </MemoryRouter>
        </UserContext.Provider>
      )
    )
    mockUsers.forEach((user) => {
      const username = getByText(user.username)
      expect(username).toBeVisible()
    })
  })

  test('Admin can update user status', async () => {
    mockedAxios.get.mockReturnValue(
      Promise.resolve({
        data: {
          documents: mockUsers,
          document_count: mockUsers.length,
        },
      })
    )
    mockedAxios.put.mockReturnValue(Promise.resolve('success'))
    const { queryAllByText, getByText } = await waitFor(() =>
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
            <UsersTable />
          </MemoryRouter>
        </UserContext.Provider>
      )
    )
    const updateStatusDropdown = await waitFor(() => queryAllByText(mockUsers[0].role))
    const editStatus = await waitFor(() => updateStatusDropdown[0])
    await waitFor(() => fireEvent.mouseDown(editStatus))
    await waitFor(() => fireEvent.click(getByText(/inactive/i)))
    expect(axios.put).toHaveBeenCalledWith(
      `${VITE_BACKEND_URL}/user/${mockUsers[0].username}/role?role=inactive`,
      null,
      {
        headers: {
          Authorization: 'Bearer token',
          ContentType: 'application/x-www-form-urlencoded',
        },
      }
    )
  })

  test('Admin can delete user', async () => {
    mockedAxios.get.mockReturnValue(
      Promise.resolve({
        data: {
          documents: mockUsers,
          document_count: mockUsers.length,
        },
      })
    )
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
            <UsersTable />
          </MemoryRouter>
        </UserContext.Provider>
      )
    )
    const deleteBtn = await waitFor(() => queryAllByLabelText('delete'))
    const deleteUser = await waitFor(() => deleteBtn[0])
    fireEvent.click(deleteUser)
    const confirmation = await waitFor(() =>
      getByText(/Are you sure you want to delete this user?/i)
    )
    await waitFor(() => expect(confirmation).toBeInTheDocument())
  })
})
