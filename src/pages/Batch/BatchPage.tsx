import React, { useContext, useEffect, useState } from 'react'
import { Card, Tabs, Row, Col, Typography, Input } from 'antd'
import { useLocation } from 'react-router-dom'
import { SamplesTable } from '../../components/SamplesTable/SamplesTable'
import { ZscoreGraph } from '../../components/ZscoreGraph/ZscoreGraph'
import { BatchTablePDF } from '../../components/ExportPDF/BatchTablePDF'
import { editBatchComment, getBatch, getBatchSamples } from '../../services/StatinaApi'
import { UserContext } from '../../services/userContext'
import { FetalFractionXY } from '../../components/FetalFractionXYGraph/FetalFractionXY'
import { SuccessNotification } from '../../services/helpers/helpers'
import { Batch } from '../../services/interfaces'

const { TabPane } = Tabs
const { Title, Text } = Typography
const { TextArea } = Input

export const BatchPage = () => {
  const userContext = useContext(UserContext)
  const [samples, setSamples] = useState<any[]>([])
  const [samplesCount, setSamplesCount] = useState<number>(0)
  const [batch, setBatch] = useState<Batch | null>()
  const { pathname } = useLocation()
  const batchId = pathname.substring(pathname.lastIndexOf('/') + 1, pathname.length)
  const pageSize = 10
  const pageNum = 0

  useEffect(() => {
    if (batchId) {
      getBatchSamples(userContext, batchId, pageSize, pageNum).then((samples) => {
        setSamples(samples.documents), setSamplesCount(samples?.document_count)
      })
      getBatch(batchId, userContext).then((batch) => {
        setBatch(batch)
        console.log(batch)
      })
    }
  }, [batchId])

  const updateComment = (e) => {
    editBatchComment(batchId, `comment=${e?.target?.value}`, userContext).then((response) => {
      SuccessNotification({
        type: 'success',
        message: 'Comment updated',
      })
    })
  }

  return (
    <Card>
      <div id="hiddenDiv" style={{ display: 'none' }}></div>
      <Row justify={'space-between'}>
        <Col style={{ marginBottom: 15 }}>
          <Title>{batchId}</Title>
          <Text>Sequencing date: {batch?.sequencing_date}</Text>
        </Col>
        <Col>
          <BatchTablePDF batchId={batchId} />
        </Col>
      </Row>
      <Row>
        {batch && (
          <p>
            <Text italic type="secondary">
              Comment - press enter to save
            </Text>
            <TextArea onPressEnter={updateComment} defaultValue={batch?.comment} />
          </p>
        )}
      </Row>
      <Tabs type="card">
        <TabPane tab="Summary Table" key="1">
          <SamplesTable
            samples={samples}
            samplesCount={samplesCount}
            batchId={batchId}
            showBatchInfo
          />
        </TabPane>
        <TabPane tab="Zscore 13" key="Zscore_13">
          <ZscoreGraph batchId={batchId} chromosome={13} />
        </TabPane>
        <TabPane tab="Zscore 18" key="Zscore_18">
          <ZscoreGraph batchId={batchId} chromosome={18} />
        </TabPane>
        <TabPane tab="Zscore 21" key="Zscore_21">
          <ZscoreGraph batchId={batchId} chromosome={21} />
        </TabPane>
        <TabPane tab="Fetal Fraction X/Y" key="Fetal_Fraction_X/Y">
          <FetalFractionXY batchId={batchId} chromosome={21} />
        </TabPane>
      </Tabs>
    </Card>
  )
}
