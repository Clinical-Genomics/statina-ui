import React, { useContext, useEffect, useState } from 'react'
import { Tabs, Card } from 'antd'
import Plot, { Layout, BoxPlotData } from 'react-plotly.js'
import { getStatistics } from '../../services/StatinaApi'
import { UserContext } from '../../services/userContext'

const buildData = (selectedPlot: string, statistics: any): BoxPlotData[] => {
  return statistics.batch_ids?.map((batchId: string) => ({
    y: statistics.box_stat[batchId][selectedPlot],
    type: 'box',
    text: statistics.box_stat[batchId]?.sample_ids,
    showlegend: false,
    boxpoints: 'all',
  }))
}

const buildLayout = (selectedPlot: string, statistics: any): Layout => {
  return {
    title: `${selectedPlot} - ${statistics.nr_batches} most recent batches`,
    hovermode: 'closest',
    margin: { b: 100 },
    height: 800,
    width: 1200,
    xaxis: {
      showline: true,
      tickvals: statistics.ticks,
      ticktext: statistics.batch_ids,
      tickangle: 40,
      zeroline: false,
      linecolor: '#636363',
      linewidth: 5,
      gridcolor: '#bdbdbd',
    },
    yaxis: {
      zeroline: false,
      showline: true,
      showgrid: false,
      linecolor: '#636363',
      linewidth: 5,
      title: selectedPlot,
    },
  }
}

export function StatisticsPage() {
  const userContext = useContext(UserContext)
  const [statistics, setStatistics] = useState<any>()
  const [selectedPlot, setSelectedPlot] = useState<string>('Chr13_Ratio')
  useEffect(() => {
    getStatistics(userContext).then((response) => setStatistics(response))
  }, [])
  const onTabChange = (key: string) => {
    setSelectedPlot(key)
    console.log(buildData(selectedPlot, statistics))
  }
  const { TabPane } = Tabs
  return (
    <Card>
      <Tabs defaultActiveKey="1" onChange={onTabChange} type="card">
        {statistics?.box_plots.map((box) => (
          <TabPane tab={box} key={box}>
            {statistics && (
              <Plot
                data={buildData(selectedPlot, statistics)}
                layout={buildLayout(selectedPlot, statistics)}
              />
            )}
          </TabPane>
        ))}
      </Tabs>
    </Card>
  )
}
