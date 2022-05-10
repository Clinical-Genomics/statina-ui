import React, { useContext, useEffect, useState } from 'react'
import { UserContext } from '../../services/userContext'
import { deleteDataset, getDatasets, postDataset } from 'services/StatinaApi'
import { Link } from 'react-router-dom'
import { Input, Popover, Table, Tooltip, Typography, Form, Button, Popconfirm } from 'antd'
import { escapeRegExp, SuccessNotification } from 'services/helpers/helpers'
import { ErrorPage } from 'pages/Error/ErrorPage'
import { Loading } from 'components/Loading'
import { CopyTwoTone, DeleteTwoTone } from '@ant-design/icons'
import { Dataset } from '../../services/interfaces'

export const Datasets = () => {
  const userContext = useContext(UserContext)
  const { permissions } = userContext
  const [filteredDatasets, setFilteredDatasets] = useState<any>([])
  const [datasetsCount, setDatasetsCount] = useState(0)
  const [error, setError] = useState<any>()
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const { Text } = Typography
  const { Search } = Input
  const searchValue = ''

  useEffect(() => {
    getDatasetsList()
  }, [])

  const getDatasetsList = () => {
    getDatasets(userContext, searchValue)
      .then((response) => {
        setFilteredDatasets(response?.documents), setDatasetsCount(response?.document_count)
        setIsLoading(false)
      })
      .catch((error) => {
        setIsLoading(false), setError(error)
      })
  }

  const cloneDataset = (dataset: Dataset, { datasetName }) => {
    postDataset(datasetName, dataset, userContext).then(() => getDatasetsList())
  }

  const confirmDeleteDataset = (datasetName: string) => {
    deleteDataset(datasetName, userContext).then(() => {
      SuccessNotification({
        type: 'success',
        message: `${datasetName} deleted`,
      })
      getDatasetsList()
    })
  }

  const onSearch = (searchInput) => {
    const escapeInput = escapeRegExp(searchInput)
    getDatasets(userContext, escapeInput)
      .then((response) => {
        setFilteredDatasets(response?.documents), setDatasetsCount(response?.document_count)
        setIsLoading(false)
      })
      .catch((error) => {
        setIsLoading(false), setError(error)
      })
  }

  const columns: any = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      width: 150,
      sorter: (a, b) => a.name.length - b.name.length,
      render: (name: any) => <Link to={`datasets/${name}`}>{name}</Link>,
    },
    {
      title: <Tooltip title="Fetal fraction X0">FFX0</Tooltip>,
      dataIndex: 'fetal_fraction_X0',
      key: 'fetal_fraction_X0',
      sorter: (a, b) => a.fetal_fraction_X0 - b.fetal_fraction_X0,
    },
    {
      title: <Tooltip title="Fetal fraction XXX">FFXXX</Tooltip>,
      dataIndex: 'fetal_fraction_XXX',
      key: 'fetal_fraction_XXX',
      sorter: (a, b) => a.fetal_fraction_XXX - b.fetal_fraction_XXX,
    },
    {
      title: <Tooltip title="Fetal fraction preface">FFPR</Tooltip>,
      dataIndex: 'fetal_fraction_preface',
      key: 'fetal_fraction_preface',
      sorter: (a, b) => a.fetal_fraction_preface - b.fetal_fraction_preface,
    },
    {
      title: <Tooltip title="Fetal fraction y for trisomy">FFY tris</Tooltip>,
      dataIndex: 'fetal_fraction_y_for_trisomy',
      key: 'fetal_fraction_y_for_trisomy',
      sorter: (a, b) => a.fetal_fraction_y_for_trisomy - b.fetal_fraction_y_for_trisomy,
    },
    {
      title: <Tooltip title="Fetal fraction y max">FFY max</Tooltip>,
      dataIndex: 'fetal_fraction_y_max',
      key: 'fetal_fraction_y_max',
      sorter: (a, b) => a.fetal_fraction_y_max - b.fetal_fraction_y_max,
    },
    {
      title: <Tooltip title="Fetal fraction y min">FFY min</Tooltip>,
      dataIndex: 'fetal_fraction_y_min',
      key: 'fetal_fraction_y_min',
      sorter: (a, b) => a.fetal_fraction_y_min - b.fetal_fraction_y_min,
    },
    {
      title: 'K low',
      dataIndex: 'k_lower',
      key: 'k_lower',
      sorter: (a, b) => a.k_lower - b.k_lower,
    },
    {
      title: 'K up',
      dataIndex: 'k_upper',
      key: 'k_upper',
      sorter: (a, b) => a.k_upper - b.k_upper,
    },
    {
      title: 'M low',
      dataIndex: 'm_lower',
      key: 'm_lower',
      sorter: (a, b) => a.m_lower - b.m_lower,
    },
    {
      title: 'M up',
      dataIndex: 'm_upper',
      key: 'm_upper',
      sorter: (a, b) => a.m_upper - b.m_upper,
    },
    {
      title: 'Tris hard max',
      dataIndex: 'trisomy_hard_max',
      key: 'trisomy_hard_max',
      sorter: (a, b) => a.trisomy_hard_max - b.trisomy_hard_max,
    },
    {
      title: 'Tris hard min',
      dataIndex: 'trisomy_hard_min',
      key: 'trisomy_hard_min',
      sorter: (a, b) => a.trisomy_hard_min - b.trisomy_hard_min,
    },
    {
      title: 'Tris soft max',
      dataIndex: 'trisomy_soft_max',
      key: 'trisomy_soft_max',
      sorter: (a, b) => a.trisomy_soft_max - b.trisomy_soft_max,
    },
    {
      title: 'Y axis max',
      dataIndex: 'y_axis_max',
      key: 'y_axis_max',
      sorter: (a, b) => a.y_axis_max - b.y_axis_max,
    },
    {
      title: 'Y axis min',
      dataIndex: 'y_axis_min',
      key: 'y_axis_min',
      sorter: (a, b) => a.y_axis_min - b.y_axis_min,
    },
    {
      title: 'Comment',
      dataIndex: 'comment',
      key: 'comment',
      width: 110,
    },
    {
      title: 'Action',
      key: 'action',
      ellipsis: true,
      hidden: !permissions?.includes('RW'),
      render: (dataset) => (
        <div style={{ display: 'flex', justifyContent: 'space-evenly' }}>
          <Popover
            trigger="click"
            content={
              <Form name="cloneDataset" onFinish={(values) => cloneDataset(dataset, values)}>
                <Form.Item
                  label="Insert new dataset name:"
                  name="datasetName"
                  rules={[
                    {
                      required: true,
                      message: 'Please input the dataset name',
                    },
                  ]}
                >
                  <Input maxLength={20} />
                </Form.Item>
                <Button type="primary" htmlType="submit">
                  Clone dataset
                </Button>
              </Form>
            }
          >
            <CopyTwoTone style={{ fontSize: '20px' }} />
          </Popover>
          <Popconfirm
            title="Are you sure you want to delete this dataset? All the batches with this dataset will be set to 'default'"
            onConfirm={() => confirmDeleteDataset(dataset?.name)}
            okText="Yes"
            cancelText="No"
          >
            <DeleteTwoTone style={{ fontSize: '20px' }} />
          </Popconfirm>
        </div>
      ),
    },
  ].filter((column) => !column.hidden)

  return isLoading ? (
    <Loading />
  ) : (
    <>
      {!error && (
        <>
          <Search
            allowClear
            placeholder={`Search datasets`}
            onSearch={onSearch}
            style={{ paddingBottom: 20 }}
          />
          <Text type="secondary">
            {datasetsCount} result{filteredDatasets?.length > 1 ? `s` : null}
          </Text>
          <Table
            columns={columns}
            dataSource={filteredDatasets}
            rowKey={(record: any) => record.name}
            size="small"
            bordered
            pagination={false}
            showSorterTooltip={false}
          />
        </>
      )}
      {error && <ErrorPage error={error} />}
    </>
  )
}
