import React from 'react'
import Plot, { Layout, ScatterPlotData } from 'react-plotly.js'

type StatisticsScatterPlotProps = {
  selectedPlot: string
  statistics: any
}

const buildData = (selectedPlot: string, statistics: any): ScatterPlotData[] => {
  return statistics.batch_ids?.map((batchId: string) => {
    return {
      y: Object.values(statistics.scatter_stat).map((value: any) => value[selectedPlot]),
      x: statistics.batch_ids,
      type: 'scatter',
      mode: 'markers',
      showlegend: false,
      name: batchId,
      text: `Date Run: ${statistics.scatter_stat[batchId].date}`,
    }
  })
}

const buildLayout = (selectedPlot: string, statistics: any): Layout => {
  return {
    title: `${selectedPlot} - ${statistics.nr_batches} most recent batches`,
    hovermode: 'closest',
    margin: { b: 100 },
    height: 600,
    width: 1000,
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
