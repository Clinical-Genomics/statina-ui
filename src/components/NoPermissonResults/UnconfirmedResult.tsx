import { MailOutlined } from '@ant-design/icons'
import { Result } from 'antd'
import React from 'react'

export const UnconfirmedResult = () => (
  <Result
    icon={<MailOutlined />}
    title="You didn't confirm your email address. Please check your email and confirm it"
    extra={
      <a href={'https://clinical-scilifelab.supportsystem.com/scp/login.php'}>
        Open a ticket on our support system if you encounter any issues
      </a>
    }
  />
)
