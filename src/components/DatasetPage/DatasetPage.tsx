import React, { useContext, useEffect, useState } from 'react'
import { Button, Card, Descriptions, Input, Typography } from 'antd'
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
  const { Paragraph, Title } = Typography

  useEffect(() => {
    getDatasetData()
  }, [])

  const getDatasetData = () => {
    getDataset(userContext, datasetName)
      .then((dataset) => {
        setDataset(dataset)
        setIsLoading(false)
      })
      .catch((error) => {
        setIsLoading(false), setError(error)
      })
  }

  const onChange = (e) => {
    switch (e.target.name) {
      case 'FFP':
        setDataset((prevStat) => ({
          ...prevStat,
          fetal_fraction_preface: Number(e.target.value),
        }))
        break
      case 'FFY_tris':
        setDataset((prevStat) => ({
          ...prevStat,
          fetal_fraction_y_for_trisomy: Number(e.target.value),
        }))
        break
      case 'FFY_max':
        setDataset((prevStat) => ({
          ...prevStat,
          fetal_fraction_y_max: Number(e.target.value),
        }))
        break
      case 'FFY_min':
        setDataset((prevStat) => ({
          ...prevStat,
          fetal_fraction_y_min: Number(e.target.value),
        }))
        break
      case 'FFXXX':
        setDataset((prevStat) => ({
          ...prevStat,
          fetal_fraction_XXX: Number(e.target.value),
        }))
        break
      case 'FFX0':
        setDataset((prevStat) => ({
          ...prevStat,
          fetal_fraction_X0: Number(e.target.value),
        }))
        break
      case 'y_axis_min':
        setDataset((prevStat) => ({
          ...prevStat,
          y_axis_min: Number(e.target.value),
        }))
        break
      case 'y_axis_max':
        setDataset((prevStat) => ({
          ...prevStat,
          y_axis_max: Number(e.target.value),
        }))
        break
      case 'k_upper':
        setDataset((prevStat) => ({
          ...prevStat,
          k_upper: Number(e.target.value),
        }))
        break
      case 'k_lower':
        setDataset((prevStat) => ({
          ...prevStat,
          k_lower: Number(e.target.value),
        }))
        break
      case 'm_lower':
        setDataset((prevStat) => ({
          ...prevStat,
          m_lower: Number(e.target.value),
        }))
        break
      case 'm_upper':
        setDataset((prevStat) => ({
          ...prevStat,
          m_upper: Number(e.target.value),
        }))
        break
      case 'trisomy_soft_max':
        setDataset((prevStat) => ({
          ...prevStat,
          trisomy_soft_max: Number(e.target.value),
        }))
        break
      case 'trisomy_hard_max':
        setDataset((prevStat) => ({
          ...prevStat,
          trisomy_hard_max: Number(e.target.value),
        }))
        break
      case 'trisomy_hard_min':
        setDataset((prevStat) => ({
          ...prevStat,
          trisomy_hard_min: Number(e.target.value),
        }))
        break
      case 'comment':
        setDataset((prevStat) => ({
          ...prevStat,
          comment: e.target.value,
        }))
        break
      default:
        break
    }
  }

  const editButton = () => {
    setEdit((value) => !value)
  }

  const saveButton = () => {
    setEdit((value) => !value)
    const editedDataset = JSON.stringify(dataset)
      .replace(/[{}"]/g, '')
      .replace(/:/g, '=')
      .replace(/,/g, '&')
    editDataset(datasetName, editedDataset, userContext)
      .then(() => {
        getDatasetData()
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
            <Descriptions
              bordered
              column={3}
              labelStyle={{ fontWeight: 'bold' }}
              size="small"
              extra={
                edit ? (
                  <Button onClick={saveButton} type="primary">
                    Save
                  </Button>
                ) : (
                  <Button onClick={editButton} type="primary">
                    Edit
                  </Button>
                )
              }
            >
              <Descriptions.Item label="Fetal fraction preface">
                {edit ? (
                  <Paragraph style={{ margin: 0, width: 30 }}>
                    <Input
                      onChange={onChange}
                      defaultValue={dataset.fetal_fraction_preface}
                      name="FFP"
                      bordered={false}
                      style={{ width: 100, padding: 0 }}
                      type="number"
                    />
                  </Paragraph>
                ) : (
                  <>{dataset.fetal_fraction_preface}</>
                )}
              </Descriptions.Item>
              <Descriptions.Item label="Fetal fraction y for trisomy">
                {edit ? (
                  <Paragraph style={{ margin: 0, width: 30 }}>
                    <Input
                      onChange={onChange}
                      defaultValue={dataset.fetal_fraction_y_for_trisomy}
                      name="FFY_tris"
                      bordered={false}
                      style={{ width: 100, padding: 0 }}
                      type="number"
                    />
                  </Paragraph>
                ) : (
                  <>{dataset.fetal_fraction_y_for_trisomy}</>
                )}
              </Descriptions.Item>
              <Descriptions.Item label="Fetal fraction y max">
                {edit ? (
                  <Paragraph style={{ margin: 0, width: 30 }}>
                    <Input
                      onChange={onChange}
                      defaultValue={dataset.fetal_fraction_y_max}
                      name="FFY_max"
                      bordered={false}
                      style={{ width: 100, padding: 0 }}
                      type="number"
                    />
                  </Paragraph>
                ) : (
                  <>{dataset.fetal_fraction_y_max}</>
                )}
              </Descriptions.Item>
              <Descriptions.Item label="Fetal fraction y min">
                {edit ? (
                  <Paragraph style={{ margin: 0, width: 30 }}>
                    <Input
                      onChange={onChange}
                      defaultValue={dataset.fetal_fraction_y_min}
                      name="FFY_min"
                      bordered={false}
                      style={{ width: 100, padding: 0 }}
                      type="number"
                    />
                  </Paragraph>
                ) : (
                  <>{dataset.fetal_fraction_y_min}</>
                )}
              </Descriptions.Item>
              <Descriptions.Item label="Fetal fraction XXX">
                {edit ? (
                  <Paragraph style={{ margin: 0, width: 30 }}>
                    <Input
                      onChange={onChange}
                      defaultValue={dataset.fetal_fraction_XXX}
                      name="FFXXX"
                      bordered={false}
                      style={{ width: 100, padding: 0 }}
                      type="number"
                    />
                  </Paragraph>
                ) : (
                  <>{dataset.fetal_fraction_XXX}</>
                )}
              </Descriptions.Item>
              <Descriptions.Item label="Fetal fraction X0">
                {edit ? (
                  <Paragraph style={{ margin: 0, width: 30 }}>
                    <Input
                      onChange={onChange}
                      defaultValue={dataset.fetal_fraction_X0}
                      name="FFX0"
                      bordered={false}
                      style={{ width: 100, padding: 0 }}
                      type="number"
                    />
                  </Paragraph>
                ) : (
                  <>{dataset.fetal_fraction_X0}</>
                )}
              </Descriptions.Item>
              <Descriptions.Item label="Y axis min">
                {edit ? (
                  <Paragraph style={{ margin: 0, width: 30 }}>
                    <Input
                      onChange={onChange}
                      defaultValue={dataset.y_axis_min}
                      name="y_axis_min"
                      bordered={false}
                      style={{ width: 100, padding: 0 }}
                      type="number"
                    />
                  </Paragraph>
                ) : (
                  <>{dataset.y_axis_min}</>
                )}
              </Descriptions.Item>
              <Descriptions.Item label="Y axis max">
                {edit ? (
                  <Paragraph style={{ margin: 0, width: 30 }}>
                    <Input
                      onChange={onChange}
                      defaultValue={dataset.y_axis_max}
                      name="y_axis_max"
                      bordered={false}
                      style={{ width: 100, padding: 0 }}
                      type="number"
                    />
                  </Paragraph>
                ) : (
                  <>{dataset.y_axis_max}</>
                )}
              </Descriptions.Item>
              <Descriptions.Item label="K upper">
                {edit ? (
                  <Paragraph style={{ margin: 0, width: 30 }}>
                    <Input
                      onChange={onChange}
                      defaultValue={dataset.k_upper}
                      name="k_upper"
                      bordered={false}
                      style={{ width: 100, padding: 0 }}
                      type="number"
                    />
                  </Paragraph>
                ) : (
                  <>{dataset.k_upper}</>
                )}
              </Descriptions.Item>
              <Descriptions.Item label="K lower">
                {edit ? (
                  <Paragraph style={{ margin: 0, width: 30 }}>
                    <Input
                      onChange={onChange}
                      defaultValue={dataset.k_lower}
                      name="k_lower"
                      bordered={false}
                      style={{ width: 100, padding: 0 }}
                      type="number"
                    />
                  </Paragraph>
                ) : (
                  <>{dataset.k_lower}</>
                )}
              </Descriptions.Item>
              <Descriptions.Item label="M lower">
                {edit ? (
                  <Paragraph style={{ margin: 0, width: 30 }}>
                    <Input
                      onChange={onChange}
                      defaultValue={dataset.m_lower}
                      name="m_lower"
                      bordered={false}
                      style={{ width: 100, padding: 0 }}
                      type="number"
                    />
                  </Paragraph>
                ) : (
                  <>{dataset.m_lower}</>
                )}
              </Descriptions.Item>
              <Descriptions.Item label="M upper">
                {edit ? (
                  <Paragraph style={{ margin: 0, width: 30 }}>
                    <Input
                      onChange={onChange}
                      defaultValue={dataset.m_upper}
                      name="m_upper"
                      bordered={false}
                      style={{ width: 100, padding: 0 }}
                      type="number"
                    />
                  </Paragraph>
                ) : (
                  <>{dataset.m_upper}</>
                )}
              </Descriptions.Item>
              <Descriptions.Item label="Trisomy soft max">
                {edit ? (
                  <Paragraph style={{ margin: 0, width: 30 }}>
                    <Input
                      onChange={onChange}
                      defaultValue={dataset.trisomy_soft_max}
                      name="trisomy_soft_max"
                      bordered={false}
                      style={{ width: 100, padding: 0 }}
                      type="number"
                    />
                  </Paragraph>
                ) : (
                  <>{dataset.trisomy_soft_max}</>
                )}
              </Descriptions.Item>
              <Descriptions.Item label="Trisomy hard max">
                {edit ? (
                  <Paragraph style={{ margin: 0, width: 30 }}>
                    <Input
                      onChange={onChange}
                      defaultValue={dataset.trisomy_hard_max}
                      name="trisomy_hard_max"
                      bordered={false}
                      style={{ width: 100, padding: 0 }}
                      type="number"
                    />
                  </Paragraph>
                ) : (
                  <>{dataset.trisomy_hard_max}</>
                )}
              </Descriptions.Item>
              <Descriptions.Item label="Trisomy hard min">
                {edit ? (
                  <Paragraph style={{ margin: 0, width: 30 }}>
                    <Input
                      onChange={onChange}
                      defaultValue={dataset.trisomy_hard_min}
                      name="trisomy_hard_min"
                      bordered={false}
                      style={{ width: 100, padding: 0 }}
                      type="number"
                    />
                  </Paragraph>
                ) : (
                  <>{dataset.trisomy_hard_min}</>
                )}
              </Descriptions.Item>
              <Descriptions.Item label="Comment" span={3}>
                {edit ? (
                  <Paragraph style={{ margin: 0 }}>
                    <Input
                      onChange={onChange}
                      defaultValue={dataset.comment}
                      name="comment"
                      bordered={false}
                      style={{ padding: 0 }}
                    />
                  </Paragraph>
                ) : (
                  <>{dataset.comment}</>
                )}
              </Descriptions.Item>
            </Descriptions>
          </Card>
        </>
      )}
      {error && <ErrorPage error={error} />}
    </>
  )
}
