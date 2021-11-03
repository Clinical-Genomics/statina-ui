import { Result } from 'antd'
import React from 'react'

export const InactiveResult = () => (
  <Result
    status="warning"
    title="Your account is inactive. An admin from Clinical Genomics needs to activate your account"
    extra={
      <a href={'https://clinical-scilifelab.supportsystem.com/scp/login.php'}>
        Open a ticket on our support system if you want to contact us
      </a>
    }
  />
)
