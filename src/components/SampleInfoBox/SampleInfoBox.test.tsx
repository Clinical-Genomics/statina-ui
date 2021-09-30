import React from 'react';
import { render } from '@testing-library/react';
import { windowMatchMedia } from '../../services/helpers/helpers';
import { SampleInfoBox } from './SampleInfoBox';
import { mockSample } from '../../mocks/sample';
import { MemoryRouter } from 'react-router-dom';

describe('Sample info box', () => {
  test('Sample info box should display UI correctly', () => {
    window.matchMedia = windowMatchMedia();
    const { getByText } = render(
      <MemoryRouter>
        <SampleInfoBox infoBox={mockSample}></SampleInfoBox>
      </MemoryRouter>
    );
    const sampleProject = getByText(mockSample[0].sample.SampleProject);
    expect(sampleProject).toBeVisible();
  });
});
