import { Button, Select, Space, Table } from 'antd';
import React, { useEffect, useState } from 'react';

const { Option } = Select;

function handleChange(value) {
  console.log(`selected ${value}`);
}

function handleSave(value) {
  console.log(value);
}

const columns = [
  {
    title: 'Chromosome abnormality',
    dataIndex: 'chrom_abnorm',
    key: 'chrom_abnorm',
  },
  {
    title: 'Status',
    dataIndex: 'Status',
    key: 'Status',
    render: (chrom_abnorm: any) => (
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
    dataIndex: 'latest_change',
    key: 'latest_change',
  },
];

export default function SampleStatusTable(ChromosomeAbn) {
  const [chromosomeAbn, setChromosomeAbn] = useState(
    ChromosomeAbn.ChromosomeAbn[0]
  );
  const [abn, setAbn] = useState();

  useEffect(() => {
    setAbn(chromosomeAbn.chrom_abnorm.map((abn) => ({ chrom_abnorm: abn })));
  }, []);
  return (
    <>
      <Space size={'large'} direction="vertical" style={{ width: '100%' }}>
        <Table
          columns={columns}
          dataSource={abn}
          rowKey="chrom_abnorm"
          pagination={false}
          bordered={true}
        />
        <Button type="primary" size={'large'} onClick={handleSave}>
          Save
        </Button>
      </Space>
    </>
  );
}
