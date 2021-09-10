import React, { useEffect, useState } from 'react';
import { Card } from 'antd';
import { mockBatches } from '../../mocks/batches';
import { Batch } from '../../services/interfaces';
import { RouteComponentProps } from 'react-router-dom';

type BatchProps = RouteComponentProps & {
  batchId: string;
};

export const BatchPage = ({ batchId }: BatchProps) => {
  const [batch, setBatch] = useState<Batch[]>([]);
  useEffect(() => {
    //    getBatches().then((response) => setBatches(response.batches));
    setBatch(mockBatches);
  }, []);
  return <Card>A batch</Card>;
};
