import React, { useContext, useEffect, useState } from 'react'
import { BatchesTable } from 'components/BatchesTable/BatchesTable'
import { Batch } from 'services/interfaces'
import { getBatches } from '../../services/StatinaApi'
import { UserContext } from '../../services/userContext'

export const BatchesPage = () => {
  const userContext = useContext(UserContext)
  const [batches, setBatches] = useState<Batch[]>([])
  const [batchesCount, setBatchesCount] = useState<number>(0)
  const pageSize = 10
  const pageNum = 0

  useEffect(() => {
    getBatches(userContext, pageSize, pageNum).then((batches) => {
      setBatches(batches.documents), setBatchesCount(batches?.document_count)
    })
  }, [])
  return (
    <>
      <BatchesTable batches={batches} batchesCount={batchesCount}></BatchesTable>
    </>
  )
}
