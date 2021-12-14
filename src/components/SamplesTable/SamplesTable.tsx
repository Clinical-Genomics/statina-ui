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
import { red } from '@ant-design/colors'
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
  const [sortDirection, setSortDirection] = useState<'ascend' | 'descend'>()
  const [sortKey, setSortKey] = useState<'sample_id' | 'batch_id'>()
  const [isLoading, setIsLoading] = React.useState<boolean>(true)
  const [error, setError] = useState<any>()

  useEffect(() => {
    getSamples(userContext, 10, 0, batchId, searchValue, sortKey, sortDirection)
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
    console.log(sorter)
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
      getSamples(userContext, 10, currentPage, batchId, searchValue, sortKey, sortDirection).then(
        (samples) => {
          setFilteredSamples(samples?.documents),
            setPageCount(samples?.document_count),
            includedSamples(samples?.documents)
          setIsLoading(false)
        }
      )
    })
  }

  const columns: any = [
    {
      title: 'Sample name',
      dataIndex: 'sample_id',
      key: 'sample_id',
      fixed: 'left',
      render: (sample_id: any) => <Link to={`/samples/${sample_id}`}>{sample_id}</Link>,
      sorter: true,
    },
    {
      title: 'Batch ID',
      dataIndex: 'batch_id',
      key: 'batch_id',
      fixed: 'left',
      sorter: true,
      render: (batch_id: any) => <Link to={`/batches/${batch_id}`}>{batch_id}</Link>,
    },
    {
      title: 'z_score 13',
      dataIndex: 'z_score',
      key: 'Zscore_13',
      width: 100,
      sorter: true,
      render(score, sample) {
        return {
          props: {
            style: {
              background: sample.text_warning.includes('z_score_13') ? red[1] : null,
            },
          },
          children: <div>{score['13']}</div>,
        }
      },
    },
    {
      title: 'z_score 18',
      dataIndex: 'z_score',
      key: 'Zscore_18',
      width: 100,
      sorter: true,
      render(score, sample) {
        return {
          props: {
            style: {
              background: sample.text_warning.includes('z_score_18') ? red[1] : null,
            },
          },
          children: <div>{score['18']}</div>,
        }
      },
    },
    {
      title: 'z_score 21',
      dataIndex: 'z_score',
      key: 'Zscore_21',
      width: 100,
      sorter: true,
      render(score, sample) {
        return {
          props: {
            style: {
              background: sample.text_warning.includes('z_score_21') ? red[1] : null,
            },
          },
          children: <div>{score['21']}</div>,
        }
      },
    },
    {
      title: 'z_score X',
      dataIndex: 'z_score',
      key: 'Zscore_X',
      width: 100,
      sorter: true,
      render(score, sample) {
        return {
          props: {
            style: {
              background: sample.text_warning.includes('z_score_X') ? red[1] : null,
            },
          },
          children: <div>{score['x']}</div>,
        }
      },
    },
    {
      title: 'FF-PF (%)',
      dataIndex: 'fetal_fraction',
      key: 'FF_Formatted',
      width: 100,
      sorter: true,
      render(fetalFraction, sample) {
        return {
          props: {
            style: {
              background: sample.text_warning.includes('fetal_fraction_pf') ? red[1] : null,
            },
          },
          children: <div>{fetalFraction.preface}</div>,
        }
      },
    },
    {
      title: 'FF-X (%)',
      dataIndex: 'fetal_fraction',
      key: 'FFX',
      width: 100,
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
      title: 'FF-Y (%)',
      dataIndex: 'fetal_fraction',
      key: 'FFY',
      width: 100,
      sorter: true,
      render(fetalFraction, sample) {
        return {
          props: {
            style: {
              background: sample.text_warning.includes('fetal_fraction_y') ? red[1] : null,
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
      title: 'CNV Segment',
      dataIndex: 'cnv_segment',
      key: 'CNVSegment',
      sorter: true,
      render: (cnvSegment: string) =>
        cnvSegment ? <Tag color={tagColors.cnvSegment}>{cnvSegment}</Tag> : null,
    },
    {
      title: (
        <Tooltip title="Warning for chomosome abnormality. Automatically generated. Based on pre defined z_score and Fetal Fraction trsholds">
          Warning
          <QuestionCircleOutlined />
        </Tooltip>
      ),
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
      title: 'QC Flag',
      dataIndex: 'qc_flag',
      key: 'QCFlag',
      width: 200,
      sorter: true,
    },
    {
      title: (
        <Tooltip title="Chomosome abnormalies. Manually classified by user through the sample page">
          Abnormality status
          <QuestionCircleOutlined />
        </Tooltip>
      ),
      dataIndex: 'status',
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
      title: 'Comment',
      dataIndex: 'comment',
      key: 'comment',
      width: 200,
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
            scroll={{ x: 2300 }}
            rowSelection={{
              ...rowSelection,
              hideSelectAll: batchId ? false : true,
              onSelectAll: onSelectAll,
              onSelect: handleSelect,
            }}
            onChange={onTableChange}
            pagination={{ total: pageCount, showTotal: showTotal, current: currentPage }}
          />
        </>
      )}
      {error && <ErrorPage error={error} />}
    </>
  )
}
