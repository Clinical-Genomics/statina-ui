import React, { useEffect, useState } from 'react';
import { Input, Table } from 'antd';
import { sortDate } from '../../services/helpers/helpers';
import { Batch } from '../../services/interfaces';
import { Link } from 'react-router-dom';

type BatchesProps = {
  batches: Batch[];
};

const { Search } = Input;

export const BatchesTable = ({ batches }: BatchesProps) => {
  const [filteredBatches, setFilteredBatches] = useState<Batch[]>(batches);

  useEffect(() => {
    setFilteredBatches(batches);
  }, [batches]);

  const onSearch = (searchInput) => {
    const lowerCaseInput = searchInput.toLowerCase();
    const filteredData = batches.filter(
      (entry) =>
        entry.SampleProject.toLowerCase().includes(lowerCaseInput) ||
        entry.Flowcell.toLowerCase().includes(lowerCaseInput)
    );
    setFilteredBatches(filteredData);
  };

  const columns: any = [
    {
      title: 'Batch ID',
      dataIndex: 'SampleProject',
      key: 'SampleProject',
      render: (SampleProject: any) => (
        <Link to={`/batches/${SampleProject}`}>{SampleProject}</Link>
      ),
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
