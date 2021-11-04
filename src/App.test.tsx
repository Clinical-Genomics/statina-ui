import React from 'react'
import { render, waitFor } from '@testing-library/react'
import axios from 'axios'
import { mockBatches } from './mocks/batches'
import { App } from './App'
import { Router } from 'react-router-dom'
import { createMemoryHistory } from 'history'
import { mockAdminCookie } from './mocks/cookies'
import { userCookie } from './services/helpers/helpers'

jest.mock('axios')
const mockedAxios = axios as jest.Mocked<typeof axios>

describe('App', () => {
  test('not signed in App should display login page', async () => {
    const history = createMemoryHistory()
    const { getByText } = await waitFor(() =>
      render(
        <Router history={history}>
          <App />
        </Router>
      )
    )
    const signInButton = await waitFor(() => getByText(/Sign in/i))
    await waitFor(() => expect(signInButton).toBeVisible())
  })

  test('Signed in app with admin permissions should display batches page', async () => {
    Object.defineProperty(document, 'cookie', {
      writable: true,
      value: mockAdminCookie,
    })

    mockedAxios.get.mockReturnValue(Promise.resolve(mockBatches))
    const history = createMemoryHistory()

    const { getByText } = await waitFor(() =>
      render(
        <Router history={history}>
          <App />
        </Router>
      )
    )
    const batchPageTitle = await waitFor(() => getByText(/NIPT Batches/i))
    await waitFor(() => expect(batchPageTitle).toBeVisible())
  })
})
