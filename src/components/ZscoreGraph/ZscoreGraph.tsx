import React, { useContext, useEffect, useState } from 'react'
import Plot from 'react-plotly.js'
import { getZScoreGraph } from '../../services/StatinaApi'
import { UserContext } from '../../services/userContext'
import { Zscore } from '../../services/interfaces'

type ZscoreGraphProps = {
  batchId: string
  chromosome: number
}

const buildData = (response: Zscore, chromosome: number): any[] => {
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

  Object.keys(response.tris_thresholds).forEach((line: any) => {
    console.log(response.ncv_chrom_data[chromosome].x_axis.length)
    data.push({
      x: [
        response?.ncv_chrom_data[chromosome].names[0],
        response?.ncv_chrom_data[chromosome].names[
          response?.ncv_chrom_data[chromosome].names.length - 1
        ],
      ],
      y: [response.tris_thresholds[line].Zscore, response.tris_thresholds[line].Zscore],
      mode: 'lines',
      text: response.tris_thresholds[line].text,
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      showlegend: false,
      line: {
        dash: 'dot',
        color: response.tris_thresholds[line].color,
        width: 1,
      },
      name: line,
    })
  })
  return data
}

const buildLayout = (response: Zscore, chromosome: number) => {
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
