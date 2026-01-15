import React, { useContext, useEffect, useState } from 'react'
import Plot, { Layout, BoxPlotData } from 'react-plotly.js'
import { getChromosomeRatioGraph } from '../../services/StatinaApi'
import { FetalFractionXYGraph } from '../../services/interfaces'
import { UserContext } from '../../services/userContext'
import type { ScatterData } from 'plotly.js'
import { Loading } from '../Loading'

type ChromosomesRatioPlotProps = {
  batchId: string
}

const buildData = (statistics: any): BoxPlotData[] => {
  const scatterData = Object.keys(statistics.scatter_data).map((batchId) => ({
    name: batchId,
    y: statistics.scatter_data[batchId].y_axis,
    x: statistics.scatter_data[batchId].x_axis,
    mode: 'markers',
    text: batchId,
    type: 'scatter',
  }))

  const boxData = Object.keys(statistics.box_data).map((chromosome) => ({
    name: chromosome,
    y: statistics.box_data[chromosome],
    x: chromosome,
    showlegend: false,
    boxpoints: false,
    text: chromosome,
    marker: { color: '#ccccb3' },
    type: 'box',
  }))
  return [...boxData, ...scatterData]
}

const buildLayout = (statistics: any): Layout => {
  return {
    legend: { hovermode: 'closest' },
    hovermode: 'closest',
    height: 600,
    xaxis: {
      showline: true,
      zeroline: false,
      linecolor: '#636363',
      linewidth: 5,
      showgrid: true,
      gridcolor: '#bdbdbd',
      title: 'Chromosome',
      tickvals: statistics.x_axis,
    },
    yaxis: {
      zeroline: false,
      showline: true,
      showgrid: false,
      linecolor: '#636363',
      linewidth: 5,
      title: 'Coverage Ratio',
    },
  }
}

export const ChromosomesRatioPlot = ({ batchId }: ChromosomesRatioPlotProps) => {
  const userContext = useContext(UserContext)
  const [data, setData] = useState<ScatterData[]>()
  const [layout, setLayout] = useState<Layout>()
  const [isLoading, setIsLoading] = React.useState<boolean>(true)

  useEffect(() => {
    getChromosomeRatioGraph(batchId, userContext)
      .then((response: FetalFractionXYGraph) => {
        setData(buildData(response))
        setLayout(buildLayout(response))
        setIsLoading(false)
      })
      .catch(() => setIsLoading(false))
  }, [])
  return isLoading ? <Loading /> : <Plot data={data} layout={layout} style={{ width: '100%' }} />
}
