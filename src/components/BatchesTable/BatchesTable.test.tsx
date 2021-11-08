import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import { BatchesTable } from './BatchesTable'
import { mockBatches } from 'mocks/batches'
import { MemoryRouter } from 'react-router-dom'
import { UserContext } from 'services/userContext'

describe('Batches Table', () => {
  test('Batches Table should display UI correctly', () => {
    const initializeUserContext = () => null
    const logout = () => null
    const { getByText } = render(
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
    )
    const batchID = getByText(mockBatches[0].batch_id)
    expect(batchID).toBeVisible()
    const date = getByText(mockBatches[0].SequencingDate)
    expect(date).toBeVisible()
    const flowcell = getByText(mockBatches[0].Flowcell)
    expect(flowcell).toBeVisible()
  })
  test('Search batches should work', () => {
    const { queryByText } = render(
      <MemoryRouter>
        <BatchesTable batches={mockBatches} batchesCount={20}></BatchesTable>
      </MemoryRouter>
    )
    expect(queryByText(mockBatches[1].batch_id)).toBeVisible()
    const inputElement = screen.getByPlaceholderText('Search Batches') as HTMLInputElement
    const buttonElement = screen.getByRole('button', {
      name: /Search/i,
    })
    fireEvent.change(inputElement, { target: { value: mockBatches[0].batch_id } })
    expect(inputElement.value).toBe(mockBatches[0].batch_id)
    fireEvent.click(buttonElement)
    expect(screen.getByText(mockBatches[0].Flowcell)).toBeInTheDocument()
  })
})
