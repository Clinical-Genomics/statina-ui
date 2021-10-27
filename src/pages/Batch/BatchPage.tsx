import React, { useContext, useEffect, useRef, useState } from 'react'
import { Card, Tabs, Row, Menu, Col, Dropdown } from 'antd'
import { useLocation } from 'react-router-dom'
import { SamplesTable } from '../../components/SamplesTable/SamplesTable'
import { ZscoreGraph } from '../../components/ZscoreGraph/ZscoreGraph'
import { BatchTablePDF } from '../../components/ExportPDF/BatchTablePDF'
import { getBatchSamples } from '../../services/StatinaApi'
import { UserContext } from '../../services/userContext'

const { TabPane } = Tabs

export const BatchPage = () => {
  const [batch, setBatch] = useState<any>([])
  const [samples, setSamples] = useState<any[]>([])
  const [samplesCount, setSamplesCount] = useState<number>(0)
  const pageSize = 10
  const pageNum = 0
  const userContext = useContext(UserContext)

  const { pathname } = useLocation()
  const batchId = pathname.substring(pathname.lastIndexOf('/') + 1, pathname.length)

  useEffect(() => {
    if (batchId)
      getBatchSamples(userContext, batchId, pageSize, pageNum).then((samples) => {
        setSamples(samples.documents), setSamplesCount(samples?.document_count)
      })
  }, [batchId])

  const downloadMenu = (
    <Menu style={{ width: 100, textAlign: 'center' }}>
      <Menu.Item key="pdf">
        <BatchTablePDF pdfData={batch?.sample_info} score={'Zscore_13'} />
      </Menu.Item>
    </Menu>
  )

  return (
    <Card>
      <div id="hiddenDiv" style={{ display: 'none' }}></div>
      <Row justify={'end'}>
        <Col>
          <Dropdown.Button overlay={downloadMenu} type="primary" style={{ paddingBottom: 20 }}>
            Batch Downloads
          </Dropdown.Button>
        </Col>
      </Row>
      <Tabs type="card">
        <TabPane tab="Summary Table" key="1">
          <SamplesTable samples={samples} samplesCount={samplesCount} showBatchInfo />
        </TabPane>
        <TabPane tab="Zscore 13" key="Zscore_13">
          <ZscoreGraph samples={batch?.sample_info} score={'Zscore_13'} />
        </TabPane>
        <TabPane tab="Zscore 18" key="Zscore_18">
          <ZscoreGraph samples={batch?.sample_info} score={'Zscore_18'} />
        </TabPane>
        <TabPane tab="Zscore 21" key="Zscore_21">
          <ZscoreGraph samples={batch?.sample_info} score={'Zscore_21'} />
        </TabPane>
        <TabPane tab="Fetal Fraction X/Y" key="Fetal_Fraction_X/Y">
          <ZscoreGraph samples={batch?.sample_info} score={'Zscore_21'} />
        </TabPane>
      </Tabs>
    </Card>
  )
}
