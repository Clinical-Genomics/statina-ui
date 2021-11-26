import React from 'react'
import Plot, { Layout, BoxPlotData } from 'react-plotly.js'

type StatisticsBoxPlotProps = {
  selectedPlot: string
  statistics: any
}

const buildData = (selectedPlot: string, statistics: any): BoxPlotData[] => {
  return statistics.batch_ids?.map((batchId: string) => ({
    y: statistics.box_stat[batchId][selectedPlot],
    type: 'box',
    text: statistics.box_stat[batchId]?.sample_ids,
    showlegend: false,
    boxpoints: 'all',
  }))
}

const buildLayout = (selectedPlot: string, statistics: any): Layout => {
  return {
    title: `${selectedPlot} - ${statistics.nr_batches} most recent batches`,
    hovermode: 'closest',
    margin: { b: 100 },
    height: 600,
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

export const StatisticsBoxPlot = ({ selectedPlot, statistics }: StatisticsBoxPlotProps) => {
  return (
    <Plot
      data={buildData(selectedPlot, statistics)}
      layout={buildLayout(selectedPlot, statistics)}
      style={{ width: '100%' }}
    />
  )
}
