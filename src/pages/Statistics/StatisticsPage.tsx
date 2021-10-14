import React from 'react'
import { Tabs } from 'antd'
import { plotTab, trace } from 'mocks/statistics'
import { BoxPlot } from 'components/BoxPlots/BoxPlot'

export function StatisticsPage() {
  function callback(key) {
    console.log(key)
  }
  const { TabPane } = Tabs
  return (
    <Tabs defaultActiveKey="1" onChange={callback} type="card">
      {plotTab.map((box) => (
        <TabPane tab={box} key={box}>
          <BoxPlot trace={trace} />
        </TabPane>
      ))}
    </Tabs>
  )
}
