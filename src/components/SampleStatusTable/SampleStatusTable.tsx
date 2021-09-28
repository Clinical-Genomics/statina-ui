import { Select, Table } from 'antd';
import React from 'react';

const { Option } = Select;

const test: any = ['one', 'two', 'three', 'four'];

function handleChange(value) {
  console.log(`selected ${value}`);
}

const columns = [
  {
    title: 'Chromosome abnormality',
    dataIndex: 'ChromosomeAbn',
    key: 'test',
  },
  {
    title: 'Status',
    dataIndex: 'test',
    key: 'test',
    render: (SampleProject: any) => (
      <Select
        defaultValue="Normal"
        style={{ width: 120 }}
        onChange={handleChange}
      >
        <Option value="Normal">Normal</Option>
        <Option value="Suspected">Suspected</Option>
        <Option value="Probable">Probable</Option>
        <Option value="Verified">Verified</Option>
        <Option value="False Positive">False Positive</Option>
        <Option value="False Negative">False Negative</Option>
        <Option value="Other">Other</Option>
        <Option value="Failed">Failed</Option>
      </Select>
    ),
  },
  {
    title: 'Latest change',
    dataIndex: 'test',
    key: 'test',
  },
];

export default function SampleStatusTable(ChromosomeAbn) {
  return (
    <Table
      columns={columns}
      dataSource={test}
      rowKey="SampleProject"
      pagination={false}
      bordered={true}
    />
  );
}
