import React from 'react'
import Plot, { Layout, ScatterPlotData } from 'react-plotly.js'

type StatisticsScatterPlotProps = {
  selectedPlot: string
  statistics: any
}

const buildData = (selectedPlot: string, statistics: any): ScatterPlotData[] => {
  return statistics.batch_ids?.map((batchId: string) => ({
    y: statistics.scatter_stat[batchId][selectedPlot],
    type: 'scatter',
    text: statistics.scatter_stat[batchId]?.sample_ids,
    showlegend: false,
    scatterpoints: 'all',
  }))
}

const buildLayout = (selectedPlot: string, statistics: any): Layout => {
  return {
    title: `${selectedPlot} - ${statistics.nr_batches} most recent batches`,
    hovermode: 'closest',
    margin: { b: 100 },
    height: 800,
    width: 1200,
    xaxis: {
      showline: true,
      tickvals: statistics.ticks,
      ticktext: statistics.batch_ids,
      tickangle: 40,
      zeroline: false,
      linecolor: '#636363',
      linewidth: 5,
      gridcolor: '#bdbdbd',
    },
    yaxis: {
      zeroline: false,
      showline: true,
      showgrid: false,
      linecolor: '#636363',
      linewidth: 5,
      title: selectedPlot,
    },
  }
}

export const StatisticsScatterPlot = ({ selectedPlot, statistics }: StatisticsScatterPlotProps) => {
  return (
    <Plot
      data={buildData(selectedPlot, statistics)}
      layout={buildLayout(selectedPlot, statistics)}
    />
  )
}
