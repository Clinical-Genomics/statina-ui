import React, { useContext, useState } from 'react'
import { Button, Form, Input, Modal, Result, Tooltip } from 'antd'
import { PlusOutlined } from '@ant-design/icons'
import { postDataset } from '../../services/StatinaApi'
import { UserContext } from '../../services/userContext'

export const NewDatasetModal = ({ updateDatasets }) => {
  const userContext = useContext(UserContext)
  const [isModalVisible, setIsModalVisible] = useState(false)
  const [isRegistrationSuccessful, setIsRegistrationSuccessful] = useState(false)

  const showModal = () => {
    setIsModalVisible(true)
  }

  const registerDataset = (dataset) => {
    postDataset('etetet', dataset, userContext).then((response) => {
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
      <Modal
        title="Add new dataset"
        visible={isModalVisible}
        onCancel={handleCancel}
        maskClosable={false}
      >
        {!isRegistrationSuccessful && (
          <Form name="basic" onFinish={registerDataset} autoComplete="off">
            <Form.Item
              name="Dataset name"
              rules={[
                {
                  required: true,
                },
              ]}
            >
              <Input placeholder="name" />
            </Form.Item>
            <Button htmlType="submit" type={'primary'}>
              Add dataset
            </Button>
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
