import React, { useEffect, useState } from 'react';
import { Card, Space, Typography, Tabs } from 'antd';
import SampleInfoBox from '../../components/SampleInfoBox/SampleInfoBox';
import SampleStatusTable from '../../components/SampleStatusTable/SampleStatusTable';
import { mockSample } from '../../mocks/sample';

const { Title } = Typography;
const { TabPane } = Tabs;

function callback(key) {
  console.log(key);
}

export function SamplePage() {
  const [sample, setSample] = useState<any[]>([]);
  useEffect(() => {
    setSample(mockSample);
  }, []);
  return (
    <>
      <Title>Sample: Test</Title>
      <Space size={'large'} direction="vertical" style={{ width: '100%' }}>
        <SampleInfoBox infoBox={sample} />
        <Card title="Comment">
          <p>Comment content</p>
        </Card>
        <Card>
          <Tabs defaultActiveKey="1" onChange={callback} type="card">
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
  );
}
