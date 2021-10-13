import React, { useEffect, useRef, useState } from 'react';
import { Card, Tabs } from 'antd';
import { RouteComponentProps } from 'react-router-dom';
import { SamplesTable } from '../../components/SamplesTable/SamplesTable';
import { mockBatch } from '../../mocks/batches';
import { ZscoreGraph } from '../../components/ZscoreGraph/ZscoreGraph';
import { BatchTablePDF } from '../../components/ExportPDF/BatchTablePDF';

type BatchProps = RouteComponentProps & {
  batchId: string;
};

const { TabPane } = Tabs;

export const BatchPage = (props: BatchProps) => {
  const [batch, setBatch] = useState<any>([]);
  const [batchId] = useState<string>(props?.match?.params['batchId']);
  useEffect(() => {
    setBatch(mockBatch);
  }, []);
  return (
    <Card>
      <BatchTablePDF pdfData={batch?.sample_info} />
      <Tabs type="card">
        <TabPane tab="Summary Table" key="1">
          <SamplesTable samples={batch?.sample_info} showBatchInfo={false} />
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
  );
};
