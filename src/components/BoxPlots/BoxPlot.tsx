import React from 'react';
import Plot from 'react-plotly.js';
import { TracePlot } from '../../services/interfaces';

type PlotProps = {
  trace: TracePlot;
};

export function BoxPlot(trace: PlotProps) {
  return (
    <div>
      <Plot
        data={[trace.trace]}
        layout={{
          width: 1000,
          height: 500,
          yaxis: {
            title: 'Chr13_Ratio',
          },
        }}
      />
      ;
    </div>
  );
}
