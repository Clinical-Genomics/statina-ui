import React, { useContext, useEffect, useState } from 'react'
import { Button, Card, Descriptions, Form, Input, Typography } from 'antd'
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
import { BasicDataset } from 'services/interfaces'

export function DatasetPage() {
  const [edit, setEdit] = useState<boolean>(false)
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [error, setError] = useState<any>()
  const [dataset, setDataset] = useState<BasicDataset>()
  const { pathname } = useLocation()
  const userContext = useContext(UserContext)
  const { permissions } = userContext
  const datasetName = pathname.substring(pathname.lastIndexOf('/') + 1, pathname.length)
  const [form] = Form.useForm()
  const { Title } = Typography

  type Dataset = Array<keyof BasicDataset>
  const datasetKeys: Dataset = Object.keys(new BasicDataset()) as Dataset

  useEffect(() => {
    getDataset(userContext, datasetName)
      .then((dataset) => {
        setDataset(dataset)
        setIsLoading(false)
      })
      .catch((error) => {
        setIsLoading(false), setError(error)
      })
  }, [datasetName, userContext])

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
                    {permissions?.includes('RW') && (
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
                    )}
                  </>
                }
              >
                {dataset &&
                  datasetKeys.reverse().map((entry) => (
                    <Descriptions.Item key={entry} label={capitalizeFirstLetter(entry)}>
                      <Form.Item name={entry}>
                        <Input
                          disabled={!edit}
                          bordered={edit}
                          type={typeof dataset[entry]}
                          style={{
                            color: '#000000d9',
                            backgroundColor: '#fff',
                          }}
                        />
                      </Form.Item>
                    </Descriptions.Item>
                  ))}
              </Descriptions>
            </Form>
          </Card>
        </>
      )}
      {error && <ErrorPage error={error} />}
    </>
  )
}
