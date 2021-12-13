import React, { useEffect, useState } from 'react'
import { CheckOutlined } from '@ant-design/icons'
import { Button, Result } from 'antd'
import { validateUserEmail } from 'services/StatinaApi'
import { useParams } from 'react-router-dom'

export const ConfirmedResult = () => {
  const { username, verificationhex } = useParams<any>()
  const [error, setError] = useState<any>()
  const userName = username.substring(username.indexOf('=') + 1)
  const verificationHex = verificationhex.substring(verificationhex.indexOf('=') + 1)

  useEffect(() => {
    validateUserEmail(userName, verificationHex).catch((error) => {
      setError(error)
    })
  }, [])
  return (
    <>
      {!error && (
        <Result
          icon={<CheckOutlined />}
          title={`Hello, ${username.substring(username.indexOf('=') + 1)}!`}
          subTitle="Your email has been confirmed, you can now login."
          extra={
            <a href={`/`}>
              <Button type="primary">Login</Button>
            </a>
          }
        />
      )}
      {error && (
        <Result
          status="warning"
          title={`Hello, ${userName}!`}
          subTitle={error.response.data}
          extra={
            <a href={`/`}>
              <Button type="primary">Login</Button>
            </a>
          }
        />
      )}
    </>
  )
}
