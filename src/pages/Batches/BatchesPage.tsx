import React, { useContext, useEffect, useState } from 'react'
import { BatchesTable } from 'components/BatchesTable/BatchesTable'
import { Batch } from 'services/interfaces'
import { getBatches } from '../../services/StatinaApi'
import { UserContext } from '../../services/userContext'
import ReactPaginate from 'react-paginate'
import { LeftOutlined, RightOutlined } from '@ant-design/icons'
import styles from './BatchesPage.module.css'

export const BatchesPage = () => {
  const userContext = useContext(UserContext)
  const [batches, setBatches] = useState<Batch[]>([])
  const [pageCount, setpageCount] = useState(0)
  const pageSize = 20

  useEffect(() => {
    getBatches(userContext, 0, 0).then((batches) => setpageCount(Math.ceil(batches.length / 20)))
    getBatches(userContext, pageSize, 0).then((batches) => setBatches(batches))
  }, [])
  const handlePageClick = async (data) => {
    const currentPage = data.selected + 1
    getBatches(userContext, pageSize, currentPage).then((batches) => setBatches(batches))
  }
  return (
    <>
      <BatchesTable batches={batches}></BatchesTable>
      <ReactPaginate
        previousLabel={<LeftOutlined />}
        nextLabel={<RightOutlined />}
        onPageChange={handlePageClick}
        pageCount={pageCount}
        containerClassName={styles.pagination}
        activeClassName={styles.active}
      />
    </>
  )
}
