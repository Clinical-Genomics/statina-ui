import React from 'react';
import { render, getByText } from '@testing-library/react';
import { windowMatchMedia } from '../../services/helpers/helpers';
import { BatchesTable } from './BatchesTable';
import { mockBatches } from '../../mocks/batches';
import userEvent from '@testing-library/user-event';

describe('Batches Table', () => {
  test('Batches Table should display UI correctly', () => {
    window.matchMedia = windowMatchMedia();
    const { getByText } = render(
      <BatchesTable batches={mockBatches}></BatchesTable>
    );
    const batchID = getByText(mockBatches[0].SampleProject);
    expect(batchID).toBeVisible();
    const date = getByText(mockBatches[0].SequencingDate);
    expect(date).toBeVisible();
    const flowcell = getByText(mockBatches[0].Flowcell);
    expect(flowcell).toBeVisible();
  });

  test('Search batches should work', () => {
    window.matchMedia = windowMatchMedia();
    const { getByPlaceholderText, queryByText, getByText, getByLabelText } =
      render(<BatchesTable batches={mockBatches}></BatchesTable>);
    expect(queryByText(mockBatches[10].SampleProject)).toBeNull();

    userEvent.type(
      getByPlaceholderText('Search by Batch or Flowcell ID'),
      mockBatches[10].SampleProject
    );
    userEvent.click(getByLabelText('search'));
    getByText(mockBatches[10].SampleProject);
  });
});
