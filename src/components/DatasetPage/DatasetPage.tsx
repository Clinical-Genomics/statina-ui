import React, { useContext, useEffect, useState } from 'react'
import { Card, Descriptions, Typography } from 'antd'
import { Loading } from 'components/Loading'
import { useLocation } from 'react-router-dom'
import { getDataset } from 'services/StatinaApi'
import { UserContext } from 'services/userContext'
import { ErrorPage } from 'pages/Error/ErrorPage'

export function DatasetPage() {
  const [dataset, setDataset] = useState<any>()
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [error, setError] = useState<any>()
  const { pathname } = useLocation()
  const userContext = useContext(UserContext)
  const datasetName = pathname.substring(pathname.lastIndexOf('/') + 1, pathname.length)
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

  return isLoading ? (
    <Loading />
  ) : (
    <>
      {!error && (
        <>
          <Title>Dataset {dataset.name}</Title>
          <Card>
            <Descriptions bordered column={3} labelStyle={{ fontWeight: 'bold' }} size="small">
              <Descriptions.Item label="Fetal fraction preface">
                {dataset.fetal_fraction_preface}
              </Descriptions.Item>
              <Descriptions.Item label="Fetal fraction y for trisomy">
                {dataset.fetal_fraction_y_for_trisomy}
              </Descriptions.Item>
              <Descriptions.Item label="Fetal fraction y max">
                {dataset.fetal_fraction_y_max}
              </Descriptions.Item>
              <Descriptions.Item label="Fetal fraction y min">
                {dataset.fetal_fraction_y_min}
              </Descriptions.Item>
              <Descriptions.Item label="Fetal fraction XXX">
                {dataset.fetal_fraction_XXX}
              </Descriptions.Item>
              <Descriptions.Item label="Fetal fraction X0">
                {dataset.fetal_fraction_X0}
              </Descriptions.Item>
              <Descriptions.Item label="Y axis min">{dataset.y_axis_min}</Descriptions.Item>
              <Descriptions.Item label="Y axis max">{dataset.y_axis_max}</Descriptions.Item>
              <Descriptions.Item label="K upper">{dataset.k_upper}</Descriptions.Item>
              <Descriptions.Item label="K lower">{dataset.k_lower}</Descriptions.Item>
              <Descriptions.Item label="M lower">{dataset.m_lower}</Descriptions.Item>
              <Descriptions.Item label="M upper">{dataset.m_upper}</Descriptions.Item>
              <Descriptions.Item label="Trisomy soft max">
                {dataset.trisomy_soft_max}
              </Descriptions.Item>
              <Descriptions.Item label="Trisomy hard max">
                {dataset.trisomy_hard_max}
              </Descriptions.Item>
              <Descriptions.Item label="Trisomy hard min">
                {dataset.trisomy_hard_min}
              </Descriptions.Item>
              <Descriptions.Item label="Comment" span={3}>
                {dataset.comment}
              </Descriptions.Item>
            </Descriptions>
          </Card>
        </>
      )}
      {error && <ErrorPage error={error} />}
    </>
  )
}
