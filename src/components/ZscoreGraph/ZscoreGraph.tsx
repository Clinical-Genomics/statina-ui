import React, { useContext, useEffect, useState } from 'react'
import Plot from 'react-plotly.js'
import { getZScoreGraph } from '../../services/StatinaApi'
import { UserContext } from '../../services/userContext'

type ZscoreGraphProps = {
  batchId: string
  chromosome: number
}

export const ZscoreGraph = ({ batchId, chromosome }: ZscoreGraphProps) => {
  const userContext = useContext(UserContext)
  const [graph, setGraph] = useState<any>()

  useEffect(() => {
    getZScoreGraph(batchId, chromosome, userContext).then((response) => {
      setGraph(response)
      console.log(response)
    })
  }, [])
  const data: any[] = [
    {
      name: `Current batch ${graph?.ncv_chrom_data[chromosome].count}`,
      y: graph?.ncv_chrom_data[chromosome].ncv_values,
      x: graph?.ncv_chrom_data[chromosome].names,
      mode: 'markers',
      type: 'scatter',
    },
    {
      y: graph?.normal_data[chromosome].ncv_values,
      text: graph?.normal_data[chromosome].names,
      pointpos: 30,
      type: 'box',
      marker: {
        color: '#ccccb3',
      },
      name: `Negative ${graph?.ncv_chrom_data[chromosome].count}`,
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
      title: graph?.ncv_chrom_data[chromosome].ncv_values,
    },
    width: 1200,
    height: 600,
  }
  return <Plot data={data} layout={layout} />
}
