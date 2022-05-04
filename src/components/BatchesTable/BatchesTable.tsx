import React, { useContext, useEffect, useState } from 'react'
import { UserContext } from '../../services/userContext'
import { deleteBatch, getBatches } from '../../services/StatinaApi'
import { Button, Col, Dropdown, Input, Menu, Row, Table, Typography, Popconfirm } from 'antd'
import { escapeRegExp, SuccessNotification } from 'services/helpers/helpers'
import { Batch } from 'services/interfaces'
import { Link } from 'react-router-dom'
import { ExportCSV } from 'components/ExportCSV/ExportCSV'
import { BatchesTablePDF } from 'components/ExportPDF/BatchesTablePDF'
import { DownOutlined, DeleteTwoTone } from '@ant-design/icons'
import { ErrorPage } from 'pages/Error/ErrorPage'

const { Search } = Input
const { Text } = Typography

export const BatchesTable = () => {
  const userContext = useContext(UserContext)
  const { permissions } = userContext
  const [filteredBatches, setFilteredBatches] = useState<Batch[]>([])
  const [pageCount, setPageCount] = useState(0)
  const [searchValue, setSearchValue] = useState('')
  const [currentPage, setCurrentPage] = useState(1)
  const [error, setError] = useState<any>()

  useEffect(() => {
    getBatches(userContext, 10, 0, searchValue)
      .then((batches) => {
        setFilteredBatches(batches?.documents), setPageCount(batches?.document_count)
      })
      .catch((error) => {
        setError(error)
      })
  }, [])

  const onSearch = (searchInput) => {
    const escapeInput = escapeRegExp(searchInput)
    setSearchValue(escapeInput)
    setCurrentPage(1)
    getBatches(userContext, 0, 0, escapeInput).then((batches) => {
      setFilteredBatches(batches?.documents), setPageCount(batches?.document_count)
    })
  }

  const onChange = (data) => {
    getBatches(userContext, data.pageSize, data.current, searchValue).then((batches) => {
      setFilteredBatches(batches?.documents), setPageCount(batches?.document_count)
      setCurrentPage(data.current)
    })
  }

  const showTotal = (total, range) => {
    return `${range[0]}-${range[1]} of ${total}`
  }

  const confirmDeleteBatch = ({ batch_id }) => {
    deleteBatch(batch_id, userContext).then(() => {
      SuccessNotification({
        type: 'success',
        message: `Batch ${batch_id} deleted`,
      })
      getBatches(userContext, 10, 0, searchValue).then((batches) => {
        setFilteredBatches(batches?.documents), setPageCount(batches?.document_count)
      })
    })
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
      dataIndex: 'sequencing_date',
      key: 'sequencing_date',
    },
    {
      title: 'Flowcell ID',
      dataIndex: 'flowcell',
      key: 'flowcell',
    },
    {
      title: 'Dataset',
      dataIndex: 'dataset',
      key: 'dataset',
    },
    {
      title: 'Delete Batch',
      key: 'delete_batch_id',
      hidden: !permissions?.includes('RW'),
      render: (batch_id: any) => (
        <Popconfirm
          title="Are you sure you want to delete this batch?"
          onConfirm={() => confirmDeleteBatch(batch_id)}
          okText="Yes"
          cancelText="No"
        >
          <DeleteTwoTone style={{ fontSize: '20px' }} />
        </Popconfirm>
      ),
    },
  ].filter((column) => !column.hidden)

  const downloadMenu = (
    <Menu style={{ width: 100, textAlign: 'center' }}>
      <Menu.Item key="excel">
        <ExportCSV fileName={'Statina'} searchValue={searchValue} />
      </Menu.Item>
      <Menu.Item key="pdf">
        <BatchesTablePDF searchValue={searchValue} />
      </Menu.Item>
    </Menu>
  )

  return (
    <>
      {!error && (
        <>
          <Row justify="space-between" style={{ paddingBottom: 20 }}>
            <Col span={2}>
              <Dropdown overlay={downloadMenu}>
                <Button type={'primary'}>
                  Download batches list <DownOutlined />
                </Button>
              </Dropdown>
            </Col>
            <Col span={8}>
              <Search placeholder="Search batches" onSearch={onSearch} allowClear />
            </Col>
          </Row>
          <Text type="secondary">
            {pageCount} result{filteredBatches?.length > 1 ? `s` : null}
          </Text>
          <Table
            columns={columns}
            dataSource={filteredBatches}
            rowKey="batch_id"
            bordered
            onChange={onChange}
            pagination={{
              total: pageCount,
              showTotal: showTotal,
              current: currentPage,
            }}
          />
        </>
      )}
      {error && <ErrorPage error={error} />}
    </>
  )
}
