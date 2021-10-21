import React, { useContext, useEffect, useState } from 'react'
import { BatchesTable } from 'components/BatchesTable/BatchesTable'
import { mockBatches } from 'mocks/batches'
import { Batch } from 'services/interfaces'
import { getBatches } from '../../services/StatinaApi'
import { UserContext } from '../../services/userContext'

export const BatchesPage = () => {
  const [batches, setBatches] = useState<Batch[]>([])
  const userContext = useContext(UserContext)
  useEffect(() => {
    getBatches(userContext).then((response) => setBatches(response.batches))
  }, [])
  return (
    <>
      <BatchesTable batches={batches}></BatchesTable>
    </>
  )
}
