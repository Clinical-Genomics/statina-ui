import React from 'react'
import Plot, { Layout, BoxPlotData } from 'react-plotly.js'

type StatisticsBoxPlotProps = {
  selectedPlot: string
  statistics: any
  showTotal: boolean
}

const getBatchesWithData = (selectedPlot: string, statistics: any): string[] => {
  return (
    statistics.batch_ids?.filter((batchId: string) => {
      const values = statistics.box_stat[batchId]?.[selectedPlot]
      return Array.isArray(values) && values.length > 0
    }) ?? []
  )
}

const buildData = (selectedPlot: string, statistics: any): BoxPlotData[] => {
  return getBatchesWithData(selectedPlot, statistics).map((batchId: string) => ({
    name: batchId,
    y: statistics.box_stat[batchId][selectedPlot],
    type: 'box',
    text: statistics.box_stat[batchId]?.sample_ids,
    showlegend: false,
    boxpoints: 'all',
  }))
}

const buildLayout = (selectedPlot: string, statistics: any, showTotal: boolean): Layout => {
  const batchesWithData = getBatchesWithData(selectedPlot, statistics)

  return {
    title: showTotal
      ? `${selectedPlot} - all batches with data (${batchesWithData.length})`
      : `${selectedPlot} - ${batchesWithData.length} most recent batches with data`,
    hovermode: 'closest',
    margin: { b: 100 },
    height: 600,
    xaxis: {
      showline: true,
      tickvals: batchesWithData.map((_, index) => index),
      ticktext: batchesWithData,
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
