import React, { useContext, useEffect, useState } from 'react'
import { Tabs, Card, InputNumber, Space, Typography } from 'antd'
import { getStatistics } from '../../services/StatinaApi'
import { UserContext } from '../../services/userContext'
import { StatisticsBoxPlot } from '../../components/StatisticsBoxPlot/StatisticsBoxPlot'
import { StatisticsScatterPlot } from '../../components/StatisticsScatterPlot/StatisticsScatterPlot'
import { Loading } from '../../components/Loading'
import { ErrorNotification } from 'services/helpers/helpers'

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
  }, [numberOfcases, userContext])

  const onTabChange = (key: string) => {
    setSelectedPlot(key)
  }

  const onNumberOfBatchesChange = (value: number) => {
    if (value > 9) {
      setNumberOfcases(value)
      getStatistics(userContext, value)
        .then((response) => {
          setStatistics(response)
          setIsLoading(false)
          if (value > response.batch_ids.length) {
            setShowTotal(true)
          } else setShowTotal(false)
        })
        .catch(() => setIsLoading(false))
    } else {
      ErrorNotification({
        type: 'error',
        message: 'Please insert a value above 10',
      })
    }
  }

  const onPressEnter = (value) => {
    const num = parseInt(value.target.value)
    isNaN(num)
      ? (onNumberOfBatchesChange(20),
        ErrorNotification({
          type: 'error',
          message: 'Please insert a number above 10',
        }))
      : onNumberOfBatchesChange(num)
  }

  return isLoading ? (
    <Loading />
  ) : (
    <Card>
      <Tabs
        defaultActiveKey={defaultTabKey.toString()}
        onChange={onTabChange}
        type="card"
        items={[
          ...(statistics?.box_plots ?? []).map((box) => ({
            key: box,
            label: box,
            children:
              statistics && selectedPlot ? (
                <StatisticsBoxPlot
                  selectedPlot={selectedPlot}
                  statistics={statistics}
                  showTotal={showTotal}
                />
              ) : null,
          })),
          ...(statistics?.scatter_plots ?? []).map((scatter) => ({
            key: scatter,
            label: scatter,
            children:
              statistics && selectedPlot ? (
                <StatisticsScatterPlot
                  selectedPlot={selectedPlot}
                  statistics={statistics}
                  showTotal={showTotal}
                />
              ) : null,
          })),
        ]}
      />
      <Space align="center" style={{ marginTop: '30px' }}>
        <Typography.Text>Number of batches</Typography.Text>
        <InputNumber
          value={numberOfcases}
          step={10}
          min={10}
          onStep={onNumberOfBatchesChange}
          onPressEnter={onPressEnter}
          autoFocus={true}
        />
      </Space>
    </Card>
  )
}
