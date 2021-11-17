import React, { useContext, useEffect, useState } from 'react'
import Plot, { ScatterData, Layout } from 'react-plotly.js'
import { getFetalFractionPrefaceGraph } from '../../services/StatinaApi'
import { FetalFractionPrefaceGraph } from '../../services/interfaces'
import { UserContext } from '../../services/userContext'

type FetalFractionPrefaceProps = {
  batchId: string
  chromosome: number
}

const fFPFGraphWidth = 1200
const fFPFGraphHeight = 800

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
  width = fFPFGraphWidth,
  height = fFPFGraphHeight
): Layout => {
  return {
    annotations: [],
    width: width,
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
  width = fFPFGraphWidth,
  height = fFPFGraphHeight
): Layout => {
  return {
    annotations: [],
    width: width,
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

  useEffect(() => {
    getFetalFractionPrefaceGraph(batchId, userContext).then(
      (response: FetalFractionPrefaceGraph) => {
        setDataY(buildFFPFYGraphData(response))
        setLayoutY(buildFFPFYGraphLayout(response))
        setDataX(buildFFPFXGraphData(response))
        setLayoutX(buildFFPFXGraphLayout(response))
      }
    )
  }, [])

  return (
    <>
      <Plot data={dataY} layout={layoutY} />
      <Plot data={dataX} layout={layoutX} />
    </>
  )
}
