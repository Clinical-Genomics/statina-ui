import React, { useEffect, useState } from 'react'
import { SamplesTable } from '../SamplesTable/SamplesTable'
import styles from '../../pages/Batch/BatchPage.module.css'
import { ZscoreGraph } from '../ZscoreGraph/ZscoreGraph'
import { FetalFractionPreface } from '../FetalFractionPrefaceGraph/FetalFractionPreface'
import { FetalFractionXY } from '../FetalFractionXYGraph/FetalFractionXY'
import { ChromosomesRatioPlot } from '../ChromosomesRatioPlot/ChromosomesRatioPlot'
import { Tabs } from 'antd'

export const BatchTabs = ({ batchId, dataset }) => {
  const [localDataset, setLocalDataset] = useState(dataset)
  useEffect(() => {
    setLocalDataset(dataset)
  }, [dataset])
  const { TabPane } = Tabs
  return (
    <Tabs type="card">
      {dataset && (
        <>
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
        </>
      )}
    </Tabs>
  )
}
