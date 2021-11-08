import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import { windowMatchMedia } from 'services/helpers/helpers'
import { SamplesTable } from './SamplesTable'
import { mockSamples } from 'mocks/samples'
import { MemoryRouter } from 'react-router-dom'
import { UserContext } from 'services/userContext'

describe('Samples Table', () => {
  test('Samples Table should display UI correctly', () => {
    window.matchMedia = windowMatchMedia()
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
          <SamplesTable samples={mockSamples} samplesCount={10}></SamplesTable>
        </MemoryRouter>
      </UserContext.Provider>
    )
    const sample_id = getByText(mockSamples[0].sample_id)
    expect(sample_id).toBeVisible()
    const comment = getByText(mockSamples[0].comment)
    expect(comment).toBeVisible()
  })
  test('Search samples should work', () => {
    window.matchMedia = windowMatchMedia()
    const { getByPlaceholderText, queryByText } = render(
      <MemoryRouter>
        <SamplesTable samples={mockSamples} samplesCount={20}></SamplesTable>
      </MemoryRouter>
    )
    expect(queryByText(mockSamples[0].sample_id)).toBeInTheDocument()
    const inputElement = screen.getByPlaceholderText(
      'Search by Sample name, Batch name or Comment'
    ) as HTMLInputElement
    const buttonElement = screen.getByRole('button', {
      name: /Search/i,
    })
    fireEvent.change(inputElement, { target: { value: mockSamples[0].sample_id } })
    expect(inputElement.value).toBe(mockSamples[0].sample_id)
    fireEvent.click(buttonElement)
    expect(screen.getByText(mockSamples[0].sample_id)).toBeVisible()
  })
})
