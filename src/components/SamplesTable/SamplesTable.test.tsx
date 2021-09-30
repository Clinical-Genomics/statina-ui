import React from 'react';
import { render, getByText } from '@testing-library/react';
import { windowMatchMedia } from '../../services/helpers/helpers';
import { SamplesTable } from './SamplesTable';
import { mockSamples } from '../../mocks/samples';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';

describe('Samples Table', () => {
  test('Samples Table should display UI correctly', () => {
    window.matchMedia = windowMatchMedia();
    const { getByText } = render(
      <MemoryRouter>
        <SamplesTable samples={mockSamples}></SamplesTable>
      </MemoryRouter>
    );
    const sampleID = getByText(mockSamples[0].SampleID);
    expect(sampleID).toBeVisible();
    const comment = getByText(mockSamples[0].comment);
    expect(comment).toBeVisible();
  });

  test('Search samples should work', () => {
    window.matchMedia = windowMatchMedia();
    const { getByPlaceholderText, queryByText, getByLabelText } = render(
      <MemoryRouter>
        <SamplesTable samples={mockSamples}></SamplesTable>
      </MemoryRouter>
    );
    expect(queryByText(mockSamples[1].SampleID)).toBeVisible();

    userEvent.type(
      getByPlaceholderText('Search by Sample, Batch or Comment'),
      mockSamples[0].comment
    );
    userEvent.click(getByLabelText('search'));
    expect(queryByText(mockSamples[1].SampleID)).toBeNull();
  });
});
