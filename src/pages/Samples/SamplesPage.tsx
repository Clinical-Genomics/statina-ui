import React, { useEffect, useState } from 'react';
import { Card } from 'antd';
import { SamplesTable } from '../../components/SamplesTable/SamplesTable';
import { mockSamples } from '../../mocks/samples';

export const SamplesPage = () => {
  const [samples, setSamples] = useState<any[]>([]);
  useEffect(() => {
    //    getBatches().then((response) => setBatches(response.batches));
    setSamples(mockSamples);
  }, []);
  return (
    <Card>
      <SamplesTable samples={samples}></SamplesTable>
    </Card>
  );
};
