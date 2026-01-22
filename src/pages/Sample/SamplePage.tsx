import React, { useCallback, useContext, useEffect, useState } from 'react'
import { Card, Space, Typography, Table, Select, Descriptions, Tag } from 'antd'
import { editSample, getSample, putSampleComment } from '../../services/StatinaApi'
import { Link, useLocation } from 'react-router-dom'
import { UserContext } from '../../services/userContext'
import { Loading } from '../../components/Loading'
import { ErrorPage } from '../Error/ErrorPage'
import { SuccessNotification } from '../../services/helpers/helpers'
import { Sample } from '../../services/interfaces'
import { sampleStatusTags, sexTags } from '../../services/helpers/constants'
import { SamplePlot } from '../../components/SamplePlot/SamplePlot'

const { Paragraph, Title } = Typography

export function SamplePage() {
  const [sample, setSample] = useState<Sample>()
  const [error, setError] = useState<any>()
  const [abnormalStatusTags, setAbnormalStatusTags] = useState<any>()
  const userContext = useContext(UserContext)
  const { permissions } = userContext
  const { Option } = Select
  const { pathname } = useLocation()
  const sampleId = pathname.substring(pathname.lastIndexOf('/') + 1, pathname.length)

  const retrieveSample = useCallback(() => {
    getSample(sampleId, userContext)
      .then((sampleResponse) => {
        setSample(sampleResponse)
        setError(null)
        setAbnormalStatusTags(
          Object.keys(sampleResponse.status).filter(
            (chrom) => sampleResponse.status[chrom].status !== 'Normal'
          )
        )
      })
      .catch((error) => {
        setError(error)
      })
  }, [sampleId, userContext])

  useEffect(() => {
    if (sampleId) retrieveSample()
  }, [sampleId, retrieveSample])

  const columns = [
    {
      title: 'Chromosome abnormality',
      dataIndex: 'chromosome',
      key: 'chromosome',
      render: (key, chromosome) => <div>{chromosome[0]}</div>,
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (key, chromosome) =>
        permissions?.includes('RW') ? (
          <Select
            defaultValue={chromosome[1].status || sampleStatusTags.normal.label}
            style={{ width: 120 }}
            onChange={(value) => onStatusChange(value, chromosome[0])}
            data-testid="status-selector"
          >
            {Object.values(sampleStatusTags).map((status) => (
              <Option value={status.label} key={status.label}>
                {status.label}
              </Option>
            ))}
          </Select>
        ) : (
          <Tag color={sampleStatusTags[chromosome[1].status.toLowerCase()]?.color} key={status}>
            {chromosome[1].status || sampleStatusTags.normal.label}
          </Tag>
        ),
    },
    {
      title: 'Latest change',
      dataIndex: 'latestChange',
      key: 'latestChange',
      render: (key, chromosome) => <div>{chromosome[1].edited}</div>,
    },
  ]

  const onStatusChange = (value, chromosome) => {
    editSample(sampleId, `status=${value}`, `status/${chromosome}?status=${value}`, userContext)
      .then(() => retrieveSample())
      .catch(() => setError(true))
  }

  const onCommentChange = (comment) => {
    putSampleComment(sampleId, comment.length > 0 ? comment : ' ', userContext).then(() => {
      getSample(sampleId, userContext).then((sampleResponse) => {
        setSample(sampleResponse)
        SuccessNotification({
          type: 'success',
          message: 'Comment updated',
        })
      })
    })
  }

  return (
    <>
      {!error && (
        <>
          {sample && (
            <>
              <Title>Sample {sampleId}</Title>
              <Space size={'large'} direction="vertical" style={{ width: '100%' }}>
                <Card>
                  <Descriptions
                    bordered
                    column={2}
                    size="small"
                    styles={{ label: { fontWeight: 'bold' } }}
                  >
                    <Descriptions.Item label="Batch">
                      <Link to={`/batches/${sample.batch_id}`}>{sample.batch_id}</Link>
                    </Descriptions.Item>
                    <Descriptions.Item label="Sample Type">{sample.sample_type}</Descriptions.Item>
                    <Descriptions.Item label="QCFlags">{sample.qc_flag}</Descriptions.Item>
                    <Descriptions.Item label="Sex (Auto Classified)">
                      {sample.sex && <Tag color={sexTags[sample.sex]}>{sample.sex}</Tag>}
                    </Descriptions.Item>
                    <Descriptions.Item label="Abnormality status (Auto Classified)">
                      {abnormalStatusTags?.length > 0
                        ? abnormalStatusTags.map((chrom) => (
                            <Tag
                              color={
                                sampleStatusTags[sample.status[chrom].status.toLowerCase()]?.color
                              }
                              key={chrom}
                            >
                              {chrom} - {sample.status[chrom].status}
                            </Tag>
                          ))
                        : null}
                    </Descriptions.Item>
                    <Descriptions.Item label="Comment">
                      <div>
                        {permissions?.includes('RW') ? (
                          <Paragraph
                            editable={{
                              onChange: onCommentChange,
                              tooltip: false,
                            }}
                            data-testid="edit-comment"
                          >
                            {sample?.comment}
                          </Paragraph>
                        ) : (
                          <div> {sample?.comment}</div>
                        )}
                      </div>
                    </Descriptions.Item>
                  </Descriptions>
                </Card>
                <Card>
                  <Space size={'large'} direction="vertical" style={{ width: '100%' }}>
                    <Table
                      columns={columns}
                      dataSource={Object.entries(sample.status)}
                      rowKey="0"
                      pagination={false}
                      bordered={true}
                    />
                  </Space>
                  <Space size={'large'} direction="vertical" style={{ width: '100%' }}>
                    <SamplePlot sampleId={sampleId} />
                  </Space>
                </Card>
              </Space>
            </>
          )}
          {!sample && <Loading />}
        </>
      )}
      {error && <ErrorPage error={error} />}
    </>
  )
}
