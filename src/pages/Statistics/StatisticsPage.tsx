import React, { useContext, useEffect, useState } from 'react'
import { Tabs, Card, InputNumber } from 'antd'
import { getBatches, getStatistics } from '../../services/StatinaApi'
import { UserContext } from '../../services/userContext'
import { StatisticsBoxPlot } from '../../components/StatisticsBoxPlot/StatisticsBoxPlot'
import { StatisticsScatterPlot } from '../../components/StatisticsScatterPlot/StatisticsScatterPlot'
import { Loading } from '../../components/Loading'

export function StatisticsPage() {
  const userContext = useContext(UserContext)
  const [statistics, setStatistics] = useState<any>()
  const [selectedPlot, setSelectedPlot] = useState<string | undefined>()
  const [isLoading, setIsLoading] = React.useState<boolean>(true)
  const [numberOfcases, setNumberOfcases] = useState<number>(20)
  const [totalCount, setTotalCount] = useState<number>(numberOfcases)
  const defaultTabKey = 0

  useEffect(() => {
    getStatistics(userContext, numberOfcases)
      .then((response) => {
        setStatistics(response)
        setSelectedPlot(response.box_plots[defaultTabKey])
        setIsLoading(false)
      })
      .catch(() => setIsLoading(false))
    getBatches(userContext, 0, 0, '').then((response) => {
      setTotalCount(response.document_count)
    })
  }, [])
  const onTabChange = (key: string) => {
    setSelectedPlot(key)
  }

  const onNumberOfBatchesChange = (value: number) => {
    setNumberOfcases(value)
    getStatistics(userContext, value)
      .then((response) => {
        setStatistics(response)
        setSelectedPlot(response.box_plots[defaultTabKey])
        setIsLoading(false)
      })
      .catch(() => setIsLoading(false))
  }

  const { TabPane } = Tabs
  return isLoading ? (
    <Loading />
  ) : (
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
      <InputNumber
        addonBefore="Number of batches"
        defaultValue={numberOfcases}
        step={10}
        onChange={onNumberOfBatchesChange}
        max={totalCount}
        min={10}
        style={{ marginTop: '30px' }}
        autoFocus={true}
      />
    </Card>
  )
}
