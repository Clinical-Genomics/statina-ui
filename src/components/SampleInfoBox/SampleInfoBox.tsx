import React from 'react'
import { Descriptions, Card, Tag } from 'antd'
import { Link } from 'react-router-dom'
import { sampleStatusTags, sexTags } from 'services/helpers/constants'

export const SampleInfoBox = ({ sample }) => {
  if (sample) {
    const abnormalStatusTags = Object.keys(sample.status).filter(
      (chrom) => sample.status[chrom].status !== 'Normal'
    )
    return (
      <Card>
        <Descriptions title="Info Box" bordered column={2} labelStyle={{ fontWeight: 'bold' }}>
          <Descriptions.Item label="Batch:">
            <Link to={`/batches/${sample.batch_id}`}>{sample.batch_id}</Link>
          </Descriptions.Item>
          <Descriptions.Item label="Sample Type:">{sample.sample_type}</Descriptions.Item>
          <Descriptions.Item label="QCFlags:">{sample.qc_flag}</Descriptions.Item>
          <Descriptions.Item label="Sex (Auto Classified):">
            {sample.sex && <Tag color={sexTags[sample.sex]}>{sample.sex}</Tag>}
          </Descriptions.Item>
          <Descriptions.Item label="Abnormality status (Auto Classified):">
            {abnormalStatusTags.length > 0
              ? abnormalStatusTags.map((chrom) => (
                  <Tag
                    color={sampleStatusTags[sample.status[chrom].status.toLowerCase()]?.color}
                    key={chrom}
                  >
                    {chrom} - {sample.status[chrom].status}
                  </Tag>
                ))
              : null}
          </Descriptions.Item>
        </Descriptions>
      </Card>
    )
  } else return <div>Not found</div>
}
