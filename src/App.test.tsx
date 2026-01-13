import React from 'react'
import { render, waitFor } from '@testing-library/react'
import axios from 'axios'
import { mockBatches } from './mocks/batches'
import { App } from './App'
import { Router } from 'react-router-dom'
import { createMemoryHistory } from 'history'
import { mockAdminCookie, mockInactiveCookie, mockUnconfirmedCookie } from './mocks/cookies'
import type { Mocked } from 'vitest'

vi.mock('axios')
const mockedAxios = axios as Mocked<typeof axios>

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

  test('Signed in app with should see username in Nav', async () => {
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
    const username = await waitFor(() => getByText(/elevu/i))
    await waitFor(() => expect(username).toBeVisible())
  })

  test('Signed with unconfirmed permissions should see confirm email component', async () => {
    Object.defineProperty(document, 'cookie', {
      writable: true,
      value: mockUnconfirmedCookie,
    })

    const history = createMemoryHistory()

    const { getByText } = await waitFor(() =>
      render(
        <Router history={history}>
          <App />
        </Router>
      )
    )
    const message = await waitFor(() => getByText(/You didn't confirm your email address/i))
    await waitFor(() => expect(message).toBeVisible())
  })
  test('Signed with inactive permissions should see confirm email component', async () => {
    Object.defineProperty(document, 'cookie', {
      writable: true,
      value: mockInactiveCookie,
    })

    const history = createMemoryHistory()

    const { getByText } = await waitFor(() =>
      render(
        <Router history={history}>
          <App />
        </Router>
      )
    )
    const message = await waitFor(() => getByText(/Your account is inactive/i))
    await waitFor(() => expect(message).toBeVisible())
  })
})
