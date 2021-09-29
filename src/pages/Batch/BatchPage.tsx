import React, { useEffect, useState } from 'react';
import { Tabs } from 'antd';
import { RouteComponentProps } from 'react-router-dom';
import { SamplesTable } from '../../components/SamplesTable/SamplesTable';
import { mockBatch } from '../../mocks/batches';

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
    <Tabs type="card">
      <TabPane tab="Summary Table" key="1">
        <SamplesTable samples={batch?.sample_info} showBatchInfo={false} />
      </TabPane>
      <TabPane tab="Zscore 13" key="2">
        Content of Tab Pane 2
      </TabPane>
      <TabPane tab="Zscore 18" key="3">
        Content of Tab Pane 3
      </TabPane>
      <TabPane tab="Zscore 21" key="4">
        Content of Tab Pane 3
      </TabPane>
    </Tabs>
  );
};
