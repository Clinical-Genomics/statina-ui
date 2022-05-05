import React, { useState } from 'react'
import { Button, Form, Input, Modal, Result, Tooltip } from 'antd'
import { PlusOutlined } from '@ant-design/icons'
import { postDataset } from '../../services/StatinaApi'

export const NewDatasetModal = ({ updateDatasets }) => {
  const [isModalVisible, setIsModalVisible] = useState(false)
  const [isRegistrationSuccessful, setIsRegistrationSuccessful] = useState(false)

  const showModal = () => {
    setIsModalVisible(true)
  }

  const registerDataset = (dataset) => {
    postDataset('etetet', dataset).then((response) => {
      updateDatasets()
      setIsRegistrationSuccessful(true)
    })
  }

  const handleCancel = () => {
    setIsModalVisible(false)
    setIsRegistrationSuccessful(false)
  }
  return (
    <>
      <Tooltip title={'Add new dataset'}>
        <Button onClick={showModal} type="primary" shape="circle" icon={<PlusOutlined />} />
      </Tooltip>
      <Modal title="Add new dataset" visible={isModalVisible} footer={null} onCancel={handleCancel}>
        {!isRegistrationSuccessful && (
          <Form name="basic" onFinish={registerDataset} autoComplete="off">
            <Form.Item
              name="email"
              rules={[
                {
                  required: true,
                  message: 'Please input an email',
                  type: 'email',
                },
              ]}
            >
              <Input placeholder="Email" />
            </Form.Item>
            <Form.Item
              name="name"
              rules={[
                {
                  required: true,
                  message: `Please input the dataset's full name`,
                },
              ]}
            >
              <Input placeholder="Full name" />
            </Form.Item>
            <Form.Item>
              <Button htmlType="submit" type={'primary'}>
                Add dataset
              </Button>
            </Form.Item>
          </Form>
        )}
        {isRegistrationSuccessful && (
          <div>
            <Result status="success" title="New dataset added!" />
          </div>
        )}
      </Modal>
    </>
  )
}
