import React, { useContext, useEffect, useState } from 'react'
import Plot, { Layout, BoxPlotData } from 'react-plotly.js'
import { getChromosomeRatioGraph } from '../../services/StatinaApi'
import { FetalFractionXYGraph } from '../../services/interfaces'
import { buildFFXYGraphData, buildFFXYGraphLayout } from '../FetalFractionXYGraph/FetalFractionXY'
import { UserContext } from '../../services/userContext'
import { ScatterData } from 'plotly.js'

type ChromosomesRatioPlotProps = {
  batchId: string
}

const buildData = (statistics: any): BoxPlotData[] => {
  return statistics.batch_ids?.map((batchId: string) => ({
    y: [],
    type: 'box',
    text: statistics.box_stat[batchId]?.sample_ids,
    showlegend: false,
    boxpoints: 'all',
  }))
}

const buildLayout = (response: any): Layout => {
  return {
    legend: { hovermode: 'closest' },
    hovermode: 'closest',
    xaxis: {
      showline: true,
      zeroline: false,
      linecolor: '#636363',
      linewidth: 5,
      showgrid: true,
      gridcolor: '#bdbdbd',
      title: 'Chromosome',
      tickvals: response.x_data,
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

  useEffect(() => {
    getChromosomeRatioGraph(batchId, userContext).then((response: FetalFractionXYGraph) => {
      console.log(response)
      setData(buildData(response))
      setLayout(buildLayout(response))
    })
  }, [])
  return <Plot data={data} layout={layout} />
}
