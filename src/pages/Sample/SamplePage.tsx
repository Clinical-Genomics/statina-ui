import React, { useContext, useEffect, useState } from 'react'
import { Card, Space, Typography, Tabs, Input, Table, Select } from 'antd'
import { SampleInfoBox } from 'components/SampleInfoBox/SampleInfoBox'
import { editSample, getSample } from '../../services/StatinaApi'
import { useLocation } from 'react-router-dom'
import { UserContext } from '../../services/userContext'
import { Loading } from '../../components/Loading'
import { ErrorPage } from '../Error/ErrorPage'
import { SuccessNotification } from '../../services/helpers/helpers'
import { Sample } from '../../services/interfaces'
import { sampleStatusTags } from '../../services/helpers/constants'

const { Title, Text } = Typography
const { TabPane } = Tabs
const { TextArea } = Input

export function SamplePage() {
  const [sample, setSample] = useState<Sample>()
  const [error, setError] = useState<any>()
  const userContext = useContext(UserContext)
  const { Option } = Select
  const { pathname } = useLocation()
  const sampleId = pathname.substring(pathname.lastIndexOf('/') + 1, pathname.length)

  useEffect(() => {
    if (sampleId) retrieveSample()
  }, [sampleId])

  const retrieveSample = () => {
    getSample(sampleId, userContext)
      .then((sampleResponse) => {
        setSample(sampleResponse)
        setError(null)
      })
      .catch((error) => {
        setError(error)
      })
  }

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
      render: (key, chromosome) => (
        <Select
          defaultValue={chromosome[1].status || sampleStatusTags.normal.label}
          style={{ width: 120 }}
          onChange={(value) => onStatusChange(value, chromosome[0])}
        >
          {Object.values(sampleStatusTags).map((status) => (
            <Option value={status.label} key={status.label}>
              {status.label}
            </Option>
          ))}
        </Select>
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

  const onCommentChange = (e) => {
    editSample(sampleId, `comment=${e?.target?.value}`, 'comment', userContext).then(() => {
      SuccessNotification({
        type: 'success',
        message: 'Comment updated',
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
                {sample && <SampleInfoBox sample={sample} />}
                <Card title="Comment">
                  <Text italic type="secondary">
                    Press enter to save
                  </Text>
                  <TextArea rows={4} onPressEnter={onCommentChange} defaultValue={sample.comment} />
                </Card>
                <Card>
                  <Tabs defaultActiveKey="1" type="card">
                    <TabPane tab="Status Table" key="1">
                      <Space size={'large'} direction="vertical" style={{ width: '100%' }}>
                        <Table
                          columns={columns}
                          dataSource={Object.entries(sample.status)}
                          rowKey="0"
                          pagination={false}
                          bordered={true}
                        />
                      </Space>
                    </TabPane>
                    <TabPane tab="Tab 2" key="2">
                      test
                    </TabPane>
                  </Tabs>
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
