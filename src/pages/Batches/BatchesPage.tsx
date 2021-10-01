import React, { useEffect, useState } from 'react';
import { BatchesTable } from '../../components/BatchesTable/BatchesTable';
import { mockBatches } from '../../mocks/batches';
import { Batch } from '../../services/interfaces';
import { ExportCSV } from '../../components/ExportCSV/ExportCSV';
import { Space } from 'antd';

export const BatchesPage = () => {
  const [batches, setBatches] = useState<Batch[]>([]);
  useEffect(() => {
    //    getBatches().then((response) => setBatches(response.batches));
    setBatches(mockBatches);
  }, []);
  console.log(batches);
  return (
    <>
      <Space size="middle">
        <ExportCSV csvData={batches} fileName={'Statina_NIPT_Batches'} />
      </Space>
      <BatchesTable batches={batches}></BatchesTable>
    </>
  );
};
