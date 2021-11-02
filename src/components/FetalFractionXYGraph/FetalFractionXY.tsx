import React, { useContext, useEffect, useState } from 'react'
import Plot from 'react-plotly.js'
import { getFetalFractionXYGraph } from '../../services/StatinaApi'
import { UserContext } from '../../services/userContext'

type FetalFractionXYGraphProps = {
  batchId: string
  chromosome: number
}

const buildData = (response): any[] => {
  const data = [
    {
      y: response.control?.FFY,
      x: response.control?.FFX,
      text: response.control?.names,
      name: `Negative N=${response.control?.count}`,
      mode: 'markers',
      type: 'scatter',
      marker: { color: '#ccccb3' },
    },
  ]
  response.cases?.names?.forEach((name, index) => {
    data.push(
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      {
        y: [response.cases?.FFY[index]],
        x: [response.cases?.FFX[index]],
        name: name,
        mode: 'markers',
        text: name,
        type: 'scatter',
      }
    )
  })

  Object.keys(response.sex_thresholds).forEach((threshold) => {
    data.push({
      x: response.sex_thresholds[threshold].x,
      y: response.sex_thresholds[threshold].y,
      mode: 'lines',
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      showlegend: false,
      text: response.sex_thresholds[threshold].text,
      line: {
        dash: 'dot',
        color: 'red',
        width: 1,
      },
      name: threshold,
    })
  })
  return data
}

const buildLayout = (response) => {
  return {
    annotations: [],
    legend: { hovermode: 'closest', orientation: 'h' },
    hovermode: 'closest',
    width: 1200,
    height: 900,
    xaxis: {
      range: [response.max_x, response.min_x],
      showline: true,
      zeroline: false,
      linecolor: '#636363',
      linewidth: 5,
      showgrid: false,
      gridcolor: '#bdbdbd',
      title: 'Fetal Fraction X',
    },
    yaxis: {
      zeroline: false,
      showline: true,
      showgrid: false,
      linecolor: '#636363',
      linewidth: 5,
      title: 'Fetal Fraction Y',
    },
  }
}

export const FetalFractionXY = ({ batchId, chromosome }: FetalFractionXYGraphProps) => {
  const userContext = useContext(UserContext)
  const [data, setData] = useState<any>()
  const [layout, setLayout] = useState<any>()

  useEffect(() => {
    getFetalFractionXYGraph(batchId, userContext).then((response) => {
      setData(buildData(response))
      setLayout(buildLayout(response))
    })
  }, [])

  return <Plot data={data} layout={layout} />
}
