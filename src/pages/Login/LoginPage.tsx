import * as React from 'react'
import styles from './LoginPage.module.css'
import { Form, Input, Button } from 'antd'
import { login } from '../../services/StatinaApi'
import { UserContext } from '../../services/userContext'
import { useContext } from 'react'
import { RegisterModal } from '../../components/RegisterModal/RegisterModal'

export const LoginPage = () => {
  const { initializeUserContext } = useContext(UserContext)
  const onSubmit = (values) => {
    login(values)
      .then((response) => {
        initializeUserContext(response)
      })
      .catch((error) => console.log(error))
  }

  const onSubmitFailed = (errorInfo) => {
    console.log('Failed:', errorInfo)
  }
  return (
    <div className={styles.homeContainer}>
      <p>
        <h1>Welcome to Statina, the visualization tool for NIPT data</h1>
        <h3>
          Developed and maintained by{' '}
          <a href={'https://www.scilifelab.se/units/clinical-genomics-stockholm/'}>
            Clinical Genomics - Scilifelab
          </a>
          .
        </h3>
      </p>
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
    </div>
  )
}
