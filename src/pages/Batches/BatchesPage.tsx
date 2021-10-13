import React, { useEffect, useState } from 'react';
import { BatchesTable } from 'components/BatchesTable/BatchesTable';
import { mockBatches } from 'mocks/batches';
import { Batch } from 'services/interfaces';

export const BatchesPage = () => {
  const [batches, setBatches] = useState<Batch[]>([]);
  useEffect(() => {
    //    getBatches().then((response) => setBatches(response.batches));
    setBatches(mockBatches);
  }, []);
  return (
    <>
      <BatchesTable batches={batches}></BatchesTable>
    </>
  );
};
