import React, { useContext, useEffect, useState } from 'react'
import { UserContext } from '../../services/userContext'
import {
  getSamples,
  getBatchSamples,
  getSamplesByText,
  includeSample,
  includeBatchSamples,
} from '../../services/StatinaApi'
import { Input, Table, Tag, Tooltip, Typography } from 'antd'
import { Link } from 'react-router-dom'
import { CloudDownloadOutlined, QuestionCircleOutlined } from '@ant-design/icons'
import { red } from '@ant-design/colors'
import { sampleStatusTags, sexTags, tagColors } from 'services/helpers/constants'
import { escapeRegExp } from 'services/helpers/helpers'

type SamplesProps = {
  showBatchInfo?: boolean
  batchId?: any
}

const { Search } = Input
const { Text } = Typography

export const SamplesTable = ({ showBatchInfo = true, batchId }: SamplesProps) => {
  const userContext = useContext(UserContext)
  const [filteredSamples, setFilteredSamples] = useState<any[]>([])
  const [selectedRowKeys, setSelectedRowKeys] = useState<any[]>([])
  const [pageCount, setPageCount] = useState(0)
  const [searchValue, setSearchValue] = useState('')
  const [currentPage, setCurrentPage] = useState(1)

  useEffect(() => {
    if (batchId) {
      getBatchSamples(userContext, batchId, 10, 0, searchValue).then((samples) => {
        setFilteredSamples(samples?.documents),
          setPageCount(samples?.document_count),
          inclodedSamples(samples?.documents)
      })
    } else {
      getSamples(userContext, 10, 0).then((samples) => {
        setFilteredSamples(samples?.documents),
          setPageCount(samples?.document_count),
          inclodedSamples(samples?.documents)
      })
    }
  }, [])

  const inclodedSamples = (samples) => {
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
    if (batchId) {
      getBatchSamples(userContext, batchId, 0, 0, escapeInput).then((samples) => {
        setFilteredSamples(samples.documents),
          setPageCount(samples.document_count),
          inclodedSamples(samples?.documents)
      })
    } else {
      const escapeInput = escapeRegExp(searchInput)
      setSearchValue(escapeInput)
      getSamplesByText(userContext, 0, 0, escapeInput).then((samples) => {
        setFilteredSamples(samples.documents),
          setPageCount(samples.document_count),
          inclodedSamples(samples?.documents)
      })
    }
  }

  const onChange = (data) => {
    if (batchId) {
      getBatchSamples(userContext, batchId, data.pageSize, data.current, searchValue).then(
        (samples) => {
          setFilteredSamples(samples.documents), setPageCount(samples.document_count)
          setCurrentPage(data.current), inclodedSamples(samples.documents)
        }
      )
    } else {
      getSamples(userContext, data.pageSize, data.current).then((samples) => {
        setFilteredSamples(samples.documents), setPageCount(samples.document_count)
        setCurrentPage(data.current), inclodedSamples(samples.documents)
      })
    }
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
    if (selected) {
      includeSample(record.sample_id, userContext, selected)
    } else {
      includeSample(record.sample_id, userContext, selected)
    }
  }

  const columns: any = [
    {
      title: 'Sample name',
      dataIndex: 'sample_id',
      key: 'sample_id',
      fixed: 'left',
      render: (sample_id: any) => <Link to={`/samples/${sample_id}`}>{sample_id}</Link>,
    },
    {
      title: 'Batch ID',
      dataIndex: 'batch_id',
      key: 'batch_id',
      fixed: 'left',
      visible: showBatchInfo,
      render: (batch_id: any) => <Link to={`/batches/${batch_id}`}>{batch_id}</Link>,
    },
    {
      title: 'z_score 13',
      dataIndex: 'z_score',
      key: 'z_score',
      width: 100,
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
      key: 'z_score',
      width: 100,
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
      key: 'z_score',
      width: 100,
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
      key: 'z_score',
      width: 100,
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
      key: 'fetalFractionPreface',
      width: 100,
      render(fetalFraction) {
        return <div>{fetalFraction.preface}</div>
      },
    },
    {
      title: 'FF-X (%)',
      dataIndex: 'fetal_fraction',
      key: 'fetalFractionX',
      width: 100,
      render(fetalFraction) {
        return <div>{fetalFraction.x}</div>
      },
    },
    {
      title: 'FF-Y (%)',
      dataIndex: 'fetal_fraction',
      key: 'fetalFractionY',
      width: 100,
      render(fetalFraction) {
        return <div>{fetalFraction.y}</div>
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
      key: 'cnvSegment',
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
      key: 'qcFlag',
      width: 200,
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
        <a href={`/sample_download/${sample.sample_id}/segmental_calls`} download>
          <CloudDownloadOutlined style={{ fontSize: '30px', marginLeft: '30%' }} />
        </a>
      ),
    },
    {
      title: 'Comment',
      dataIndex: 'comment',
      key: 'comment',
      width: 200,
    },
    {
      title: 'Last changed',
      dataIndex: 'included',
      key: 'included',
      render: (included) => <div>{included.edited}</div>,
    },
  ]

  return (
    <>
      <Search
        allowClear
        placeholder={`Search Samples`}
        onSearch={onSearch}
        style={{ paddingBottom: 20 }}
      />
      <Text type="secondary">
        {pageCount} result{filteredSamples?.length > 1 ? `s` : null}
      </Text>
      <br />
      <i>Select a sample with the checkbox to include it in the comparison set</i>
      <Table
        columns={columns.filter((column) =>
          showBatchInfo ? column : column.key !== 'SampleProject'
        )}
        dataSource={filteredSamples}
        rowKey="sample_id"
        scroll={{ x: 2300 }}
        rowSelection={{
          ...rowSelection,
          hideSelectAll: batchId ? false : true,
          onSelectAll: onSelectAll,
          onSelect: handleSelect,
        }}
        onChange={onChange}
        pagination={{ total: pageCount, showTotal: showTotal, current: currentPage }}
      />
    </>
  )
}
