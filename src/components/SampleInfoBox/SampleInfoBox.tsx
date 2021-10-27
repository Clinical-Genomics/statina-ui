import React, { useState } from 'react'
import { Descriptions, Card, Tag } from 'antd'
import { Link } from 'react-router-dom'
import { Sample } from 'services/interfaces'
import { sexTags, tagColors } from 'services/helpers/constants'

export const SampleInfoBox = ({ sample }) => {
  console.log(sample)
  return (
    <>
      <Card>
        <Descriptions title="Info Box" bordered column={2} labelStyle={{ fontWeight: 'bold' }}>
          <Descriptions.Item label="Batch:">
            <Link to={`/batches/${sample.batch_id}`}>{sample.batch_id}</Link>
          </Descriptions.Item>
          <Descriptions.Item label="Sequencing Date:">{'batch.SequencingDate'}</Descriptions.Item>
          <Descriptions.Item label="Sample Type:">{sample.SampleType}</Descriptions.Item>
          <Descriptions.Item label="NonExcludedSites:">
            {'sample.NonExcludedSites'} {/* Missing from the backend*/}
          </Descriptions.Item>
          <Descriptions.Item label="QCFlags:">{sample.QCFlag}</Descriptions.Item>
          <Descriptions.Item label="Sex (Auto Classified):">
            {sample.sex && <Tag color={sexTags[sample.sex]}>{sample.sex}</Tag>}
          </Descriptions.Item>
          <Descriptions.Item label="Abnormality (Auto Classified):">dfdf</Descriptions.Item>
        </Descriptions>
      </Card>
    </>
  )
}
