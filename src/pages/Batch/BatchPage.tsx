import React, { useEffect, useState } from 'react';
import { Card } from 'antd';
import { Batch } from '../../services/interfaces';
import { RouteComponentProps } from 'react-router-dom';

type BatchProps = RouteComponentProps & {
  batchId: string;
};

export const BatchPage = (props: BatchProps) => {
  const [batch, setBatch] = useState<Batch[]>([]);
  const [batchId] = useState<string>(props?.match?.params['batchId']);
  useEffect(() => {
    //    getBatch(batchId).then((response) => setBatch(response.batch));
  }, []);
  return <Card title={`Batch: ${batchId}`}>{batchId}</Card>;
};
