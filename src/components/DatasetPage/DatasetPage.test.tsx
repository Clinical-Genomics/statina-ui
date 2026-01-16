import React from 'react'
import { render, screen, waitFor } from '@testing-library/react'
import { DatasetPage } from './DatasetPage'
import { mockDatasets } from 'mocks/datasets'
import { MemoryRouter } from 'react-router-dom'
import { UserContext } from 'services/userContext'
import axios from 'axios'
import userEvent from '@testing-library/user-event'
import type { Mocked } from 'vitest'

vi.mock('axios')
const mockedAxios = axios as Mocked<typeof axios>
vi.mock('react-router-dom', async () => ({
  ...(await vi.importActual<typeof import('react-router-dom')>('react-router-dom')),
  useLocation: () => ({
    pathname: 'https://statina.scilifelab.se/datasets/default',
  }),
}))

describe('Dataset page', () => {
  test('Edit/Save button should render for RW user', async () => {
    const user = userEvent.setup()
    mockedAxios.get.mockReturnValue(
      Promise.resolve({
        data: mockDatasets[0],
      })
    )
    const initializeUserContext = () => null
    const logout = () => null

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
    const editBtn = await screen.findAllByText(/Edit/i)
    await waitFor(() => expect(editBtn[0]).toBeVisible())
    const saveBtn = screen.queryAllByText(/Save/i)
    await waitFor(() => expect(saveBtn[0]).not.toBeVisible())
    await user.click(editBtn[0])
    await waitFor(() => expect(saveBtn[0]).toBeVisible())
    await waitFor(() => expect(editBtn[0]).not.toBeVisible())
  })
  test('The call to backend should be correct when edit the comment and save', async () => {
    const user = userEvent.setup()
    mockedAxios.get.mockReturnValue(
      Promise.resolve({
        data: mockDatasets[0],
      })
    )
    const initializeUserContext = () => null
    const logout = () => null

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
    const editBtn = await screen.findAllByText(/Edit/i)
    await user.click(editBtn[0])
    const comment = (await screen.findByDisplayValue(
      mockDatasets[0].comment
    )) as HTMLInputElement
    await user.clear(comment)
    await user.type(comment, 'New comment')
    const saveBtn = await screen.findAllByText(/Save/i)
    await user.click(saveBtn[0])
    expect(axios.patch).toHaveBeenLastCalledWith(
      `/dataset/${mockDatasets[0].name}`,
      `trisomy_hard_min=${mockDatasets[0].trisomy_hard_min}&trisomy_hard_max=${mockDatasets[0].trisomy_hard_max}&trisomy_soft_max=${mockDatasets[0].trisomy_soft_max}&m_upper=6.5958&m_lower=${mockDatasets[0].m_lower}&k_lower=${mockDatasets[0].k_lower}&k_upper=${mockDatasets[0].k_upper}&y_axis_max=${mockDatasets[0].y_axis_max}&y_axis_min=${mockDatasets[0].y_axis_min}&fetal_fraction_X0=${mockDatasets[0].fetal_fraction_X0}&fetal_fraction_XXX=${mockDatasets[0].fetal_fraction_XXX}&fetal_fraction_y_min=${mockDatasets[0].fetal_fraction_y_min}&fetal_fraction_y_max=${mockDatasets[0].fetal_fraction_y_max}&fetal_fraction_y_for_trisomy=${mockDatasets[0].fetal_fraction_y_for_trisomy}&fetal_fraction_preface=${mockDatasets[0].fetal_fraction_preface}&comment=New comment`,
      {
        headers: {
          Authorization: 'Bearer token',
          ContentType: 'application/x-www-form-urlencoded',
        },
      }
    )
  })
  test('Edit button should not render for read user', async () => {
    mockedAxios.get.mockReturnValue(
      Promise.resolve({
        data: mockDatasets[0],
      })
    )
    const initializeUserContext = () => null
    const logout = () => null
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
    await screen.findByText(/Dataset/i)
    const editBtn = screen.queryAllByText(/Edit/i)
    await waitFor(() => expect(editBtn).toHaveLength(0))
    const saveBtn = screen.queryAllByText(/Save/i)
    await waitFor(() => expect(saveBtn).toHaveLength(0))
  })
})
