import React from 'react'
import Plot, { Layout, ScatterPlotData } from 'react-plotly.js'
import { batch } from 'react-redux'

type StatisticsScatterPlotProps = {
  selectedPlot: string
  statistics: any
}

const buildData = (selectedPlot: string, statistics: any): ScatterPlotData[] => {
  return statistics.batch_ids?.map((batchId: string, index) => {
    console.log(batchId)
    console.log(statistics.scatter_stat[batchId][selectedPlot])
    return {
      y: statistics.scatter_stat[batchId][selectedPlot],
      x: Object.keys(statistics.scatter_stat),
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
