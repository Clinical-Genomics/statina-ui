import React, { useState } from 'react'
import { Button, Form, Input, Modal, Result } from 'antd'
import { registerUser } from '../../services/StatinaApi'

export const RegisterModal = () => {
  const [isModalVisible, setIsModalVisible] = useState(false)
  const [isRegistrationSuccessful, setIsRegistrationSuccessful] = useState(false)
  const [email, setEmail] = useState(null)

  const showModal = () => {
    setIsModalVisible(true)
  }

  const signUp = (values) => {
    registerUser(values).then((response) => {
      setEmail(response.email)
      setIsRegistrationSuccessful(true)
    })
  }

  const handleCancel = () => {
    setIsModalVisible(false)
  }
  return (
    <>
      <Button onClick={showModal}>Create new account</Button>
      <Modal
        title="Create new account"
        visible={isModalVisible}
        footer={null}
        onCancel={handleCancel}
      >
        {!isRegistrationSuccessful && (
          <Form name="basic" onFinish={signUp} autoComplete="off">
            <Form.Item
              name="email"
              rules={[
                {
                  required: true,
                  message: 'Please input your email',
                  type: 'email',
                },
              ]}
            >
              <Input placeholder="Email" />
            </Form.Item>
            <Form.Item
              name="username"
              rules={[
                {
                  required: true,
                  message: 'Please input your username',
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
                  message: 'Please input your password',
                },
              ]}
            >
              <Input.Password placeholder="Password" />
            </Form.Item>
            <Form.Item
              name="password_repeated"
              dependencies={['password']}
              hasFeedback
              rules={[
                {
                  required: true,
                  message: 'Please confirm your password!',
                },
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    if (!value || getFieldValue('password') === value) {
                      return Promise.resolve()
                    }
                    return Promise.reject(
                      new Error('The two passwords that you entered do not match!')
                    )
                  },
                }),
              ]}
            >
              <Input.Password placeholder="Confirm password" />
            </Form.Item>
            <Form.Item>
              <Button htmlType="submit" type={'primary'}>
                Sign up
              </Button>
            </Form.Item>
          </Form>
        )}
        {isRegistrationSuccessful && (
          <div>
            <Result
              status="success"
              title="Registration successful!"
              extra={<div>Please confirm you email {email}</div>}
            />
          </div>
        )}
      </Modal>
    </>
  )
}
