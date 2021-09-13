import React, { useEffect, useState } from 'react';
import { Input, Table } from 'antd';
import { sortDate } from '../../services/helpers/helpers';
import { Batch } from '../../services/interfaces';
import { Link } from 'react-router-dom';

type SamplesProps = {
  samples: Batch[];
};

const { Search } = Input;

export const SamplesTable = ({ samples }: SamplesProps) => {
  const [filteredSamples, setFilteredSamples] = useState<Batch[]>(samples);

  useEffect(() => {
    setFilteredSamples(samples);
  }, [samples]);

  const onSearch = (searchInput) => {
    const filteredData = samples.filter(
      (entry) =>
        entry.SampleProject.includes(searchInput) ||
        entry.Flowcell.includes(searchInput)
    );
    setFilteredSamples(filteredData);
  };

  const columns: any = [
    {
      title: 'Batch ID',
      dataIndex: 'SampleProject',
      key: 'SampleProject',
      render: (SampleProject: any) => (
        <Link to={`/samples/${SampleProject}`}>{SampleProject}</Link>
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
        dataSource={filteredSamples}
        rowKey="SampleProject"
      />
    </>
  );
};
