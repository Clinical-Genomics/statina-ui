import React from 'react'
import { Button, Result } from 'antd'
import { Link } from 'react-router-dom'

export const ErrorPage = ({ error }) => {
  switch (error?.response?.status) {
    case 404:
      return <Result status="404" title="404" subTitle="Data not found" />
      break
    default:
      return (
        <Result
          title={'Something went wrong'}
          subTitle="Make sure you are connected to the VPN and contact support if the error persists."
          extra={
            <Button type="primary" key="console">
              <Link to="/">Back to Home</Link>
            </Button>
          }
        />
      )
  }
}
