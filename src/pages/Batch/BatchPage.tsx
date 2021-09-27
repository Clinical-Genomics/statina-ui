import React, { useEffect, useState } from 'react';
import { Card } from 'antd';
import { Batch } from '../../services/interfaces';
import { RouteComponentProps } from 'react-router-dom';
import { SamplesTable } from '../../components/SamplesTable/SamplesTable';
import { mockBatch } from '../../mocks/batches';

type BatchProps = RouteComponentProps & {
  batchId: string;
};

export const BatchPage = (props: BatchProps) => {
  const [batch, setBatch] = useState<any>([]);
  const [batchId] = useState<string>(props?.match?.params['batchId']);
  useEffect(() => {
    setBatch(mockBatch);
  }, []);
  return <SamplesTable samples={batch?.sample_info} showBatchInfo={false} />;
};
