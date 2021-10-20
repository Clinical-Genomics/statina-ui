import * as React from 'react'
import styles from './LoginPage.module.css'
import MainLogo from 'assets/cg-big-logo.svg'
import { Card, Form, Input, Button } from 'antd'
import { login } from '../../services/StatinaApi'
import { UserContext } from '../../services/user-context'
import { useContext } from 'react'

export const LoginPage = () => {
  const { initializeUser } = useContext(UserContext)
  const onSubmit = (values) => {
    login(values)
      .then((response) => {
        console.log(response)
        initializeUser({ type: response.token_type, token: response.access_token })
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
          <Form
            name="basic"
            labelCol={{
              span: 7,
            }}
            wrapperCol={{
              span: 15,
            }}
            onFinish={onSubmit}
            onFinishFailed={onSubmitFailed}
            autoComplete="off"
          >
            <Form.Item
              label="Username"
              name="username"
              rules={[
                {
                  required: true,
                  message: 'Please input your username!',
                },
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              label="Password"
              name="password"
              rules={[
                {
                  required: true,
                  message: 'Please input your password!',
                },
              ]}
            >
              <Input.Password />
            </Form.Item>
            <Form.Item
              wrapperCol={{
                offset: 8,
                span: 16,
              }}
            >
              <Button htmlType="submit" type={'primary'}>
                Sign in
              </Button>
            </Form.Item>
          </Form>
        </div>
      </div>
      <br />
    </div>
  )
}
