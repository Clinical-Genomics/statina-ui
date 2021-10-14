import React, { useState } from 'react'
import { Descriptions, Card, Tag } from 'antd'
import { Link } from 'react-router-dom'
import { Sample } from 'services/interfaces'
import { sexTags, tagColors } from 'services/helpers/constants'

type SampleProps = {
  infoBox: Sample[]
}

export function SampleInfoBox(infoBox: any) {
  const [sample, setSample] = useState<any>(infoBox.infoBox[0].sample)
  const [batch, setBatch] = useState<any>(infoBox.infoBox[0].batch)
  return (
    <>
      <Card>
        <Descriptions title="Info Box" bordered column={2} labelStyle={{ fontWeight: 'bold' }}>
          <Descriptions.Item label="Batch:">
            <Link to={`/batches/${sample.SampleProject}`}>{sample.SampleProject}</Link>
          </Descriptions.Item>
          <Descriptions.Item label="Sequencing Date:">{batch.SequencingDate}</Descriptions.Item>
          <Descriptions.Item label="Sample Type:">{sample.SampleType}</Descriptions.Item>
          <Descriptions.Item label="NonExcludedSites:">
            {sample.NonExcludedSites} {/* Missing from the backend*/}
          </Descriptions.Item>
          <Descriptions.Item label="QCFlags:">{sample.QCFlag}</Descriptions.Item>
          <Descriptions.Item label="Sex (Auto Classified):">
            {sample.sex && <Tag color={sexTags[sample.sex]}>{sample.sex}</Tag>}
          </Descriptions.Item>
          <Descriptions.Item label="Abnormality (Auto Classified):">
            {sample.text_warning.length > 0 &&
              sample.text_warning.split(', ').map((warning) => (
                <Tag color={tagColors.warning} key={warning}>
                  {warning}
                </Tag>
              ))}
          </Descriptions.Item>
          <Descriptions.Item label="Included in Clinical Data Set:">
            <Tag color={tagColors.include[sample.include]}>
              {sample.include.toString().toUpperCase()}
            </Tag>
          </Descriptions.Item>
        </Descriptions>
      </Card>
    </>
  )
}
