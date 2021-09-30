import React, { useState } from 'react';
import { Descriptions, Card } from 'antd';
import { Link } from 'react-router-dom';
import { Sample } from '../../services/interfaces';

type SampleProps = {
  sample: Sample[];
  infoBox: string;
  batch: any;
};

export function SampleInfoBox(infoBox) {
  const [sample, setSample] = useState<any>(infoBox.infoBox[0].sample);
  const [batch, setBatch] = useState<any>(infoBox.infoBox[0].batch);
  return (
    <>
      <Card>
        <Descriptions
          title="Info Box"
          bordered
          column={2}
          labelStyle={{ fontWeight: 'bold' }}
        >
          <Descriptions.Item label="Batch:">
            <Link to={`/batches/${sample.SampleProject}`}>
              {sample.SampleProject}
            </Link>
          </Descriptions.Item>
          <Descriptions.Item label="Sequencing Date:">
            {batch.SequencingDate}
          </Descriptions.Item>
          <Descriptions.Item label="Sample Type:">
            {sample.SampleType}
          </Descriptions.Item>
          <Descriptions.Item label="NonExcludedSites:">
            {sample.NonExcludedSites} {/* Missing from the backend*/}
          </Descriptions.Item>
          <Descriptions.Item label="QCFlags:">
            {sample.QCFlag}
          </Descriptions.Item>
          <Descriptions.Item label="Sex (Auto Classified):">
            {sample.sex}
          </Descriptions.Item>
          <Descriptions.Item label="Abnormality (Auto Classified):">
            {sample.text_warning}
          </Descriptions.Item>
          <Descriptions.Item label="Included in Clinical Data Set:">
            {sample.include ? 'True' : 'False'}
          </Descriptions.Item>
        </Descriptions>
      </Card>
    </>
  );
}
