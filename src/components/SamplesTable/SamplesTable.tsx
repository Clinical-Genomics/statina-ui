import React, { useContext, useEffect, useState } from 'react'
import { UserContext } from '../../services/userContext'
import { getSamples, getSamplesByText } from '../../services/StatinaApi'
import { Input, message, Table, Tag, Tooltip, Typography } from 'antd'
import { Link } from 'react-router-dom'
import { CloudDownloadOutlined, QuestionCircleOutlined } from '@ant-design/icons'
import { red } from '@ant-design/colors'
import { sampleStatusTags, sexTags, tagColors } from 'services/helpers/constants'

type SamplesProps = {
  samples: any[]
  samplesCount: number
  showBatchInfo?: boolean
}

const { Search } = Input
const { Title, Text } = Typography

export const SamplesTable = ({ samples, samplesCount, showBatchInfo = true }: SamplesProps) => {
  const userContext = useContext(UserContext)
  const [filteredSamples, setFilteredSamples] = useState<any[]>(samples)
  const [selectedRowKeys, setSelectedRowKeys] = useState<any[]>([])
  const [pageCount, setPageCount] = useState(samplesCount)
  const [searchValue, setSearchValue] = useState('')
  const [currentPage, setCurrentPage] = useState(1)

  useEffect(() => {
    getSamples(userContext, 10, 0).then((samples) => {
      setFilteredSamples(samples.documents), setPageCount(samples.document_count)
    })
    if (samples?.length > 0) {
      setPageCount(samplesCount)
      const selectedKey: string[] = []
      samples.forEach((sample) => {
        if (sample.include) selectedKey.push(sample?.sample_id)
      })
      setSelectedRowKeys(selectedKey)
    }
  }, [samples])

  const onSearch = (searchInput) => {
    setSearchValue(searchInput)
    setCurrentPage(1)
    if (searchInput.length > 2) {
      getSamplesByText(userContext, 0, 0, searchInput).then((samples) => {
        setFilteredSamples(samples.documents), setPageCount(samples.document_count)
      })
    } else {
      message.error('Search terms must contain at least 3 characters.')
    }
  }

  const onChange = (data) => {
    getSamplesByText(userContext, data.pageSize, data.current, searchValue).then((samples) => {
      setFilteredSamples(samples.documents), setPageCount(samples.document_count)
    })
  }

  const showTotal = (total, range) => {
    return `${range[0]}-${range[1]} of ${total}`
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
      title: 'Zscore 13',
      dataIndex: 'Zscore_13',
      key: 'Zscore_13',
      width: 100,
      render(score, sample) {
        return {
          props: {
            style: {
              background: sample.text_warning.includes('Zscore_13') ? red[1] : null,
            },
          },
          children: <div>{score}</div>,
        }
      },
    },
    {
      title: 'Zscore 18',
      dataIndex: 'Zscore_18',
      key: 'Zscore_18',
      width: 100,
      render(score, sample) {
        return {
          props: {
            style: {
              background: sample.text_warning.includes('Zscore_18') ? red[1] : null,
            },
          },
          children: <div>{score}</div>,
        }
      },
    },
    {
      title: 'Zscore 21',
      dataIndex: 'Zscore_21',
      key: 'Zscore_21',
      width: 100,
      render(score, sample) {
        return {
          props: {
            style: {
              background: sample.text_warning.includes('Zscore_21') ? red[1] : null,
            },
          },
          children: <div>{score}</div>,
        }
      },
    },
    {
      title: 'Zscore X',
      dataIndex: 'Zscore_X',
      key: 'Zscore_X',
      width: 100,
      render(score, sample) {
        return {
          props: {
            style: {
              background: sample.text_warning.includes('Zscore_X') ? red[1] : null,
            },
          },
          children: <div>{score}</div>,
        }
      },
    },
    {
      title: 'FF-PF (%)',
      dataIndex: 'FF_Formatted',
      key: 'FF_Formatted',
      width: 100,
    },
    {
      title: 'FF-X (%)',
      dataIndex: 'FFX',
      key: 'FFX',
      width: 100,
    },
    {
      title: 'FF-Y (%)',
      dataIndex: 'FFY',
      key: 'FFY',
      width: 100,
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
      dataIndex: 'CNVSegment',
      key: 'CNVSegment',
      render: (CNVSegment: any) =>
        CNVSegment ? <Tag color={tagColors.CNVSegment}>{CNVSegment}</Tag> : null,
    },
    {
      title: (
        <Tooltip title="Warning for chomosome abnormality. Automatically generated. Based on pre defined Zscore and Fetal Fraction trsholds">
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
      dataIndex: 'QCFlag',
      key: 'QCFlag',
      width: 200,
    },
    {
      title: (
        <Tooltip title="Chomosome abnormalies. Manually classified by user through the sample page">
          Status
          <QuestionCircleOutlined />
        </Tooltip>
      ),
      dataIndex: 'status',
      key: 'status',
      render: (status: any) => {
        return status.length > 0
          ? status.split(', ').map((status) => (
              <Tag color={sampleStatusTags[status.split(' ')[0].toLowerCase()]?.color} key={status}>
                {status}
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
      dataIndex: 'change_include_date',
      key: 'change_include_date',
    },
  ]

  const rowSelection = {
    onChange: (selectedRowKeys) => {
      setSelectedRowKeys(selectedRowKeys)
    },
    selectedRowKeys,
  }

  return (
    <>
      <Search
        placeholder={`Search by Sample name${showBatchInfo ? ', Batch name' : ''} or Comment`}
        onSearch={onSearch}
        style={{ paddingBottom: 20 }}
      />
      {searchValue.length > 0 && (
        <Text type="secondary">
          About {pageCount} result{filteredSamples.length > 1 ? `s` : null}
        </Text>
      )}

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
        }}
        onChange={onChange}
        pagination={{ total: pageCount, showTotal: showTotal, current: currentPage }}
      />
    </>
  )
}
