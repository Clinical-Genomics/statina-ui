import React, { useEffect } from 'react';
import Plot from 'react-plotly.js';
import { mockBatch } from '../../mocks/batches';

type ZscoreGraphProps = {
  samples: any[];
  score: string;
};

export const ZscoreGraph = ({ samples, score }: ZscoreGraphProps) => {
  const data: any[] = [
    {
      name: `Current batch ${samples.length}`,
      y: samples.map((sample) => sample?.Zscore_13),
      x: samples.map((sample) => sample?.SampleID),
      text: 'name',
      mode: 'markers',
      type: 'scatter',
    },
  ];

  useEffect(() => {
    console.log(data);
  }, []);

  const layout = {
    legend: { hovermode: 'closest' },
    hovermode: 'closest',
    annotations: [],
    xaxis: {
      showline: true,
      ticktext: 'name',
      tickvals: 'tickvals',
      tickangle: 90,
      linecolor: '#636363',
      linewidth: 5,
      showgrid: true,
      gridcolor: '#bdbdbd',
    },

    yaxis: {
      range: [-10],
      zeroline: false,
      showline: true,
      showgrid: false,
      linecolor: '#636363',
      linewidth: 5,
      title: score,
    },
  };

  return <Plot data={data} layout={layout} />;
};
