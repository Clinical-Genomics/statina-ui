import React from 'react'
import { render, getByText } from '@testing-library/react'
import { windowMatchMedia } from 'services/helpers/helpers'
import { SamplesTable } from './SamplesTable'
import { mockSamples } from 'mocks/samples'
import userEvent from '@testing-library/user-event'
import { MemoryRouter } from 'react-router-dom'

describe('Samples Table', () => {
  test('Samples Table should display UI correctly', () => {
    window.matchMedia = windowMatchMedia()
    const { getByText } = render(
      <MemoryRouter>
        <SamplesTable samples={mockSamples} samplesCount={10}></SamplesTable>
      </MemoryRouter>
    )
    const sampleID = getByText(mockSamples[0].sample_id)
    expect(sampleID).toBeVisible()
    const comment = getByText(mockSamples[0].comment)
    expect(comment).toBeVisible()
  })

  test('Search samples should work', () => {
    window.matchMedia = windowMatchMedia()
    const { getByPlaceholderText, queryByText, getByLabelText } = render(
      <MemoryRouter>
        <SamplesTable samples={mockSamples} samplesCount={10}></SamplesTable>
      </MemoryRouter>
    )
    expect(queryByText(mockSamples[1].sample_id)).toBeVisible()

    userEvent.type(
      getByPlaceholderText('Search by Sample name, Batch name or Comment'),
      mockSamples[0].comment
    )
  })
})
