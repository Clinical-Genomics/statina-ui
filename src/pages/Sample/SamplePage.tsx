import React, { useContext, useEffect, useState } from 'react'
import { Card, Space, Typography, Tabs, Input } from 'antd'
import { SampleInfoBox } from 'components/SampleInfoBox/SampleInfoBox'
import { SampleStatusTable } from 'components/SampleStatusTable/SampleStatusTable'
import { getSample } from '../../services/StatinaApi'
import { useLocation } from 'react-router-dom'
import { UserContext } from '../../services/userContext'
import { Loading } from '../../components/Loading'
import { ErrorPage } from '../Error/ErrorPage'

const { Title } = Typography
const { TabPane } = Tabs
const { TextArea } = Input

export function SamplePage() {
  const [sample, setSample] = useState<any>()
  const [error, setError] = useState<any>()
  const userContext = useContext(UserContext)

  const { pathname } = useLocation()
  const sampleId = pathname.substring(pathname.lastIndexOf('/') + 1, pathname.length)

  useEffect(() => {
    if (sampleId)
      getSample(sampleId, userContext)
        .then((sample) => {
          setSample(sample)
          setError(null)
        })
        .catch((error) => {
          setError(error)
        })
  }, [sampleId])

  const onChange = (e) => {
    console.log(e.target.value)
  }
  return (
    <>
      {!error && (
        <>
          {sample && (
            <>
              <Title>Sample {sampleId}</Title>
              <Space size={'large'} direction="vertical" style={{ width: '100%' }}>
                <SampleInfoBox sample={sample} />
                <Card title="Comment">
                  <TextArea rows={4} onChange={onChange} defaultValue={'comment'} />
                </Card>
                <Card>
                  <Tabs defaultActiveKey="1" type="card">
                    <TabPane tab="Status Table" key="1"></TabPane>
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
