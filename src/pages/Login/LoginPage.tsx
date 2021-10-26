import * as React from 'react'
import styles from './LoginPage.module.css'
import { Form, Input, Button } from 'antd'
import { login } from '../../services/StatinaApi'
import { UserContext } from '../../services/userContext'
import { useContext } from 'react'
import { RegisterModal } from '../../components/RegisterModal/RegisterModal'

export const LoginPage = () => {
  const { initializeUser } = useContext(UserContext)
  const onSubmit = (values) => {
    login(values)
      .then((response) => {
        initializeUser(response.access_token)
      })
      .catch((error) => console.log(error))
  }

  const onSubmitFailed = (errorInfo) => {
    console.log('Failed:', errorInfo)
  }
  return (
    <div className={styles.homeContainer}>
      <h1>Welcome to the visualization tool for NIPT data</h1>
      <h3>
        Developed and maintained by{' '}
        <a href={'https://www.scilifelab.se/units/clinical-genomics-stockholm/'}>
          Clinical Genomics - Scilifelab
        </a>
        .
      </h3>
      <div className={styles.loginContainer}>
        <div className={styles.form}>
          <Form name="basic" onFinish={onSubmit} onFinishFailed={onSubmitFailed} autoComplete="off">
            <Form.Item
              name="username"
              rules={[
                {
                  required: true,
                  message: 'Please input your username!',
                },
              ]}
            >
              <Input placeholder="Username" />
            </Form.Item>
            <Form.Item
              name="password"
              rules={[
                {
                  required: true,
                  message: 'Please input your password!',
                },
              ]}
            >
              <Input.Password placeholder="Password" />
            </Form.Item>
            <Form.Item>
              <Button htmlType="submit" type={'primary'}>
                Sign in
              </Button>
            </Form.Item>
            <RegisterModal />
          </Form>
        </div>
      </div>
      <br />
    </div>
  )
}
