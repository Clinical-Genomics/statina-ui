import React from 'react';
import { Table } from 'antd';
import { sortDate } from '../../services/helpers/helpers';

type Props = {
  batches: any[];
};

export const BatchesTable = ({ batches }: Props) => {
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
    <div>
      <Table columns={columns} dataSource={batches} rowKey="SampleProject" />
    </div>
  );
};
