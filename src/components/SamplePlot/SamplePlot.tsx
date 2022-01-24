import React, { useContext, useEffect, useState } from 'react'
import Plot, { ScatterData, Layout } from 'react-plotly.js'
import { getSamplePlot } from '../../services/StatinaApi'
import { UserContext } from '../../services/userContext'
import { sampleStatusTags } from '../../services/helpers/constants'

type SamplePlotProps = {
  sampleId: string
}

const buildData = (sampleId, response): ScatterData[] => {
  const sampleData: ScatterData[] = [
    {
      name: `${sampleId}`,
      y: response.sample_data.ncv_values,
      x: response.sample_data.x_axis,
      mode: 'markers',
      type: 'scatter',
      marker: { size: 11 },
    },
  ]

  const abnormalData: ScatterData[] = Object.keys(response.abnormal_data).map((status) => {
    return {
      name: status,
      y: response.abnormal_data[status].ncv_values,
      x: response.abnormal_data[status].x_axis,
      text: response.abnormal_data[status].names,
      mode: 'markers',
      marker: {
        symbol: 'circle-open',
        line: { width: 2 },
        color: Object.values(sampleStatusTags).filter(
          (statusColor) => statusColor.label === status
        )[0].color,
        size: 7,
      },
      type: 'scatter',
    }
  })

  const normalData: ScatterData[] = Object.keys(response.normal_data).map((chromosome) => {
    return {
      y: response.normal_data[chromosome].ncv_values,
      x: response.normal_data[chromosome].x_axis,
      text: response.normal_data[chromosome].names,
      pointpos: 30,
      type: 'box',
      showlegend: true,
      marker: {
        color: '#ccccb3',
      },
      name: `Negative ${chromosome} (N=${response.normal_data[chromosome].count})`,
      boxpoints: 'suspectedoutliers',
    }
  })
  return [...sampleData, ...abnormalData, ...normalData]
}

const buildLayout = (sampleId): Layout => {
  return {
    title: `Sample: ${sampleId}`,
    legend: { hovermode: 'closest' },
    height: 500,
    hovermode: 'closest',
    annotations: [],
    xaxis: {
      showline: true,
      tickvals: [1, 2, 3],
      ticktext: ['Zscore 13', 'Zscore 18', 'Zscore 21'],
      linecolor: '#636363',
      linewidth: 5,
      showgrid: true,
      gridcolor: '#bdbdbd',
    },

    yaxis: {
      zeroline: false,
      showline: true,
      showgrid: false,
      linecolor: '#636363',
      linewidth: 5,
      title: 'Zscore',
    },
  }
}

export const SamplePlot = ({ sampleId }: SamplePlotProps) => {
  const userContext = useContext(UserContext)
  const [data, setData] = useState<ScatterData[]>()
  const [layout, setLayout] = useState<Layout>()

  useEffect(() => {
    getSamplePlot(sampleId, userContext).then((response) => {
      setData(buildData(sampleId, response))
      setLayout(buildLayout(sampleId))
    })
  }, [])

  return <Plot data={data} layout={layout} style={{ width: '100%' }} />
}
