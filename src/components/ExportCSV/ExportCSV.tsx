import React, { useContext, useState, useEffect } from 'react'
import { UserContext } from '../../services/userContext'
import { getBatches } from '../../services/StatinaApi'
import { Batch } from 'services/interfaces'
import { Tooltip } from 'antd'
import * as FileSaver from 'file-saver'
import * as XLSX from 'xlsx'
import { ErrorNotification, SuccessNotification } from 'services/helpers/helpers'

export const ExportCSV = ({ fileName }: { fileName: string }) => {
  const [batches, setBatches] = useState<Batch[]>([])
  const userContext = useContext(UserContext)

  useEffect(() => {
    getBatches(userContext, 0, 0).then((batches) => setBatches(batches.documents))
  }, [])
  const fileType = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8'
  const fileExtension = '.xlsx'

  const exportToCSV = (batches: any[], fileName: string) => {
    if (batches === undefined || batches.length == 0) {
      ErrorNotification({
        type: 'error',
        message: 'Download failed!',
        description: 'There is no data to download!',
      })
    } else {
      const exportData = batches.map((item) => ({
        Batch_ID: item.batch_id,
        Sequencing_Date: item.SequencingDate,
        Flowcell_ID: item.Flowcell,
      }))
      const ws = XLSX.utils.json_to_sheet(exportData)
      const wb = { Sheets: { data: ws }, SheetNames: ['data'] }
      const excelBuffer = XLSX.write(wb, { bookType: 'xlsx', type: 'array' })
      const data = new Blob([excelBuffer], { type: fileType })
      FileSaver.saveAs(data, fileName + fileExtension)
      SuccessNotification({
        type: 'success',
        message: 'Download successfully!',
      })
    }
  }
  return (
    <Tooltip title="Export to Excel">
      <span onClick={(e) => exportToCSV(batches, fileName)}>Excel</span>
    </Tooltip>
  )
}
