import React, { useEffect, useState } from 'react'
import { Input, Table, Tag, Tooltip } from 'antd'
import { Link } from 'react-router-dom'
import { CloudDownloadOutlined, QuestionCircleOutlined } from '@ant-design/icons'
import { red } from '@ant-design/colors'
import { sampleStatusTags, sexTags, tagColors } from 'services/helpers/constants'

type SamplesProps = {
  samples: any[]
  showBatchInfo?: boolean
}

const { Search } = Input

export const SamplesTable = ({ samples, showBatchInfo = true }: SamplesProps) => {
  const [filteredSamples, setFilteredSamples] = useState<any[]>(samples)
  const [selectedRowKeys, setSelectedRowKeys] = useState<any[]>([])

  useEffect(() => {
    setFilteredSamples(samples)
    if (samples?.length > 0) {
      const selectedKey: string[] = []
      samples.forEach((sample) => {
        if (sample.include) selectedKey.push(sample?.SampleID)
      })
      setSelectedRowKeys(selectedKey)
    }
  }, [samples])

  const onSearch = (searchInput) => {
    const lowerCaseInput = searchInput.toLowerCase()
    const filteredData = samples.filter(
      (entry) =>
        entry.SampleProject.toLowerCase().includes(lowerCaseInput) ||
        entry.SampleID.toLowerCase().includes(lowerCaseInput) ||
        entry.comment.toLowerCase().includes(lowerCaseInput)
    )
    setFilteredSamples(filteredData)
  }

  const columns: any = [
    {
      title: 'Sample name',
      dataIndex: 'SampleID',
      key: 'SampleID',
      fixed: 'left',
      render: (SampleID: any) => <Link to={`/samples/${SampleID}`}>{SampleID}</Link>,
    },
    {
      title: 'Batch ID',
      dataIndex: 'SampleProject',
      key: 'SampleProject',
      fixed: 'left',
      visible: showBatchInfo,
      render: (SampleProject: any) => <Link to={`/batches/${SampleProject}`}>{SampleProject}</Link>,
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
      dataIndex: 'FetalFractionPreface',
      key: 'FetalFractionPreface',
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
      render: (sex: any) => (sex ? <Tag color={tagColors.CNVSegment}>{sex}</Tag> : null),
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
      render: (status) => {
        return (
          status.lenght > 0 && (
            <Tag color={sampleStatusTags[status]?.color}>{sampleStatusTags[status]?.label}</Tag>
          )
        )
      },
    },
    {
      title: 'Segmental calls',
      dataIndex: '',
      key: 'segmental_calls',
      width: 120,
      render: (sample: any) => (
        <a href={`/sample_download/${sample.SampleID}/segmental_calls`} download>
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
      <i>Select a sample with the checkbox to include it in the comparison set</i>
      <Table
        pagination={showBatchInfo ? undefined : false}
        columns={columns.filter((column) =>
          showBatchInfo ? column : column.key !== 'SampleProject'
        )}
        dataSource={filteredSamples}
        rowKey="SampleID"
        scroll={{ x: 2300 }}
        rowSelection={{
          ...rowSelection,
        }}
      />
    </>
  )
}
