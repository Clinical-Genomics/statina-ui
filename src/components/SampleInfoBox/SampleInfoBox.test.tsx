import React from 'react'
import { render } from '@testing-library/react'
import { SampleInfoBox } from './SampleInfoBox'
import { mockSample } from 'mocks/sample'
import { MemoryRouter } from 'react-router-dom'

describe('Sample info box', () => {
  test('Sample info box should display UI correctly', () => {
    const { getByText } = render(
      <MemoryRouter>
        <SampleInfoBox sample={mockSample}></SampleInfoBox>
      </MemoryRouter>
    )
    const sampleProject = getByText(/2106151/i)
    expect(sampleProject).toBeVisible()
  })
})
