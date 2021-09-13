import React, { useEffect, useState } from 'react';
import { Input, Table } from 'antd';
import { sortDate } from '../../services/helpers/helpers';
import { Batch } from '../../services/interfaces';

type Props = {
  batches: Batch[];
};

const { Search } = Input;

export const BatchesTable = ({ batches }: Props) => {
  const [filteredBatches, setFilteredBatches] = useState<Batch[]>(batches);

  useEffect(() => {
    setFilteredBatches(batches);
  }, [batches]);

  const onSearch = (searchInput) => {
    const filteredData = batches.filter(
      (entry) =>
        entry.SampleProject.includes(searchInput) ||
        entry.Flowcell.includes(searchInput)
    );
    setFilteredBatches(filteredData);
  };

  const columns: any = [
    {
      title: 'Batch ID',
      dataIndex: 'SampleProject',
      key: 'SampleProject',
    },
    {
      title: 'Sequencing Date',
      dataIndex: 'SequencingDate',
      key: 'SequencingDate',
      sorter: (a, b) => sortDate(a.SequencingDate, b.SequencingDate),
    },
    {
      title: 'Flowcell ID',
      dataIndex: 'Flowcell',
      key: 'Flowcell',
    },
  ];

  return (
    <>
      <Search
        placeholder="Search by Batch or Flowcell ID"
        onSearch={onSearch}
        style={{ paddingBottom: 20 }}
      />
      <Table
        columns={columns}
        dataSource={filteredBatches}
        rowKey="SampleProject"
      />
    </>
  );
};
