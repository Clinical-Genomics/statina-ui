import React, { useContext, useEffect, useState } from 'react'
import { BatchesTable } from 'components/BatchesTable/BatchesTable'
import { Batch } from 'services/interfaces'
import { getBatches } from '../../services/StatinaApi'
import { UserContext } from '../../services/userContext'

export const BatchesPage = () => {
  const [batches, setBatches] = useState<Batch[]>([])
  const userContext = useContext(UserContext)
  useEffect(() => {
    getBatches(userContext).then((batches) => setBatches(batches))
  }, [])
  return (
    <>
      <BatchesTable batches={batches}></BatchesTable>
    </>
  )
}
