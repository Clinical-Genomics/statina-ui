import React from 'react'
import { render, getByText } from '@testing-library/react'
import { windowMatchMedia } from 'services/helpers/helpers'
import { BatchesTable } from './BatchesTable'
import { mockBatches } from 'mocks/batches'
import userEvent from '@testing-library/user-event'
import { MemoryRouter } from 'react-router-dom'
import { UserContext } from 'services/userContext'

describe('Batches Table', () => {
  test('Batches Table should display UI correctly', () => {
    window.matchMedia = windowMatchMedia()
    const initializeUserContext = () => null
    const logout = () => null
    const { getByText } = render(
<<<<<<< HEAD
      <MemoryRouter>
        <BatchesTable batches={mockBatches} batchesCount={20}></BatchesTable>
      </MemoryRouter>
=======
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
          <BatchesTable batches={mockBatches} batchesCount={10}></BatchesTable>
        </MemoryRouter>
      </UserContext.Provider>
>>>>>>> master
    )
    const batchID = getByText(mockBatches[0].batch_id)
    expect(batchID).toBeVisible()
    const date = getByText(mockBatches[0].SequencingDate)
    expect(date).toBeVisible()
    const flowcell = getByText(mockBatches[0].Flowcell)
    expect(flowcell).toBeVisible()
  })

  test('Search batches should work', () => {
    window.matchMedia = windowMatchMedia()
    const { getByPlaceholderText, queryByText } = render(
      <MemoryRouter>
        <BatchesTable batches={mockBatches} batchesCount={20}></BatchesTable>
      </MemoryRouter>
    )
    expect(queryByText(mockBatches[1].batch_id)).toBeVisible()

    userEvent.type(getByPlaceholderText('Search by Batch or Flowcell ID'), mockBatches[0].comment)
  })
})
