import React, { useEffect } from 'react'
import { Result } from 'antd'
import { useHistory } from 'react-router-dom'

interface UnauthorizedPageProps {
  isLoggedIn: boolean
}

export const UnauthorizedPage = (props: UnauthorizedPageProps) => {
  const { isLoggedIn } = props
  const history = useHistory()

  useEffect(() => {
    if (isLoggedIn) history.push('/')
  }, [history, isLoggedIn])

  return (
    <Result
      status="403"
      title="403"
      subTitle="Sorry, you are not authorized to access this page. Login with your Google account"
    />
  )
}
