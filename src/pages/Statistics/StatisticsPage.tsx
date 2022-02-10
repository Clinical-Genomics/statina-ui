import React, { useContext, useEffect, useState } from 'react'
import { Tabs, Card, InputNumber } from 'antd'
import { getStatistics } from '../../services/StatinaApi'
import { UserContext } from '../../services/userContext'
import { StatisticsBoxPlot } from '../../components/StatisticsBoxPlot/StatisticsBoxPlot'
import { StatisticsScatterPlot } from '../../components/StatisticsScatterPlot/StatisticsScatterPlot'
import { Loading } from '../../components/Loading'

const { TabPane } = Tabs

export function StatisticsPage() {
  const userContext = useContext(UserContext)
  const [statistics, setStatistics] = useState<any>()
  const [selectedPlot, setSelectedPlot] = useState<string | undefined>()
  const [isLoading, setIsLoading] = React.useState<boolean>(true)
  const [numberOfcases, setNumberOfcases] = useState<number>(20)
  const [showTotal, setShowTotal] = useState<boolean>(false)
  const defaultTabKey = 0

  useEffect(() => {
    getStatistics(userContext, numberOfcases)
      .then((response) => {
        setStatistics(response)
        setSelectedPlot(response.box_plots[defaultTabKey])
        setIsLoading(false)
      })
      .catch(() => setIsLoading(false))
  }, [])

  const onTabChange = (key: string) => {
    setSelectedPlot(key)
  }

  const onNumberOfBatchesChange = (value: number) => {
    if (value !== null) {
      setNumberOfcases(value)
      getStatistics(userContext, value)
        .then((response) => {
          setStatistics(response)
          setIsLoading(false)
          if (value > response.batch_ids.length) {
            setShowTotal(true)
            setNumberOfcases(response.batch_ids.length)
          } else setShowTotal(false)
        })
        .catch(() => setIsLoading(false))
    }
  }

  return isLoading ? (
    <Loading />
  ) : (
    <Card>
      <Tabs defaultActiveKey={defaultTabKey.toString()} onChange={onTabChange} type="card">
        {statistics?.box_plots.map((box) => (
          <TabPane tab={box} key={box}>
            {statistics && selectedPlot && (
              <StatisticsBoxPlot
                selectedPlot={selectedPlot}
                statistics={statistics}
                showTotal={showTotal}
              />
            )}
          </TabPane>
        ))}
        {statistics?.scatter_plots.map((scatter) => (
          <TabPane tab={scatter} key={scatter}>
            {statistics && selectedPlot && (
              <StatisticsScatterPlot
                selectedPlot={selectedPlot}
                statistics={statistics}
                showTotal={showTotal}
              />
            )}
          </TabPane>
        ))}
      </Tabs>
      <InputNumber
        addonBefore="Number of batches"
        value={numberOfcases}
        step={10}
        onChange={onNumberOfBatchesChange}
        min={10}
        style={{ marginTop: '30px' }}
        autoFocus={true}
      />
    </Card>
  )
}
