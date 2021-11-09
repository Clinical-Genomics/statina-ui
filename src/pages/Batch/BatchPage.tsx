import React, { useContext, useEffect, useState } from 'react'
import { Card, Tabs, Row, Menu, Col, Dropdown, Typography, Button } from 'antd'
import { useLocation } from 'react-router-dom'
import { SamplesTable } from '../../components/SamplesTable/SamplesTable'
import { ZscoreGraph } from '../../components/ZscoreGraph/ZscoreGraph'
import { BatchTablePDF } from '../../components/ExportPDF/BatchTablePDF'
import { getBatch, getBatchSamples } from '../../services/StatinaApi'
import { UserContext } from '../../services/userContext'
import { FetalFractionXY } from '../../components/FetalFractionXYGraph/FetalFractionXY'
import { CloudDownloadOutlined } from '@ant-design/icons'

const { TabPane } = Tabs
const { Title, Text } = Typography

export const BatchPage = () => {
  const userContext = useContext(UserContext)
  const [samples, setSamples] = useState<any[]>([])
  const [samplesCount, setSamplesCount] = useState<number>(0)
  const [sequencingDate, setSequencingDate] = useState('')
  const [comment, setComment] = useState('')
  const { pathname } = useLocation()
  const batchId = pathname.substring(pathname.lastIndexOf('/') + 1, pathname.length)
  const pageSize = 10
  const pageNum = 0

  useEffect(() => {
    if (batchId) {
      getBatchSamples(userContext, batchId, pageSize, pageNum).then((samples) => {
        setSamples(samples.documents), setSamplesCount(samples?.document_count)
      })
      getBatch(batchId, userContext).then((samples) => {
        setSequencingDate(samples.SequencingDate), setComment(samples.comment)
      })
    }
  }, [batchId])

  return (
    <Card>
      <div id="hiddenDiv" style={{ display: 'none' }}></div>
      <Row justify={'space-between'}>
        <Col style={{ marginBottom: 15 }}>
          <Title>Batch: {batchId}</Title>
          <Text type="secondary">Sequenced: {sequencingDate}</Text>
        </Col>
        <Col>
          <BatchTablePDF />
        </Col>
      </Row>
      <Row>
        <Col xl={24}>
          {comment && (
            <Card title="Comment" style={{ marginBottom: 30, marginTop: 15 }}>
              <Text>{comment}</Text>
            </Card>
          )}
        </Col>
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
