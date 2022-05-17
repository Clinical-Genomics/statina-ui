import React, { useContext, useEffect, useState } from 'react'
import { Button, Card, Descriptions, Form, Input, InputNumber, Typography } from 'antd'
import { Loading } from 'components/Loading'
import { useLocation } from 'react-router-dom'
import { editDataset, getDataset } from 'services/StatinaApi'
import { UserContext } from 'services/userContext'
import { ErrorPage } from 'pages/Error/ErrorPage'
import {
  capitalizeFirstLetter,
  objectToString,
  SuccessNotification,
} from 'services/helpers/helpers'
import { Dataset } from 'services/interfaces'

export function DatasetPage() {
  const [edit, setEdit] = useState<boolean>(false)
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [error, setError] = useState<any>()
  const [dataset, setDataset] = useState<Dataset>()
  const { pathname } = useLocation()
  const userContext = useContext(UserContext)
  const datasetName = pathname.substring(pathname.lastIndexOf('/') + 1, pathname.length)
  const [form] = Form.useForm()
  const { Title } = Typography

  useEffect(() => {
    getDataset(userContext, datasetName)
      .then((dataset) => {
        setDataset(dataset)
        setIsLoading(false)
      })
      .catch((error) => {
        setIsLoading(false), setError(error)
      })
  }, [])

  const editButton = () => {
    setEdit((value) => !value)
  }

  const onFinish = (values: any) => {
    setEdit((value) => !value)
    const editedDataset = objectToString(values)
    editDataset(datasetName, editedDataset, userContext)
      .then(() => {
        SuccessNotification({
          type: 'success',
          message: 'Dataset updated',
        })
      })
      .catch((error) => {
        setIsLoading(false), setError(error)
      })
  }

  return isLoading ? (
    <Loading />
  ) : (
    <>
      {!error && (
        <>
          <Title>Dataset {datasetName}</Title>
          <Card>
            <Form
              layout="inline"
              onFinish={onFinish}
              form={form}
              initialValues={{
                ...dataset,
              }}
            >
              <Descriptions
                bordered
                column={3}
                labelStyle={{ fontWeight: 'bold' }}
                size="small"
                style={{ width: '100%' }}
                extra={
                  <>
                    <Form.Item style={edit ? { display: 'none' } : { margin: 0 }}>
                      <Button htmlType="button" onClick={editButton} type="primary">
                        Edit
                      </Button>
                    </Form.Item>
                    <Form.Item style={!edit ? { display: 'none' } : { margin: 0 }}>
                      <Button htmlType="submit" type="primary">
                        Save
                      </Button>
                    </Form.Item>
                  </>
                }
              >
                {dataset &&
                  Object.keys(dataset)
                    .reverse()
                    .map(
                      (key) =>
                        key !== 'name' && (
                          <Descriptions.Item
                            key={key}
                            label={capitalizeFirstLetter(key)}
                            span={key === 'comment' ? 3 : 1}
                          >
                            <Form.Item name={key}>
                              {key === 'comment' ? (
                                <Input
                                  disabled={!edit}
                                  bordered={edit}
                                  style={{
                                    color: '#000000d9',
                                    backgroundColor: '#fff',
                                  }}
                                />
                              ) : (
                                <InputNumber
                                  disabled={!edit}
                                  bordered={edit}
                                  style={{
                                    color: '#000000d9',
                                    backgroundColor: '#fff',
                                  }}
                                />
                              )}
                            </Form.Item>
                          </Descriptions.Item>
                        )
                    )}
              </Descriptions>
            </Form>
          </Card>
        </>
      )}
      {error && <ErrorPage error={error} />}
    </>
  )
}
