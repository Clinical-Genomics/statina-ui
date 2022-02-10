import React from 'react'
import Plot, { Layout, ScatterPlotData } from 'react-plotly.js'

type StatisticsScatterPlotProps = {
  selectedPlot: string
  statistics: any
  showTotal: boolean
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

const buildLayout = (selectedPlot: string, statistics: any, showTotal: boolean): Layout => {
  return {
    title: showTotal
      ? `${selectedPlot} - all batches (${statistics.batch_ids.length})`
      : `${selectedPlot} - ${statistics.batch_ids.length} most recent batches`,
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

export const StatisticsScatterPlot = ({
  selectedPlot,
  statistics,
  showTotal,
}: StatisticsScatterPlotProps) => {
  return (
    <Plot
      data={buildData(selectedPlot, statistics)}
      layout={buildLayout(selectedPlot, statistics, showTotal)}
      style={{ width: '100%' }}
    />
  )
}
