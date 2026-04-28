import React, { useContext, useEffect, useState } from 'react'
import { Tabs, Card, InputNumber, Space, Typography } from 'antd'
import { getStatistics } from '@/services/StatinaApi'
import { UserContext } from '@/services/userContext'
import { StatisticsBoxPlot } from '@/components/StatisticsBoxPlot/StatisticsBoxPlot'
import { StatisticsScatterPlot } from '@/components/StatisticsScatterPlot/StatisticsScatterPlot'
import { Loading } from '@/components/Loading'
import { ErrorNotification } from '@/services/helpers/helpers'

export function StatisticsPage() {
  const userContext = useContext(UserContext)
  const [statistics, setStatistics] = useState<any>()
  const [selectedPlot, setSelectedPlot] = useState<string | undefined>()
  const [isLoading, setIsLoading] = React.useState<boolean>(true)
  const [numberOfBatches, setNumberOfBatches] = useState<number>(20)
  const [showTotal, setShowTotal] = useState<boolean>(false)
  const defaultTabKey = 0

  useEffect(() => {
    let ignoreResponse = false

    getStatistics(userContext, numberOfBatches)
      .then((response) => {
        if (ignoreResponse) {
          return
        }

        setStatistics(response)
        setSelectedPlot((currentPlot) => currentPlot ?? response.box_plots[defaultTabKey])
        setShowTotal(numberOfBatches > response.batch_ids.length)
        setIsLoading(false)
      })
      .catch(() => {
        if (!ignoreResponse) {
          setIsLoading(false)
        }
      })

    return () => {
      ignoreResponse = true
    }
  }, [numberOfBatches, userContext])

  const onTabChange = (key: string) => {
    setSelectedPlot(key)
  }

  const onNumberOfBatchesChange = (value: number) => {
    if (value > 9) {
      setNumberOfBatches(value)
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
        activeKey={selectedPlot}
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
          value={numberOfBatches}
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
