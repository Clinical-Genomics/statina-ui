import { Button, Result } from 'antd'
import React from 'react'
import { Link } from 'react-router-dom'

export const PageNotFound = () => {
  return (
    <>
      <Result
        status="404"
        title="404"
        subTitle="Sorry, the page you visited does not exist."
        extra={
          <Button type="primary">
            <Link to="/">Back to Home</Link>
          </Button>
        }
      />
    </>
  )
}
