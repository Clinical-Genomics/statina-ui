import React from 'react'
import renderer from 'react-test-renderer'
import { render, waitFor } from '@testing-library/react'
import { SamplePage } from '../Sample/SamplePage'
import { windowMatchMedia } from '../../services/helpers/helpers'
import axios from 'axios'
import { mockSample } from '../../mocks/sample'
import { Router } from 'react-router'
import { BrowserRouter } from 'react-router-dom'
import { UserContext } from 'services/userContext'

jest.mock('axios')
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useLocation: () => ({
    pathname: 'https://statina.scilifelab.se/samples/2018-21237-04',
  }),
}))

beforeAll(() => {
  axios.get.mockImplementation(() => Promise.resolve(mockSample))
})

afterAll(() => {
  jest.clearAllMocks()
})

xdescribe('Sample Page', () => {
  test('Sample Page component should display UI correctly', async () => {
    const initializeUserContext = () => null
    const logout = () => null
    const { getAllByText } = render(
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

    await new Promise((r) => setTimeout(r, 2000))

    const sampleId = getAllByText(mockSample.sample_id)
    await waitFor(() => expect(sampleId).toHaveLength(1))
  })
})
