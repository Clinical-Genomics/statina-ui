import React, { useContext, useEffect, useState } from 'react'
import { UserContext } from '../../services/userContext'
import { getBatches, getBatchesByText } from '../../services/StatinaApi'
import { Col, Dropdown, Input, Menu, Row, Table, Typography } from 'antd'
import { escapeRegExp, sortDate } from 'services/helpers/helpers'
import { Batch } from 'services/interfaces'
import { Link } from 'react-router-dom'
import { ExportCSV } from 'components/ExportCSV/ExportCSV'
import { ExportPDF } from 'components/ExportPDF/ExportPDF'

type BatchesProps = {
  batches: Batch[]
  batchesCount: number
}

const { Search } = Input
const { Text } = Typography

export const BatchesTable = ({ batches, batchesCount }: BatchesProps) => {
  const userContext = useContext(UserContext)
  const [filteredBatches, setFilteredBatches] = useState<Batch[]>(batches)
  const [pageCount, setPageCount] = useState(batchesCount)
  const [searchValue, setSearchValue] = useState('')
  const [currentPage, setCurrentPage] = useState(1)

  useEffect(() => {
    getBatches(userContext, 10, 0).then((batches) => {
      setFilteredBatches(batches.documents), setPageCount(batches.document_count)
    })
  }, [batches])

  const onSearch = (searchInput) => {
    const escapInput = escapeRegExp(searchInput)
    setSearchValue(escapInput)
    setCurrentPage(1)
    getBatchesByText(userContext, 0, 0, escapInput).then((batches) => {
      setFilteredBatches(batches.documents), setPageCount(batches.document_count)
    })
  }

  const onChange = (data) => {
    getBatchesByText(userContext, data.pageSize, data.current, searchValue).then((batches) => {
      setFilteredBatches(batches.documents), setPageCount(batches.document_count)
      setCurrentPage(data.current)
    })
  }

  const showTotal = (total, range) => {
    return `${range[0]}-${range[1]} of ${total}`
  }

  const columns: any = [
    {
      title: 'Batch ID',
      dataIndex: 'batch_id',
      key: 'batch_id',
      render: (batch_id: any) => <Link to={`/batches/${batch_id}`}>{batch_id}</Link>,
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
  ]

  const downloadMenu = (
    <Menu style={{ width: 100, textAlign: 'center' }}>
      <Menu.Item key="excel">
        <ExportCSV fileName={'Statina'} />
      </Menu.Item>
      <Menu.Item key="pdf">
        <ExportPDF />
      </Menu.Item>
    </Menu>
  )

  return (
    <>
      <Row justify="space-between" style={{ paddingBottom: 20 }}>
        <Col span={2}>
          <Dropdown.Button overlay={downloadMenu} type="primary">
            Download all batches
          </Dropdown.Button>
        </Col>
        <Col span={8}>
          <Search placeholder="Search Batches" onSearch={onSearch} allowClear />
        </Col>
      </Row>
      <Text type="secondary">
        {pageCount} result{filteredBatches.length > 1 ? `s` : null}
      </Text>
      <Table
        columns={columns}
        dataSource={filteredBatches}
        rowKey="batch_id"
        onChange={onChange}
        pagination={{
          total: pageCount,
          showTotal: showTotal,
          current: currentPage,
        }}
      />
    </>
  )
}
