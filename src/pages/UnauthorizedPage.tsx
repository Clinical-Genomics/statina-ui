import React, { useEffect } from 'react'
import { Result } from 'antd'
import { useNavigate } from 'react-router-dom'

interface UnauthorizedPageProps {
  isLoggedIn: boolean
}

export const UnauthorizedPage = (props: UnauthorizedPageProps) => {
  const { isLoggedIn } = props
  const navigate = useNavigate()

  useEffect(() => {
    if (isLoggedIn) navigate('/', { replace: true })
  }, [navigate, isLoggedIn])
  return (
    <Result
      status="403"
      title="403"
      subTitle="Sorry, you are not authorized to access this page. Login with your Google account"
    />
  )
}
