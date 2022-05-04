import React, { useContext, useEffect, useState } from 'react'
import { UserContext } from '../../services/userContext'
import { getDatasets } from 'services/StatinaApi'
import { Link } from 'react-router-dom'
import { Input, Table, Typography } from 'antd'
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
      render: (name: any) => <Link to={`/${name}`}>{name}</Link>,
    },
    {
      title: 'fetal_fraction_X0',
      dataIndex: 'fetal_fraction_X0',
      key: 'fetal_fraction_X0',
      sorter: (a, b) => a.fetal_fraction_X0 - b.fetal_fraction_X0,
    },
    {
      title: 'fetal_fraction_XXX',
      dataIndex: 'fetal_fraction_XXX',
      key: 'fetal_fraction_XXX',
      sorter: (a, b) => a.fetal_fraction_XXX - b.fetal_fraction_XXX,
    },
    {
      title: 'fetal_fraction_preface',
      dataIndex: 'fetal_fraction_preface',
      key: 'fetal_fraction_preface',
      sorter: (a, b) => a.fetal_fraction_preface - b.fetal_fraction_preface,
    },
    {
      title: 'fetal_fraction_y_for_trisomy',
      dataIndex: 'fetal_fraction_y_for_trisomy',
      key: 'fetal_fraction_y_for_trisomy',
      sorter: (a, b) => a.fetal_fraction_y_for_trisomy - b.fetal_fraction_y_for_trisomy,
    },
    {
      title: 'fetal_fraction_y_max',
      dataIndex: 'fetal_fraction_y_max',
      key: 'fetal_fraction_y_max',
      sorter: (a, b) => a.fetal_fraction_y_max - b.fetal_fraction_y_max,
    },
    {
      title: 'fetal_fraction_y_min',
      dataIndex: 'fetal_fraction_y_min',
      key: 'fetal_fraction_y_min',
      sorter: (a, b) => a.fetal_fraction_y_min - b.fetal_fraction_y_min,
    },
    {
      title: 'k_lower',
      dataIndex: 'k_lower',
      key: 'k_lower',
      sorter: (a, b) => a.k_lower - b.k_lower,
    },
    {
      title: 'k_upper',
      dataIndex: 'k_upper',
      key: 'k_upper',
      sorter: (a, b) => a.k_upper - b.k_upper,
    },
    {
      title: 'm_lower',
      dataIndex: 'm_lower',
      key: 'm_lower',
      sorter: (a, b) => a.m_lower - b.m_lower,
    },
    {
      title: 'm_upper',
      dataIndex: 'm_upper',
      key: 'm_upper',
      sorter: (a, b) => a.m_upper - b.m_upper,
    },
    {
      title: 'trisomy_hard_max',
      dataIndex: 'trisomy_hard_max',
      key: 'trisomy_hard_max',
      sorter: (a, b) => a.trisomy_hard_max - b.trisomy_hard_max,
    },
    {
      title: 'trisomy_hard_min',
      dataIndex: 'trisomy_hard_min',
      key: 'trisomy_hard_min',
      sorter: (a, b) => a.trisomy_hard_min - b.trisomy_hard_min,
    },
    {
      title: 'trisomy_soft_max',
      dataIndex: 'trisomy_soft_max',
      key: 'trisomy_soft_max',
      sorter: (a, b) => a.trisomy_soft_max - b.trisomy_soft_max,
    },
    {
      title: 'y_axis_max',
      dataIndex: 'y_axis_max',
      key: 'y_axis_max',
      sorter: (a, b) => a.y_axis_max - b.y_axis_max,
    },
    {
      title: 'y_axis_min',
      dataIndex: 'y_axis_min',
      key: 'y_axis_min',
      sorter: (a, b) => a.y_axis_min - b.y_axis_min,
    },
    {
      title: 'comment',
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
            scroll={{ x: 3600 }}
            pagination={false}
          />
        </>
      )}
      {error && <ErrorPage error={error} />}
    </>
  )
}
