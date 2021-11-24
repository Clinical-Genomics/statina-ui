import React, { useContext } from 'react'
import { UserContext } from '../../services/userContext'
import { getBatches } from '../../services/StatinaApi'
import { Tooltip } from 'antd'
import * as FileSaver from 'file-saver'
import * as XLSX from 'xlsx'
import { ErrorNotification } from 'services/helpers/helpers'

type BatchesTablePDFProps = {
  fileName: string
  searchValue: string
}

export const ExportCSV = ({ fileName, searchValue }: BatchesTablePDFProps) => {
  const userContext = useContext(UserContext)

  const fileType = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8'
  const fileExtension = '.xlsx'

  const exportToCSV = (fileName: string) => {
    getBatches(userContext, 0, 0, searchValue).then(({ documents }) => {
      if (documents === undefined || documents.length == 0) {
        ErrorNotification({
          type: 'error',
          message: 'Download failed!',
          description: 'There is no data to download!',
        })
      } else {
        const exportData = documents.map((item) => ({
          Batch_ID: item.batch_id,
          Sequencing_Date: item.sequencing_date,
          Flowcell_ID: item.flowcell,
        }))
        const ws = XLSX.utils.json_to_sheet(exportData)
        const wb = { Sheets: { data: ws }, SheetNames: ['data'] }
        const excelBuffer = XLSX.write(wb, { bookType: 'xlsx', type: 'array' })
        const data = new Blob([excelBuffer], { type: fileType })
        FileSaver.saveAs(data, fileName + fileExtension)
      }
    })
  }
  return (
    <Tooltip title="Export to Excel">
      <span onClick={(e) => exportToCSV(fileName)}>Excel</span>
    </Tooltip>
  )
}
