import React from 'react';
import { Table } from 'antd';

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
    },
    {
      title: 'Flowcell ID',
      dataIndex: 'Flowcell',
      key: 'Flowcell',
    },
  ];

  return (
    <div>
      <Table
        columns={columns}
        dataSource={batches}
        pagination={false}
        rowKey="name"
      />
    </div>
  );
};
