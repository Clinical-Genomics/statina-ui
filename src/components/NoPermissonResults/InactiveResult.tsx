import { Result } from 'antd'
import React from 'react'
import { statinaBackendRepo } from '../../services/helpers/helpers'

export const InactiveResult = () => (
  <Result
    status="warning"
    title="Your account is inactive. An admin from Clinical Genomics needs to activate your account"
    extra={
      <a href={statinaBackendRepo}>
        Open an issue on on the Statina GitHub repository if you want to contact us
      </a>
    }
  />
)
