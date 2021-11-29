import React, { useContext, useEffect, useState } from 'react'
import Plot, { ScatterData, Layout } from 'react-plotly.js'
import { getFetalFractionPrefaceGraph } from '../../services/StatinaApi'
import { FetalFractionPrefaceGraph } from '../../services/interfaces'
import { UserContext } from '../../services/userContext'
import { Loading } from '../Loading'

type FetalFractionPrefaceProps = {
  batchId: string
  chromosome: number
}

const fFPFGraphHeight = 600

const buildFFPFYGraphData = (response: FetalFractionPrefaceGraph): ScatterData[] => {
  const data: ScatterData[] = [
    {
      y: response.control?.FF,
      x: response.control?.FFY,
      text: response.control?.names,
      name: `Negative N=${response.control?.count}`,
      mode: 'markers',
      type: 'scatter',
      marker: { color: '#ccccb3' },
    },
  ]
  response.cases?.names?.forEach((name, index) => {
    data.push({
      y: [response.cases?.FF[index]],
      x: [response.cases?.FFY[index]],
      name: name,
      mode: 'markers',
      text: name,
      type: 'scatter',
    })
  })

  return data
}

const buildFFPFYGraphLayout = (
  response: FetalFractionPrefaceGraph,
  height = fFPFGraphHeight
): Layout => {
  return {
    annotations: [],
    height: height,
    legend: { hovermode: 'closest', orientation: 'v' },
    hovermode: 'closest',
    title: 'Fetal fraction Y and Preface correlation.',
    xaxis: {
      showline: true,
      zeroline: false,
      linecolor: '#636363',
      linewidth: 5,
      showgrid: false,
      gridcolor: '#bdbdbd',
      title: 'Fetal fraction Y',
    },
    yaxis: {
      zeroline: false,
      showline: true,
      showgrid: false,
      linecolor: '#636363',
      linewidth: 5,
      title: 'Fetal fraction Preface (%)',
    },
  }
}

const buildFFPFXGraphData = (response: FetalFractionPrefaceGraph): ScatterData[] => {
  const data: ScatterData[] = [
    {
      y: response.control?.FF,
      x: response.control?.FFX,
      text: response.control?.names,
      name: `Negative N=${response.control?.count}`,
      mode: 'markers',
      type: 'scatter',
      marker: { color: '#ccccb3' },
    },
  ]
  response.cases?.names?.forEach((name, index) => {
    data.push({
      y: [response.cases?.FF[index]],
      x: [response.cases?.FFX[index]],
      name: name,
      mode: 'markers',
      text: name,
      type: 'scatter',
    })
  })

  return data
}

const buildFFPFXGraphLayout = (
  response: FetalFractionPrefaceGraph,
  height = fFPFGraphHeight
): Layout => {
  return {
    annotations: [],
    height: height,
    legend: { hovermode: 'closest', orientation: 'v' },
    hovermode: 'closest',
    title: 'Fetal fraction X and Preface correlation.',
    xaxis: {
      showline: true,
      zeroline: false,
      linecolor: '#636363',
      linewidth: 5,
      showgrid: false,
      gridcolor: '#bdbdbd',
      title: 'Fetal fraction X',
    },
    yaxis: {
      zeroline: false,
      showline: true,
      showgrid: false,
      linecolor: '#636363',
      linewidth: 5,
      title: 'Fetal fraction Preface (%)',
    },
  }
}

export const FetalFractionPreface = ({ batchId }: FetalFractionPrefaceProps) => {
  const userContext = useContext(UserContext)
  const [dataY, setDataY] = useState<ScatterData[]>()
  const [layoutY, setLayoutY] = useState<Layout>()
  const [dataX, setDataX] = useState<ScatterData[]>()
  const [layoutX, setLayoutX] = useState<Layout>()
  const [isLoading, setIsLoading] = React.useState<boolean>(true)

  useEffect(() => {
    getFetalFractionPrefaceGraph(batchId, userContext)
      .then((response: FetalFractionPrefaceGraph) => {
        setDataY(buildFFPFYGraphData(response))
        setLayoutY(buildFFPFYGraphLayout(response))
        setDataX(buildFFPFXGraphData(response))
        setLayoutX(buildFFPFXGraphLayout(response))
        setIsLoading(false)
      })
      .catch(() => setIsLoading(false))
  }, [])

  return isLoading ? (
    <Loading />
  ) : (
    <>
      <Plot data={dataY} layout={layoutY} style={{ width: '100%' }} />
      <Plot data={dataX} layout={layoutX} style={{ width: '100%' }} />
    </>
  )
}
