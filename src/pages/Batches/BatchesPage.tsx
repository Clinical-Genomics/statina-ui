import React, { useContext, useEffect, useState } from 'react'
import { BatchesTable } from 'components/BatchesTable/BatchesTable'
import { Batch } from 'services/interfaces'
import { getBatches } from '../../services/StatinaApi'
import { UserContext } from '../../services/userContext'

export const BatchesPage = () => {
  const userContext = useContext(UserContext)
  const [batches, setBatches] = useState<Batch[]>([])

  useEffect(() => {
    getBatches(userContext, 0, 0).then((batches) => setBatches(batches))
  }, [])

  return (
    <>
      <BatchesTable batches={batches}></BatchesTable>
    </>
  )
}
