import React, { useEffect, useState } from 'react';
import { Col, Dropdown, Input, Menu, Row, Table } from 'antd';
import { sortDate } from 'services/helpers/helpers';
import { Batch } from 'services/interfaces';
import { Link } from 'react-router-dom';
import { ExportCSV } from 'components/ExportCSV/ExportCSV';
import { ExportPDF } from 'components/ExportPDF/ExportPDF';

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

  const downloadMenu = (
    <Menu style={{ width: 100, textAlign: 'center' }}>
      <Menu.Item key="excel">
        <ExportCSV csvData={batches} fileName={'Statina'} />
      </Menu.Item>
      <Menu.Item key="pdf">
        <ExportPDF pdfData={batches} />
      </Menu.Item>
    </Menu>
  );

  return (
    <>
      <Row justify="space-between" style={{ paddingBottom: 20 }}>
        <Col span={2}>
          <Dropdown.Button overlay={downloadMenu} type="primary">
            Download all batches
          </Dropdown.Button>
        </Col>
        <Col span={8}>
          <Search
            placeholder="Search by Batch or Flowcell ID"
            onSearch={onSearch}
          />
        </Col>
      </Row>
      <Table
        columns={columns}
        dataSource={filteredBatches}
        rowKey="SampleProject"
      />
    </>
  );
};
