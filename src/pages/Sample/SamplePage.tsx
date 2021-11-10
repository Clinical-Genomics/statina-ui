import React, { useContext, useEffect, useState } from 'react'
import { Card, Space, Typography, Tabs, Input } from 'antd'
import { SampleInfoBox } from 'components/SampleInfoBox/SampleInfoBox'
import { SampleStatusTable } from 'components/SampleStatusTable/SampleStatusTable'
import { editSample, getSample } from '../../services/StatinaApi'
import { useLocation } from 'react-router-dom'
import { UserContext } from '../../services/userContext'
import { Loading } from '../../components/Loading'
import { ErrorPage } from '../Error/ErrorPage'
import { SuccessNotification } from '../../services/helpers/helpers'
import { Sample } from '../../services/interfaces'

const { Title, Text } = Typography
const { TabPane } = Tabs
const { TextArea } = Input

export function SamplePage() {
  const [sample, setSample] = useState<Sample>()
  const [error, setError] = useState<any>()
  const userContext = useContext(UserContext)
  const { pathname } = useLocation()
  const sampleId = pathname.substring(pathname.lastIndexOf('/') + 1, pathname.length)

  useEffect(() => {
    if (sampleId)
      getSample(sampleId, userContext)
        .then((sampleResponse) => {
          setSample(sampleResponse)
          setError(null)
        })
        .catch((error) => {
          setError(error)
        })
  }, [sampleId])

  const onChange = (e) => {
    editSample(sampleId, `comment=${e?.target?.value}`, 'comment', userContext).then((response) => {
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
                  <TextArea rows={4} onPressEnter={onChange} defaultValue={sample.comment} />
                </Card>
                <Card>
                  <Tabs defaultActiveKey="1" type="card">
                    <TabPane tab="Status Table" key="1">
                      Sample status coming soon
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
