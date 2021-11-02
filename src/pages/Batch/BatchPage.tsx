import React, { useContext, useEffect, useRef, useState } from 'react'
import { Card, Tabs, Row, Menu, Col, Dropdown, Typography } from 'antd'
import { useLocation } from 'react-router-dom'
import { SamplesTable } from '../../components/SamplesTable/SamplesTable'
import { ZscoreGraph } from '../../components/ZscoreGraph/ZscoreGraph'
import { BatchTablePDF } from '../../components/ExportPDF/BatchTablePDF'
import { getBatch, getBatchSamples } from '../../services/StatinaApi'
import { UserContext } from '../../services/userContext'

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

  const downloadMenu = (
    <Menu style={{ width: 100, textAlign: 'center' }}>
      <Menu.Item key="pdf">
        <BatchTablePDF />
      </Menu.Item>
    </Menu>
  )
  return (
    <Card>
      <div id="hiddenDiv" style={{ display: 'none' }}></div>
      <Row justify={'space-between'}>
        <Col style={{ marginBottom: 15 }}>
          <Title>Batch: {batchId}</Title>
          <Text type="secondary">Sequenced: {sequencingDate}</Text>
        </Col>
        <Col>
          <Dropdown.Button overlay={downloadMenu} type="primary">
            Batch Downloads
          </Dropdown.Button>
        </Col>
      </Row>
      <Row>
        <Col>
          {comment && (
            <Card title="Comment" style={{ marginBottom: 30, marginTop: 15 }}>
              <Text>{comment}</Text>
            </Card>
          )}
        </Col>
      </Row>
      <Tabs type="card">
        <TabPane tab="Summary Table" key="1">
          <SamplesTable samples={samples} samplesCount={samplesCount} showBatchInfo />
        </TabPane>
        <TabPane tab="Zscore 13" key="Zscore_13">
          <ZscoreGraph samples={samples} score={'Zscore_13'} />
        </TabPane>
        <TabPane tab="Zscore 18" key="Zscore_18">
          <ZscoreGraph samples={samples} score={'Zscore_18'} />
        </TabPane>
        <TabPane tab="Zscore 21" key="Zscore_21">
          <ZscoreGraph samples={samples} score={'Zscore_21'} />
        </TabPane>
      </Tabs>
    </Card>
  )
}
