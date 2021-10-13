import { Button, Select, Space, Table } from 'antd';
import React, { useEffect, useState } from 'react';
import { sampleStatusTags } from 'services/helpers/constants';

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
    render: (chrom: any, sample) => (
      <Select
        defaultValue={sample.status || sampleStatusTags.normal.label}
        style={{ width: 120 }}
        onChange={handleChange}
      >
        {Object.keys(sampleStatusTags).map((status) => (
          <Option value={status} key={status}>
            {sampleStatusTags[status].label}
          </Option>
        ))}
      </Select>
    ),
  },
  {
    title: 'Latest change',
    dataIndex: 'latest_change',
    key: 'latest_change',
  },
];

export function SampleStatusTable(chromosomeAbn) {
  const [chrom_abnorm, setChromosomeAbn] = useState(
    chromosomeAbn.ChromosomeAbn[0]
  );
  const [abn, setAbn] = useState();

  useEffect(() => {
    setAbn(chrom_abnorm.chrom_abnorm.map((abn) => ({ chrom_abnorm: abn })));
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
