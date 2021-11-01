import React, { useContext, useEffect, useState } from 'react'
import Plot from 'react-plotly.js'
import { getZScoreGraph } from '../../services/StatinaApi'
import { UserContext } from '../../services/userContext'

type ZscoreGraphProps = {
  batchId: string
  chromosome: number
}

const buildData = (response, chromosome) => {
  const data = [
    {
      name: `Current batch ${response?.ncv_chrom_data[chromosome].count}`,
      y: response?.ncv_chrom_data[chromosome].ncv_values,
      x: response?.ncv_chrom_data[chromosome].names,
      mode: 'markers',
      type: 'scatter',
    },
    {
      y: response?.normal_data[chromosome].ncv_values,
      text: response?.normal_data[chromosome].names,
      pointpos: 30,
      type: 'box',
      marker: {
        color: '#ccccb3',
      },
      name: `Negative ${response?.ncv_chrom_data[chromosome].count}`,
    },
  ]
  Object.keys(response.abnormal_data[chromosome]).forEach((status) => {
    data.push({
      name: `${status} T${chromosome} ${response.abnormal_data[chromosome][status]?.count}`,
      y: response.abnormal_data[chromosome][status]?.ncv_values,
      x: response.abnormal_data[chromosome][status]?.x_axis,
      text: response.abnormal_data[chromosome][status]?.names,
      mode: 'markers',
      type: 'scatter',
    })
  })
  return data
}

const buildLayout = (response, chromosome) => {
  return {
    legend: { hovermode: 'closest' },
    hovermode: 'closest',
    annotations: [],
    xaxis: {
      showline: true,
      showgrid: true,
    },
    yaxis: {
      range: [-10, 10],
      title: response?.ncv_chrom_data[chromosome].ncv_values,
    },
    width: 1200,
    height: 600,
  }
}

export const ZscoreGraph = ({ batchId, chromosome }: ZscoreGraphProps) => {
  const userContext = useContext(UserContext)
  const [data, setData] = useState<any>()
  const [layout, setLayout] = useState<any>()

  useEffect(() => {
    getZScoreGraph(batchId, chromosome, userContext).then((response) => {
      setData(buildData(response, chromosome))
      setLayout(buildLayout(response, chromosome))
    })
  }, [])

  return <Plot data={data} layout={layout} />
}
