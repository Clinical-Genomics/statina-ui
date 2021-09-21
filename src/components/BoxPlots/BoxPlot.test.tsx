import React from 'react';
import { render, getByText } from '@testing-library/react';
import { windowMatchMedia } from '../../services/helpers/helpers';
import { BoxPlot } from './BoxPlot';
import { trace } from '../../mocks/statistics';
import { MemoryRouter } from 'react-router-dom';
/* import '@testing-library/jest-dom/extend-expect'; */

describe('BoxPlot', () => {
  test('BoxPlot render correctly', () => {
    window.matchMedia = windowMatchMedia() as any;
    const { getByText } = render(
      <MemoryRouter>
        <BoxPlot trace={trace}></BoxPlot>
      </MemoryRouter>
    );
    const name = getByText('2113162_NIPT');
    /* expect(name).toBeInTheDocument(); */
  });
});
