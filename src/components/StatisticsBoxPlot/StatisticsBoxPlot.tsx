import React from 'react'
import Plot, { Layout, BoxPlotData } from 'react-plotly.js'

type StatisticsBoxPlotProps = {
  selectedPlot: string
  statistics: any
  showTotal: boolean
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

export const StatisticsBoxPlot = ({
  selectedPlot,
  statistics,
  showTotal,
}: StatisticsBoxPlotProps) => {
  return (
    <Plot
      data={buildData(selectedPlot, statistics)}
      layout={buildLayout(selectedPlot, statistics, showTotal)}
      style={{ width: '100%' }}
    />
  )
}
