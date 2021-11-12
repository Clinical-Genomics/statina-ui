import React from 'react'
import { BatchesTable } from 'components/BatchesTable/BatchesTable'
import { Typography } from 'antd'

const { Title } = Typography

export const BatchesPage = () => {
  return (
    <>
      <Title>NIPT Batches</Title>
      <BatchesTable></BatchesTable>
    </>
  )
}
