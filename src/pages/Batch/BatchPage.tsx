import React, { useContext, useEffect, useState } from 'react'
import { Card, Tabs, Row, Col, Typography } from 'antd'
import { useLocation } from 'react-router-dom'
import { ZscoreGraph } from '../../components/ZscoreGraph/ZscoreGraph'
import { BatchTablePDF } from '../../components/ExportPDF/BatchTablePDF'
import { editBatchComment, getBatch } from '../../services/StatinaApi'
import { UserContext } from '../../services/userContext'
import { SuccessNotification } from '../../services/helpers/helpers'
import { Batch } from '../../services/interfaces'
import { FetalFractionXY } from '../../components/FetalFractionXYGraph/FetalFractionXY'
import { FetalFractionPreface } from '../../components/FetalFractionPrefaceGraph/FetalFractionPreface'
import { ChromosomesRatioPlot } from '../../components/ChromosomesRatioPlot/ChromosomesRatioPlot'
import { Loading } from '../../components/Loading'
import styles from './BatchPage.module.css'
import { SamplesTable } from 'components/SamplesTable/SamplesTable'
import { BatchDownloadFile } from '../../components/ExportPDF/BatchDownloadFiles'
import { batchDownloadFileTypes } from '../../services/helpers/constants'
import Paragraph from 'antd/es/typography/Paragraph'

const { TabPane } = Tabs
const { Title, Text } = Typography

export const BatchPage = () => {
  const userContext = useContext(UserContext)
  const [batch, setBatch] = useState<Batch | null>()
  const { pathname } = useLocation()
  const batchId = pathname.substring(pathname.lastIndexOf('/') + 1, pathname.length)
  const [isLoading, setIsLoading] = React.useState<boolean>(true)

  useEffect(() => {
    getBatch(batchId, userContext)
      .then((batch) => {
        setBatch(batch)
        setIsLoading(false)
      })
      .catch(() => {
        setIsLoading(false)
      })
  }, [batchId])

  const updateComment = (e) => {
    editBatchComment(batchId, `comment=${e ? e : ' '}`, userContext).then(() => {
      getBatch(batchId, userContext).then((batch) => {
        setBatch(batch)
      })
      SuccessNotification({
        type: 'success',
        message: 'Comment updated',
      })
    })
  }

  return isLoading ? (
    <Loading />
  ) : (
    <Card className={styles.card}>
      <Row justify={'space-between'}>
        <Col style={{ marginBottom: 15 }}>
          <Title>{batchId}</Title>
          <Text>Sequencing date: {batch?.sequencing_date}</Text>
        </Col>
        <Col>
          <div className={styles.downloadButtons}>
            <BatchTablePDF batchId={batchId} />
            {batchDownloadFileTypes.map((type) => (
              <BatchDownloadFile batchId={batchId} fileType={type} key={type.name} />
            ))}
          </div>
        </Col>
      </Row>
      <Row>
        <div>
          <Paragraph
            editable={{
              onChange: updateComment,
              tooltip: false,
            }}
          >
            Comment: {batch?.comment}
          </Paragraph>
        </div>
      </Row>
      <Tabs type="card">
        <TabPane tab="Summary Table" key="1">
          <SamplesTable batchId={batchId} />
        </TabPane>
        <TabPane tab="Zscore 13" key="Zscore_13" className={styles.tab}>
          <ZscoreGraph batchId={batchId} chromosome={13} />
        </TabPane>
        <TabPane tab="Zscore 18" key="Zscore_18" className={styles.tab}>
          <ZscoreGraph batchId={batchId} chromosome={18} />
        </TabPane>
        <TabPane tab="Zscore 21" key="Zscore_21" className={styles.tab}>
          <ZscoreGraph batchId={batchId} chromosome={21} />
        </TabPane>
        <TabPane tab="Fetal Fraction Preface" key="Fetal_Fraction_Preface" className={styles.tab}>
          <FetalFractionPreface batchId={batchId} chromosome={21} />
        </TabPane>
        <TabPane tab="Fetal Fraction X/Y" key="Fetal_Fraction_X/Y" className={styles.tab}>
          <FetalFractionXY batchId={batchId} chromosome={21} />
        </TabPane>
        <TabPane tab="Ratio (Chromosomes 1-22)" key="ratio">
          <ChromosomesRatioPlot batchId={batchId} />
        </TabPane>
      </Tabs>
    </Card>
  )
}
