import React, { useContext, useEffect, useState } from 'react'
import { Tabs, Card, InputNumber, Space, Typography } from 'antd'
import { getStatistics } from '@/services/StatinaApi'
import { UserContext } from '@/services/userContext'
import { StatisticsBoxPlot } from '@/components/StatisticsBoxPlot/StatisticsBoxPlot'
import { StatisticsScatterPlot } from '@/components/StatisticsScatterPlot/StatisticsScatterPlot'
import { Loading } from '@/components/Loading'
import { ErrorNotification } from '@/services/helpers/helpers'

const statisticsTabLabels = {
  Chr13_Ratio: 'R13',
  Chr18_Ratio: 'R18',
  Chr21_Ratio: 'R21',
  Chr13_Ratio_uncorrected: 'R13_unc',
  Chr18_Ratio_uncorrected: 'R18_unc',
  Chr21_Ratio_uncorrected: 'R21_unc',
  FF_Formatted: 'FFPF',
  FFY: 'FFY',
  DuplicationRate: 'DR',
  MappedReads: 'MR',
  GC_Dropout: 'GCD',
  AT_Dropout: 'ATD',
  Bin2BinVariance: 'B2BV',
  Library_nM: 'Lib_nM',
  Stdev_13: 'SD13',
  Stdev_18: 'SD18',
  Stdev_21: 'SD21',
}

export function StatisticsPage() {
  const userContext = useContext(UserContext)
  const [statistics, setStatistics] = useState<any>()
  const [selectedPlot, setSelectedPlot] = useState<string | undefined>()
  const [isLoading, setIsLoading] = useState<boolean>(true)
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
            label: statisticsTabLabels[box] ?? box,
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
            label: statisticsTabLabels[scatter] ?? scatter,
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
