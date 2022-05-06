import React, { useContext, useEffect, useState } from 'react'
import { UserContext } from '../../services/userContext'
import { getDatasets } from 'services/StatinaApi'
import { Link } from 'react-router-dom'
import { Input, Table, Tooltip, Typography } from 'antd'
import { escapeRegExp } from 'services/helpers/helpers'
import { ErrorPage } from 'pages/Error/ErrorPage'
import { Loading } from 'components/Loading'

export const Datasets = () => {
  const userContext = useContext(UserContext)
  const [filteredDatasets, setFilteredDatasets] = useState<any>([])
  const [datasetsCount, setDatasetsCount] = useState(0)
  const [error, setError] = useState<any>()
  const [isLoading, setIsLoading] = React.useState<boolean>(true)
  const { Text } = Typography
  const { Search } = Input
  const searchValue = ''

  useEffect(() => {
    getDatasets(userContext, searchValue)
      .then((response) => {
        setFilteredDatasets(response?.documents), setDatasetsCount(response?.document_count)
        setIsLoading(false)
      })
      .catch((error) => {
        setIsLoading(false), setError(error)
      })
  }, [])

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
      fixed: 'left',
      sorter: (a, b) => a.name.length - b.name.length,
      render: (name: any) => <Link to={`datasets/${name}`}>{name}</Link>,
      width: 150,
    },
    {
      title: <Tooltip title="Fetal fraction X0">FFX0</Tooltip>,
      dataIndex: 'fetal_fraction_X0',
      key: 'fetal_fraction_X0',
      sorter: (a, b) => a.fetal_fraction_X0 - b.fetal_fraction_X0,
      width: 70,
    },
    {
      title: <Tooltip title="Fetal fraction XXX">FFXXX</Tooltip>,
      dataIndex: 'fetal_fraction_XXX',
      key: 'fetal_fraction_XXX',
      sorter: (a, b) => a.fetal_fraction_XXX - b.fetal_fraction_XXX,
      width: 70,
    },
    {
      title: <Tooltip title="Fetal fraction preface">FFPR</Tooltip>,
      dataIndex: 'fetal_fraction_preface',
      key: 'fetal_fraction_preface',
      sorter: (a, b) => a.fetal_fraction_preface - b.fetal_fraction_preface,
      width: 70,
    },
    {
      title: <Tooltip title="Fetal fraction y for trisomy">FFY for trisomy</Tooltip>,
      dataIndex: 'fetal_fraction_y_for_trisomy',
      key: 'fetal_fraction_y_for_trisomy',
      sorter: (a, b) => a.fetal_fraction_y_for_trisomy - b.fetal_fraction_y_for_trisomy,
      width: 140,
    },
    {
      title: <Tooltip title="Fetal fraction y max">FFY max</Tooltip>,
      dataIndex: 'fetal_fraction_y_max',
      key: 'fetal_fraction_y_max',
      sorter: (a, b) => a.fetal_fraction_y_max - b.fetal_fraction_y_max,
      width: 100,
    },
    {
      title: <Tooltip title="Fetal fraction y min">FFY min</Tooltip>,
      dataIndex: 'fetal_fraction_y_min',
      key: 'fetal_fraction_y_min',
      sorter: (a, b) => a.fetal_fraction_y_min - b.fetal_fraction_y_min,
      width: 90,
    },
    {
      title: 'K lower',
      dataIndex: 'k_lower',
      key: 'k_lower',
      sorter: (a, b) => a.k_lower - b.k_lower,
      width: 90,
    },
    {
      title: 'K upper',
      dataIndex: 'k_upper',
      key: 'k_upper',
      sorter: (a, b) => a.k_upper - b.k_upper,
      width: 90,
    },
    {
      title: 'M lower',
      dataIndex: 'm_lower',
      key: 'm_lower',
      sorter: (a, b) => a.m_lower - b.m_lower,
      width: 90,
    },
    {
      title: 'M upper',
      dataIndex: 'm_upper',
      key: 'm_upper',
      sorter: (a, b) => a.m_upper - b.m_upper,
      width: 90,
    },
    {
      title: 'Trisomy hard max',
      dataIndex: 'trisomy_hard_max',
      key: 'trisomy_hard_max',
      sorter: (a, b) => a.trisomy_hard_max - b.trisomy_hard_max,
      width: 150,
    },
    {
      title: 'Trisomy hard min',
      dataIndex: 'trisomy_hard_min',
      key: 'trisomy_hard_min',
      sorter: (a, b) => a.trisomy_hard_min - b.trisomy_hard_min,
      width: 150,
    },
    {
      title: 'Trisomy soft max',
      dataIndex: 'trisomy_soft_max',
      key: 'trisomy_soft_max',
      sorter: (a, b) => a.trisomy_soft_max - b.trisomy_soft_max,
      width: 150,
    },
    {
      title: 'Y axis max',
      dataIndex: 'y_axis_max',
      key: 'y_axis_max',
      sorter: (a, b) => a.y_axis_max - b.y_axis_max,
      width: 110,
    },
    {
      title: 'Y axis min',
      dataIndex: 'y_axis_min',
      key: 'y_axis_min',
      sorter: (a, b) => a.y_axis_min - b.y_axis_min,
      width: 110,
    },
    {
      title: 'Comment',
      dataIndex: 'comment',
      key: 'comment',
    },
  ]
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
            scroll={{ x: 2000 }}
            pagination={false}
            showSorterTooltip={false}
          />
        </>
      )}
      {error && <ErrorPage error={error} />}
    </>
  )
}
