import { MailOutlined } from '@ant-design/icons'
import { Result } from 'antd'
import React from 'react'
import { statinaBackendRepo } from '../../services/helpers/helpers'

export const UnconfirmedResult = () => (
  <Result
    icon={<MailOutlined />}
    title="You didn't confirm your email address. Please check your email and confirm it"
    extra={
      <a href={statinaBackendRepo}>
        Open an issue on on the Statina GitHub repository if you want to contact us
      </a>
    }
  />
)
