import React, { useContext, useEffect, useState } from 'react'
import { UserContext } from '../../services/userContext'
import {
  getSamples,
  includeSample,
  includeBatchSamples,
  downloadSeqmentalCalls,
  editSample,
} from '../../services/StatinaApi'
import { Input, Table, Tag, Tooltip, Typography } from 'antd'
import { Link } from 'react-router-dom'
import { CloudDownloadOutlined, QuestionCircleOutlined } from '@ant-design/icons'
import { red, gold } from '@ant-design/colors'
import { sampleStatusTags, sexTags, tagColors } from 'services/helpers/constants'
import { createFileDownload, escapeRegExp, SuccessNotification } from 'services/helpers/helpers'
import { Loading } from '../Loading'
import { ErrorPage } from 'pages/Error/ErrorPage'

type SamplesProps = {
  batchId?: any
}

const { Search } = Input
const { Text } = Typography
const { Paragraph } = Typography

export const SamplesTable = ({ batchId }: SamplesProps) => {
  const userContext = useContext(UserContext)
  const { permissions } = userContext
  const [filteredSamples, setFilteredSamples] = useState<any[]>([])
  const [selectedRowKeys, setSelectedRowKeys] = useState<any[]>([])
  const [pageCount, setPageCount] = useState(0)
  const [searchValue, setSearchValue] = useState('')
  const [currentPage, setCurrentPage] = useState(1)
  const [sortDirection, setSortDirection] = useState<'ascend' | 'descend'>('ascend')
  const [sortKey, setSortKey] = useState<string>('sample_id')
  const [isLoading, setIsLoading] = React.useState<boolean>(true)
  const [error, setError] = useState<any>()
  const pageSize = 100

  useEffect(() => {
    getSamples(userContext, pageSize, 0, batchId, searchValue, sortKey, sortDirection)
      .then((samples) => {
        setFilteredSamples(samples?.documents),
          setPageCount(samples?.document_count),
          includedSamples(samples?.documents)
        setIsLoading(false)
      })
      .catch((error) => {
        setIsLoading(false), setError(error)
      })
  }, [])

  const includedSamples = (samples) => {
    if (samples?.length > 0) {
      const selectedKey: string[] = []
      samples.forEach((sample) => {
        if (sample.included.include) {
          selectedKey.push(sample?.sample_id)
        }
      })
      setSelectedRowKeys(selectedKey)
    }
  }

  const onSearch = (searchInput) => {
    const escapeInput = escapeRegExp(searchInput)
    setSearchValue(escapeInput)
    setCurrentPage(1)
    getSamples(userContext, 0, 0, batchId, escapeInput, sortKey, sortDirection).then((samples) => {
      setFilteredSamples(samples.documents),
        setPageCount(samples.document_count),
        includedSamples(samples?.documents)
    })
  }

  const onTableChange = (data, filter, sorter) => {
    setSortDirection(sorter?.order)
    setSortKey(sorter?.column?.key)
    getSamples(
      userContext,
      data.pageSize,
      data.current,
      batchId,
      searchValue,
      sorter?.column?.key,
      sorter?.order
    ).then((samples) => {
      setFilteredSamples(samples.documents), setPageCount(samples.document_count)
      setCurrentPage(data.current), includedSamples(samples.documents)
    })
  }

  const showTotal = (total, range) => {
    return `${range[0]}-${range[1]} of ${total}`
  }

  const onSelectAll = (data) => {
    includeBatchSamples(batchId, userContext, data)
  }

  const rowSelection = {
    onChange: (selectedRowKeys) => {
      setSelectedRowKeys(selectedRowKeys)
    },
    selectedRowKeys,
  }

  const handleSelect = (record, selected) => {
    includeSample(record.sample_id, userContext, selected)
  }

  const downloadSC = (sample) => {
    downloadSeqmentalCalls(sample.sample_id, userContext).then((file) => {
      createFileDownload(file)
    })
  }

  const onCommentChange = ({ sample_id }, e) => {
    editSample(sample_id, `comment=${e ? e : ' '}`, 'comment', userContext).then(() => {
      SuccessNotification({
        type: 'success',
        message: 'Comment updated',
      })
      getSamples(
        userContext,
        pageSize,
        currentPage,
        batchId,
        searchValue,
        sortKey,
        sortDirection
      ).then((samples) => {
        setFilteredSamples(samples?.documents),
          setPageCount(samples?.document_count),
          includedSamples(samples?.documents)
        setIsLoading(false)
      })
    })
  }

  const columns: any = [
    {
      title: 'Sample',
      dataIndex: 'sample_id',
      key: 'sample_id',
      fixed: 'left',
      width: 127,
      defaultSortOrder: sortDirection,
      render: (sample_id: any) => <Link to={`/samples/${sample_id}`}>{sample_id}</Link>,
      sorter: true,
    },
    {
      title: 'Batch',
      dataIndex: 'batch_id',
      key: 'batch_id',
      fixed: 'left',
      width: 127,
      sorter: true,
      render: (batch_id: any) => <Link to={`/batches/${batch_id}`}>{batch_id}</Link>,
    },
    {
      title: 'Z_13',
      dataIndex: 'z_score',
      key: 'Zscore_13',
      width: 70,
      sorter: true,
      render(score, sample) {
        return {
          props: {
            style: {
              background:
                sample.warnings.z_score_13 === 'danger'
                  ? red[1]
                  : sample.warnings.z_score_13 === 'warning'
                  ? gold[1]
                  : null,
            },
          },
          children: <div>{score['13']}</div>,
        }
      },
    },
    {
      title: 'Z_18',
      dataIndex: 'z_score',
      key: 'Zscore_18',
      width: 70,
      sorter: true,
      render(score, sample) {
        return {
          props: {
            style: {
              background:
                sample.warnings.z_score_18 === 'danger'
                  ? red[1]
                  : sample.warnings.z_score_18 === 'warning'
                  ? gold[1]
                  : null,
            },
          },
          children: <div>{score['18']}</div>,
        }
      },
    },
    {
      title: 'Z_21',
      dataIndex: 'z_score',
      key: 'Zscore_21',
      sorter: true,
      width: 70,
      render(score, sample) {
        return {
          props: {
            style: {
              background:
                sample.warnings.z_score_21 === 'danger'
                  ? red[1]
                  : sample.warnings.z_score_21 === 'warning'
                  ? gold[1]
                  : null,
            },
          },
          children: <div>{score['21']}</div>,
        }
      },
    },
    {
      title: 'FFPF',
      dataIndex: 'fetal_fraction',
      key: 'FF_Formatted',
      sorter: true,
      width: 63,
      render(fetalFraction, sample) {
        return {
          props: {
            style: {
              background:
                sample.warnings.fetal_fraction_preface === 'danger'
                  ? red[1]
                  : sample.warnings.fetal_fraction_preface === 'warning'
                  ? gold[1]
                  : null,
            },
          },
          children: <div>{fetalFraction.preface}</div>,
        }
      },
    },
    {
      title: 'FFX',
      dataIndex: 'fetal_fraction',
      key: 'FFX',
      width: 63,
      sorter: true,
      render(fetalFraction, sample) {
        return {
          props: {
            style: {
              background: sample.text_warning.includes('fetal_fraction_x') ? red[1] : null,
            },
          },
          children: <div>{fetalFraction.x}</div>,
        }
      },
    },
    {
      title: 'FFY',
      dataIndex: 'fetal_fraction',
      key: 'FFY',
      width: 63,
      sorter: true,
      render(fetalFraction, sample) {
        return {
          props: {
            style: {
              background:
                sample.warnings.fetal_fraction_y === 'danger'
                  ? red[1]
                  : sample.warnings.fetal_fraction_y === 'warning'
                  ? gold[1]
                  : null,
            },
          },
          children: <div>{fetalFraction.y}</div>,
        }
      },
    },
    {
      title: 'Sex',
      dataIndex: 'sex',
      key: 'sex',
      width: 70,
      render: (sex: any) => <Tag color={sexTags[sex]}>{sex}</Tag>,
    },
    {
      title: (
        <Tooltip title="Warning for chomosome abnormality. Automatically generated. Based on pre defined z_score and Fetal Fraction trsholds">
          Warning
          <QuestionCircleOutlined />
        </Tooltip>
      ),
      width: 93,
      dataIndex: 'text_warning',
      key: 'text_warning',
      render: (warnings: any) => {
        return warnings.length > 0
          ? warnings.split(', ').map((warning) => (
              <Tag color={tagColors.warning} key={warning}>
                {warning}
              </Tag>
            ))
          : null
      },
    },
    {
      title: 'Comment',
      dataIndex: 'comment',
      key: 'comment',
      sorter: true,
      render: (comment: string, sample: any) =>
        permissions?.includes('RW') ? (
          <Paragraph
            editable={{
              onChange: (e) => onCommentChange(sample, e),
              tooltip: false,
            }}
          >
            {comment}
          </Paragraph>
        ) : (
          <p>{comment}</p>
        ),
    },
    {
      title: 'QC Flag',
      dataIndex: 'qc_flag',
      key: 'QCFlag',
      sorter: true,
    },
    {
      title: (
        <Tooltip title="Chomosome abnormalies. Manually classified by user through the sample page">
          Classification
          <QuestionCircleOutlined />
        </Tooltip>
      ),
      dataIndex: 'status',
      width: 120,
      key: 'status',
      render: (status: any) => {
        const abnormalStatusTags = Object.keys(status).filter(
          (chrom) => status[chrom].status !== 'Normal'
        )
        return abnormalStatusTags.length > 0
          ? abnormalStatusTags.map((chrom) => (
              <Tag color={sampleStatusTags[status[chrom].status.toLowerCase()]?.color} key={chrom}>
                {chrom} - {status[chrom].status}
              </Tag>
            ))
          : null
      },
    },
    {
      title: 'Segmental calls',
      dataIndex: '',
      key: 'segmental_calls',
      width: 120,
      render: (sample: any) => (
        <span
          onClick={() => downloadSC(sample)}
          style={{ cursor: 'pointer', border: 'none', color: '#16a4f2' }}
        >
          <CloudDownloadOutlined style={{ fontSize: '30px', marginLeft: '30%' }} />
        </span>
      ),
    },
    {
      title: 'Last changed',
      dataIndex: 'included',
      key: 'included',
      render: (included) => <div>{included.edited}</div>,
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
            placeholder={`Search samples`}
            onSearch={onSearch}
            style={{ paddingBottom: 20 }}
          />
          <Text type="secondary">
            {pageCount} result{filteredSamples?.length > 1 ? `s` : null}
          </Text>
          <br />
          <i>Select a sample with the checkbox to include it in the comparison set</i>
          <Table
            columns={columns.filter((column) => (!batchId ? column : column.key !== 'batch_id'))}
            dataSource={filteredSamples}
            rowKey="sample_id"
            size="small"
            bordered
            scroll={{ x: 1600, y: 600 }}
            rowSelection={{
              ...rowSelection,
              hideSelectAll: batchId ? false : true,
              onSelectAll: onSelectAll,
              onSelect: handleSelect,
            }}
            onChange={onTableChange}
            pagination={{
              total: pageCount,
              showTotal: showTotal,
              current: currentPage,
              pageSize: pageSize,
            }}
          />
        </>
      )}
      {error && <ErrorPage error={error} />}
    </>
  )
}
