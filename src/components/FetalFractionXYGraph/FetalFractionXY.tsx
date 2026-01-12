import React, { useContext, useEffect, useState } from 'react'
import Plot, { ScatterData, Layout } from 'react-plotly.js'
import { getFetalFractionXYGraph } from '../../services/StatinaApi'
import { UserContext } from '../../services/userContext'
import { FetalFractionXYGraph } from '../../services/interfaces'
import { Loading } from '../Loading'

type FetalFractionXYGraphProps = {
  batchId: string
  chromosome: number
}

export const fFXYGraphHeight = 1000
export const fFXYGraphWidth = 1200

export const buildFFXYGraphData = (response: FetalFractionXYGraph): ScatterData[] => {
  const data: ScatterData[] = [
    {
      y: response.control?.FFY,
      x: response.control?.FFX,
      text: response.control?.names,
      name: `Negative N=${response.control?.count}`,
      mode: 'markers',
      type: 'scatter',
      marker: { color: '#e0dede' },
    },
  ]
  response.cases?.names?.forEach((name, index) => {
    data.push({
      y: [response.cases?.FFY[index]],
      x: [response.cases?.FFX[index]],
      name: name,
      mode: 'markers',
      text: name,
      type: 'scatter',
      marker: {
        size: 15,
        symbol: index < 30 ? index : index + 100,
        type: 'scatter',
      },
    })
  })

  Object.keys(response.sex_thresholds).forEach((threshold) => {
    data.push({
      x: response.sex_thresholds[threshold].x,
      y: response.sex_thresholds[threshold].y,
      mode: 'lines',
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

  Object.keys(response?.abnormal).forEach((abnormal) => {
    Object.keys(response.abnormal[abnormal]).forEach((status) => {
      data.push({
        name: `${abnormal} ${status} ${response.abnormal[abnormal][status].count}`,
        y: response.abnormal[abnormal][status]?.FFY,
        x: response.abnormal[abnormal][status]?.FFX,
        text: response.abnormal[abnormal][status]?.names,
        mode: 'markers',
        marker: {
          line: { width: 2 },
          size: 7,
          symbol: 'circle-open',
          type: 'scatter',
        },
      })
    })
  })
  return data
}

export const buildFFXYGraphLayout = (
  response: FetalFractionXYGraph,
  showOutliers?: boolean,
  title?: string,
  height = fFXYGraphHeight,
  width = fFXYGraphWidth
): Layout => {
  return {
    annotations: [],
    title: title,
    height: height,
    width: width,
    legend: { hovermode: 'closest', orientation: 'h' },
    hovermode: 'closest',
    xaxis: {
      range: showOutliers ? null : [response.max_x, response.min_x],
      autorange: showOutliers ? 'reversed' : null,
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

export const FetalFractionXY = ({ batchId }: FetalFractionXYGraphProps) => {
  const userContext = useContext(UserContext)
  const [data, setData] = useState<ScatterData[]>()
  const [outliersLayout, setOutliersLayout] = useState<Layout>()
  const [layout, setLayout] = useState<Layout>()
  const [isLoading, setIsLoading] = React.useState<boolean>(true)

  useEffect(() => {
    getFetalFractionXYGraph(batchId, userContext)
      .then((response: FetalFractionXYGraph) => {
        setData(buildFFXYGraphData(response))
        setLayout(buildFFXYGraphLayout(response, false, 'Default range'))
        setOutliersLayout(buildFFXYGraphLayout(response, true, 'Outliers range'))
        setIsLoading(false)
      })
      .catch(() => setIsLoading(false))
  }, [])

  return isLoading ? (
    <Loading />
  ) : (
    <>
      <Plot data={data} layout={layout} />
      <Plot data={data} layout={outliersLayout} />
    </>
  )
}
