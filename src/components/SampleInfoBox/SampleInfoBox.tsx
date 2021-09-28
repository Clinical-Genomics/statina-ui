import React from 'react';
import { Descriptions, Card } from 'antd';
import styles from './InfoBox.module.css';
export default function InfoBox(infoBox) {
  console.log(infoBox.infoBox[0].sample);
  return (
    <>
      <Card>
        <Descriptions title="Info Box" bordered column={2}>
          <Descriptions.Item label="Batch:">SampleProject</Descriptions.Item>
          <Descriptions.Item label="Sequencing Date:">
            SequencingDate
          </Descriptions.Item>
          <Descriptions.Item label="Sample Type:">SampleType</Descriptions.Item>
          <Descriptions.Item label="NonExcludedSites:">
            NonExcludedSites
          </Descriptions.Item>
          <Descriptions.Item label="QCFlags:">QCFlag</Descriptions.Item>
          <Descriptions.Item label="Sex (Auto Classified):">
            sex
          </Descriptions.Item>
          <Descriptions.Item label="Abnormality (Auto Classified):">
            text_warning
          </Descriptions.Item>
          <Descriptions.Item label="Included in Clinical Data Set:">
            include
          </Descriptions.Item>
        </Descriptions>
      </Card>
    </>
  );
}
