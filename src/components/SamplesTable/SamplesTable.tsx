import React, { useEffect, useState } from 'react';
import { Input, Table } from 'antd';
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
      title: 'Sample name',
      dataIndex: 'SampleID',
      key: 'SampleID',
      fixed: 'left',
      render: (SampleID: any) => (
        <Link to={`/samples/${SampleID}`}>{SampleID}</Link>
      ),
    },
    {
      title: 'Batch ID',
      dataIndex: 'SampleProject',
      key: 'SampleProject',
      fixed: 'left',
      render: (SampleProject: any) => (
        <Link to={`/batches/${SampleProject}`}>{SampleProject}</Link>
      ),
    },
    {
      title: 'Zscore 13',
      dataIndex: 'Zscore_13',
      key: 'Zscore_13',
    },
    {
      title: 'Zscore 18',
      dataIndex: 'Zscore_18',
      key: 'Zscore_18',
    },
    {
      title: 'Zscore 21',
      dataIndex: 'Zscore_21',
      key: 'Zscore_21',
    },
    {
      title: 'Zscore X',
      dataIndex: 'Zscore_X',
      key: 'Zscore_X',
    },
    {
      title: 'FF-PF (%)',
      dataIndex: 'FetalFractionPreface',
      key: 'FetalFractionPreface',
    },
    {
      title: 'FF-X (%)',
      dataIndex: 'FFX',
      key: 'FFX',
    },
    {
      title: 'FF-Y (%)',
      dataIndex: 'FFY',
      key: 'FFY',
    },
    {
      title: 'Sex',
      dataIndex: 'sex',
      key: 'sex',
    },
    {
      title: 'CNV Segment',
      dataIndex: 'CNVSegment',
      key: 'CNVSegment',
    },
    {
      title: 'Warning',
      dataIndex: 'text_warning',
      key: 'text_warning',
    },
    {
      title: 'QC Flag',
      dataIndex: 'QCFlag',
      key: 'QCFlag',
      width: 150,
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
    },
    {
      title: 'Download',
      dataIndex: '',
      key: 'segmental_calls',
    },
    {
      title: 'Include',
      dataIndex: 'include',
      key: 'include',
    },
    {
      title: 'Comment',
      dataIndex: 'comment',
      key: 'comment',
    },
    {
      title: 'Last changed',
      dataIndex: 'change_include_date',
      key: 'change_include_date',
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
        scroll={{ x: 2500 }}
      />
    </>
  );
};
