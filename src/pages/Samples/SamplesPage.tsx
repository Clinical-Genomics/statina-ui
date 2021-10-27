import React, { useContext, useEffect, useState } from 'react'
import { SamplesTable } from 'components/SamplesTable/SamplesTable'
import { getSamples } from '../../services/StatinaApi'
import { UserContext } from '../../services/userContext'

export const SamplesPage = () => {
  const userContext = useContext(UserContext)
  const [samples, setSamples] = useState<any[]>([])
  const [samplesCount, setSamplesCount] = useState<number>(0)
  const pageSize = 10
  const pageNum = 0

  useEffect(() => {
    getSamples(userContext, pageSize, pageNum).then((samples) => {
      setSamples(samples.documents), setSamplesCount(samples?.document_count)
    })
  }, [])
  return <SamplesTable samples={samples} samplesCount={samplesCount} showBatchInfo></SamplesTable>
}
