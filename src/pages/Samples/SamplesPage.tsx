import React, { useEffect, useState } from 'react';
import { Card } from 'antd';
import { BatchesTable } from '../../components/BatchesTable/BatchesTable';
import { mockBatches } from '../../mocks/batches';
import { Batch } from '../../services/interfaces';

export const SamplesPage = () => {
  const [batches, setBatches] = useState<Batch[]>([]);
  useEffect(() => {
    //    getBatches().then((response) => setBatches(response.batches));
    setBatches(mockBatches);
  }, []);
  return (
    <Card>
      <BatchesTable batches={batches}></BatchesTable>
    </Card>
  );
};
