import React, { useContext, useEffect, useState } from 'react'
import { Tabs, Card } from 'antd'
import { getStatistics } from '../../services/StatinaApi'
import { UserContext } from '../../services/userContext'
import { StatisticsBoxPlot } from '../../components/StatisticsBoxPlot/StatisticsBoxPlot'
import { StatisticsScatterPlot } from '../../components/StatisticsScatterPlot/StatisticsScatterPlot'

export function StatisticsPage() {
  const userContext = useContext(UserContext)
  const [statistics, setStatistics] = useState<any>()
  const [selectedPlot, setSelectedPlot] = useState<string | undefined>()
  const defaultTabKey = 0
  useEffect(() => {
    getStatistics(userContext).then((response) => {
      setStatistics(response)
      setSelectedPlot(response.box_plots[defaultTabKey])
    })
  }, [])
  const onTabChange = (key: string) => {
    setSelectedPlot(key)
  }
  const { TabPane } = Tabs
  return (
    <Card>
      <Tabs defaultActiveKey={defaultTabKey.toString()} onChange={onTabChange} type="card">
        {statistics?.box_plots.map((box) => (
          <TabPane tab={box} key={box}>
            {statistics && selectedPlot && (
              <StatisticsBoxPlot selectedPlot={selectedPlot} statistics={statistics} />
            )}
          </TabPane>
        ))}
        {statistics?.scatter_plots.map((scatter) => (
          <TabPane tab={scatter} key={scatter}>
            {statistics && selectedPlot && (
              <StatisticsScatterPlot selectedPlot={selectedPlot} statistics={statistics} />
            )}
          </TabPane>
        ))}
      </Tabs>
    </Card>
  )
}
