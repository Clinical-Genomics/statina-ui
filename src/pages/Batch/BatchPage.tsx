import React, { useContext, useEffect, useState } from 'react'
import { Card, Tabs, Row, Menu, Col, Dropdown } from 'antd'
import { useLocation } from 'react-router-dom'
import { SamplesTable } from '../../components/SamplesTable/SamplesTable'
import { ZscoreGraph } from '../../components/ZscoreGraph/ZscoreGraph'
import { BatchTablePDF } from '../../components/ExportPDF/BatchTablePDF'
import { getBatchSamples } from '../../services/StatinaApi'
import { UserContext } from '../../services/userContext'
import { FetalFractionXY } from '../../components/FetalFractionXYGraph/FetalFractionXY'

const { TabPane } = Tabs

export const BatchPage = () => {
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
        <BatchTablePDF batchId={batchId} chromosome={21} />
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
          <div id="hiddenDiv2">
            {/* if the div is hidden the image will be blank */}
            <FetalFractionXY batchId={batchId} chromosome={21} />
          </div>
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
