import React, { useEffect, useState } from 'react'
import { Card, Space, Typography, Tabs, Input } from 'antd'
import { SampleInfoBox } from 'components/SampleInfoBox/SampleInfoBox'
import { SampleStatusTable } from 'components/SampleStatusTable/SampleStatusTable'
import { mockSample } from 'mocks/sample'

const { Title } = Typography
const { TabPane } = Tabs
const { TextArea } = Input

export function SamplePage() {
  const [sample, setSample] = useState<any[]>([mockSample[0]])
  const [comment, setComment] = useState<any[]>([mockSample[0].sample.comment])
  const [sampleID, setSampleID] = useState<any[]>([mockSample[0].sample.SampleID])
  const onChange = (e) => {
    setComment(e.target.value)
  }
  return (
    <>
      <Title>Sample: {sampleID}</Title>
      <Space size={'large'} direction="vertical" style={{ width: '100%' }}>
        <SampleInfoBox infoBox={sample} />
        <Card title="Comment">
          <TextArea rows={4} onChange={onChange} defaultValue={comment} />
        </Card>
        <Card>
          <Tabs defaultActiveKey="1" type="card">
            <TabPane tab="Status Table" key="1">
              <SampleStatusTable ChromosomeAbn={sample} />
            </TabPane>
            <TabPane tab="Tab 2" key="2">
              test
            </TabPane>
          </Tabs>
        </Card>
      </Space>
    </>
  )
}
