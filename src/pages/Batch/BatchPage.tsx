import React, { useContext, useEffect, useState } from 'react'
import { Card, Tabs, Row, Col, Typography } from 'antd'
import { useLocation } from 'react-router-dom'
import { SamplesTable } from '../../components/SamplesTable/SamplesTable'
import { ZscoreGraph } from '../../components/ZscoreGraph/ZscoreGraph'
import { BatchTablePDF } from '../../components/ExportPDF/BatchTablePDF'
import { getBatch } from '../../services/StatinaApi'
import { UserContext } from '../../services/userContext'
import { FetalFractionXY } from '../../components/FetalFractionXYGraph/FetalFractionXY'
import { ChromosomesRatioPlot } from '../../components/ChromosomesRatioPlot/ChromosomesRatioPlot'

const { TabPane } = Tabs
const { Title, Text } = Typography

export const BatchPage = () => {
  const userContext = useContext(UserContext)
  const [sequencingDate, setSequencingDate] = useState('')
  const [comment, setComment] = useState('')
  const { pathname } = useLocation()
  const batchId = pathname.substring(pathname.lastIndexOf('/') + 1, pathname.length)

  useEffect(() => {
    getBatch(batchId, userContext).then((samples) => {
      setSequencingDate(samples.SequencingDate), setComment(samples.comment)
    })
  }, [batchId])

  console.log(sequencingDate)
  return (
    <Card>
      <div id="hiddenDiv" style={{ display: 'none' }}></div>
      <Row justify={'space-between'}>
        <Col style={{ marginBottom: 15 }}>
          <Title>Batch: {batchId}</Title>
          <Text type="secondary">Sequenced: {sequencingDate}</Text>
        </Col>
        <Col>
          <BatchTablePDF batchId={batchId} />
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
          <SamplesTable batchId={batchId} showBatchInfo />
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
        <TabPane tab="Ratio (Chromosomes 1-22)" key="ratio">
          <ChromosomesRatioPlot batchId={batchId} />
        </TabPane>
      </Tabs>
    </Card>
  )
}
