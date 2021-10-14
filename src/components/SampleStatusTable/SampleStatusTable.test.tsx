import React from 'react'
import { render } from '@testing-library/react'
import { windowMatchMedia } from 'services/helpers/helpers'
import { SampleStatusTable } from './SampleStatusTable'
import { mockSample } from 'mocks/sample'
import { MemoryRouter } from 'react-router-dom'

describe('Sample status Table', () => {
  test('Sample status Table should display UI correctly', () => {
    window.matchMedia = windowMatchMedia()
    const { getByText } = render(
      <MemoryRouter>
        <SampleStatusTable ChromosomeAbn={mockSample}></SampleStatusTable>
      </MemoryRouter>
    )
    const chrom_abnorm = getByText(mockSample[0].chrom_abnorm[0])
    expect(chrom_abnorm).toBeVisible()
  })
})
