import * as React from 'react'
import styles from './HomePage.module.css'
import MainLogo from 'assets/cg-big-logo.svg'
import { Card, Form, Input, Button } from 'antd'
import { login } from '../../services/StatinaApi'

export const HomePage = () => {
  const onSubmit = (values) => {
    login(values)
      .then((response) => console.log(response))
      .catch((error) => console.log(error))
  }

  const onSubmitFailed = (errorInfo) => {
    console.log('Failed:', errorInfo)
  }
  return (
    <div className={styles.homeContainer}>
      <h1>Welcome to the visualization tool for NIPT data</h1>
      <div className={styles.loginContainer}>
        <h1>Sign in</h1>
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
              Submit
            </Button>
          </Form.Item>
        </Form>
      </div>
      <h3>
        This application is developed and maintained by{' '}
        <a href={'https://www.scilifelab.se/units/clinical-genomics-stockholm/'}>
          Clinical Genomics - Scilifelab
        </a>
        .
      </h3>
      <br />
    </div>
  )
}
