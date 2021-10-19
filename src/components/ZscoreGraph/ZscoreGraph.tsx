import React from 'react'
import Plot from 'react-plotly.js'

type ZscoreGraphProps = {
  samples: any[]
  score: string
}

export const ZscoreGraph = ({ samples, score }: ZscoreGraphProps) => {
  const data: any[] = [
    {
      name: `Current batch ${samples.length}`,
      y: samples.map((sample) => sample[score]),
      x: samples.map((sample) => sample?.SampleID),
      mode: 'markers',
      type: 'scatter',
    },
  ]
  const layout = {
    legend: { hovermode: 'closest' },
    hovermode: 'closest',
    annotations: [],
    xaxis: {
      showline: true,
      showgrid: true,
    },
    yaxis: {
      range: [-10, 10],
      title: score,
    },
    width: 1200,
    height: 600,
  }

  return <Plot data={data} layout={layout} />
}
