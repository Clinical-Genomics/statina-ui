import React, { useContext, useEffect, useState } from 'react'
import { Button, Card, Descriptions, Form, Input, InputNumber, Typography } from 'antd'
import { Loading } from 'components/Loading'
import { useLocation } from 'react-router-dom'
import { editDataset, getDataset } from 'services/StatinaApi'
import { UserContext } from 'services/userContext'
import { ErrorPage } from 'pages/Error/ErrorPage'
import { SuccessNotification } from 'services/helpers/helpers'

export function DatasetPage() {
  const [edit, setEdit] = useState<boolean>(false)
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [error, setError] = useState<any>()
  const [dataset, setDataset] = useState<any>()
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
    const editedDataset = JSON.stringify(values)
      .replace(/[{}"]/g, '')
      .replace(/:/g, '=')
      .replace(/,/g, '&')
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
                fetal_fraction_preface: dataset?.fetal_fraction_preface,
                trisomy_hard_min: dataset?.trisomy_hard_min,
                y_axis_max: dataset?.y_axis_max,
                k_lower: dataset?.k_lower,
                fetal_fraction_y_min: dataset?.fetal_fraction_y_min,
                fetal_fraction_y_max: dataset?.fetal_fraction_y_max,
                k_upper: dataset?.k_upper,
                m_lower: dataset?.m_lower,
                m_upper: dataset?.m_upper,
                fetal_fraction_X0: dataset?.fetal_fraction_X0,
                fetal_fraction_y_for_trisomy: dataset?.fetal_fraction_y_for_trisomy,
                fetal_fraction_XXX: dataset?.fetal_fraction_XXX,
                y_axis_min: dataset?.y_axis_min,
                trisomy_soft_max: dataset?.trisomy_soft_max,
                trisomy_hard_max: dataset?.trisomy_hard_max,
                comment: dataset?.comment,
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
                <Descriptions.Item label="Fetal fraction preface">
                  <Form.Item name="fetal_fraction_preface">
                    <InputNumber
                      bordered={edit ? true : false}
                      style={!edit ? { color: '#000000d9', backgroundColor: '#fff' } : {}}
                      disabled={!edit ? true : false}
                    />
                  </Form.Item>
                </Descriptions.Item>
                <Descriptions.Item label="Fetal fraction y for trisomy">
                  <Form.Item name="fetal_fraction_y_for_trisomy">
                    <InputNumber
                      bordered={edit ? true : false}
                      style={!edit ? { color: '#000000d9', backgroundColor: '#fff' } : {}}
                      disabled={!edit ? true : false}
                    />
                  </Form.Item>
                </Descriptions.Item>
                <Descriptions.Item label="Fetal fraction y max">
                  <Form.Item name="fetal_fraction_y_max">
                    <InputNumber
                      bordered={edit ? true : false}
                      style={!edit ? { color: '#000000d9', backgroundColor: '#fff' } : {}}
                      disabled={!edit ? true : false}
                    />
                  </Form.Item>
                </Descriptions.Item>
                <Descriptions.Item label="Fetal fraction y min">
                  <Form.Item name="fetal_fraction_y_min">
                    <InputNumber
                      bordered={edit ? true : false}
                      style={!edit ? { color: '#000000d9', backgroundColor: '#fff' } : {}}
                      disabled={!edit ? true : false}
                    />
                  </Form.Item>
                </Descriptions.Item>
                <Descriptions.Item label="Fetal fraction XXX">
                  <Form.Item name="fetal_fraction_XXX">
                    <InputNumber
                      bordered={edit ? true : false}
                      style={!edit ? { color: '#000000d9', backgroundColor: '#fff' } : {}}
                      disabled={!edit ? true : false}
                    />
                  </Form.Item>
                </Descriptions.Item>
                <Descriptions.Item label="Fetal fraction X0">
                  <Form.Item name="fetal_fraction_X0">
                    <InputNumber
                      bordered={edit ? true : false}
                      style={!edit ? { color: '#000000d9', backgroundColor: '#fff' } : {}}
                      disabled={!edit ? true : false}
                    />
                  </Form.Item>
                </Descriptions.Item>
                <Descriptions.Item label="Y axis min">
                  <Form.Item name="y_axis_min">
                    <InputNumber
                      bordered={edit ? true : false}
                      style={!edit ? { color: '#000000d9', backgroundColor: '#fff' } : {}}
                      disabled={!edit ? true : false}
                    />
                  </Form.Item>
                </Descriptions.Item>
                <Descriptions.Item label="Y axis max">
                  <Form.Item name="y_axis_max">
                    <InputNumber
                      bordered={edit ? true : false}
                      style={!edit ? { color: '#000000d9', backgroundColor: '#fff' } : {}}
                      disabled={!edit ? true : false}
                    />
                  </Form.Item>
                </Descriptions.Item>
                <Descriptions.Item label="K upper">
                  <Form.Item name="k_upper">
                    <InputNumber
                      bordered={edit ? true : false}
                      style={!edit ? { color: '#000000d9', backgroundColor: '#fff' } : {}}
                      disabled={!edit ? true : false}
                    />
                  </Form.Item>
                </Descriptions.Item>
                <Descriptions.Item label="K lower">
                  <Form.Item name="k_lower">
                    <InputNumber
                      bordered={edit ? true : false}
                      style={!edit ? { color: '#000000d9', backgroundColor: '#fff' } : {}}
                      disabled={!edit ? true : false}
                    />
                  </Form.Item>
                </Descriptions.Item>
                <Descriptions.Item label="M lower">
                  <Form.Item name="m_lower">
                    <InputNumber
                      bordered={edit ? true : false}
                      style={!edit ? { color: '#000000d9', backgroundColor: '#fff' } : {}}
                      disabled={!edit ? true : false}
                    />
                  </Form.Item>
                </Descriptions.Item>
                <Descriptions.Item label="M upper">
                  <Form.Item name="m_upper">
                    <InputNumber
                      bordered={edit ? true : false}
                      style={!edit ? { color: '#000000d9', backgroundColor: '#fff' } : {}}
                      disabled={!edit ? true : false}
                    />
                  </Form.Item>
                </Descriptions.Item>
                <Descriptions.Item label="Trisomy soft max">
                  <Form.Item name="trisomy_soft_max">
                    <InputNumber
                      bordered={edit ? true : false}
                      style={!edit ? { color: '#000000d9', backgroundColor: '#fff' } : {}}
                      disabled={!edit ? true : false}
                    />
                  </Form.Item>
                </Descriptions.Item>
                <Descriptions.Item label="Trisomy hard max">
                  <Form.Item name="trisomy_hard_max">
                    <InputNumber
                      bordered={edit ? true : false}
                      style={!edit ? { color: '#000000d9', backgroundColor: '#fff' } : {}}
                      disabled={!edit ? true : false}
                    />
                  </Form.Item>
                </Descriptions.Item>
                <Descriptions.Item label="Trisomy hard min">
                  <Form.Item name="trisomy_hard_min">
                    <InputNumber
                      bordered={edit ? true : false}
                      style={!edit ? { color: '#000000d9', backgroundColor: '#fff' } : {}}
                      disabled={!edit ? true : false}
                    />
                  </Form.Item>
                </Descriptions.Item>
                <Descriptions.Item label="Comment" span={3}>
                  <Form.Item name="comment">
                    <Input
                      bordered={edit ? true : false}
                      style={!edit ? { color: '#000000d9', backgroundColor: '#fff' } : {}}
                      disabled={!edit ? true : false}
                    />
                  </Form.Item>
                </Descriptions.Item>
              </Descriptions>
            </Form>
          </Card>
        </>
      )}
      {error && <ErrorPage error={error} />}
    </>
  )
}
