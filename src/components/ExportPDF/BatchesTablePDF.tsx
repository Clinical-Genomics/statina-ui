import React, { useContext, useState, useEffect } from 'react'
import { UserContext } from '../../services/userContext'
import { getBatches } from '../../services/StatinaApi'
import { Batch } from 'services/interfaces'
import jsPDF from 'jspdf'
import { Tooltip } from 'antd'
import { ErrorNotification, SuccessNotification } from 'services/helpers/helpers'

export function BatchesTablePDF() {
  const [batches, setBatches] = useState<Batch[]>([])
  const userContext = useContext(UserContext)

  useEffect(() => {
    getBatches(userContext, 0, 0).then((batches) => setBatches(batches.documents))
  }, [])

  const exportPDF = () => {
    if (batches.length == 0) {
      ErrorNotification({
        type: 'error',
        message: 'Download failed!',
        description: 'There is no data to download!',
      })
    } else {
      const unit = 'pt'
      const size = 'A4'
      const orientation = 'portrait'

      const marginLeft = 40
      const doc = new jsPDF(orientation, unit, size) as any

      doc.setFontSize(15)

      const title = 'Statina - NIPT Batches'
      const headers = [['Batch_ID', 'Sequencing_Date', 'Flowcell_ID']]

      const data = batches.map((item) => [item.batch_id, item.sequencing_date, item.flowcell])

      const content = {
        startY: 50,
        head: headers,
        body: data,
        theme: 'grid',
      }

      doc.text(title, marginLeft, 40)
      doc.autoTable(content)
      doc.save('Statina.pdf')
      SuccessNotification({
        type: 'success',
        message: 'Download successfully!',
      })
    }
  }
  return (
    <Tooltip title="Export to PDF">
      <span onClick={(e) => exportPDF()}>PDF</span>
    </Tooltip>
  )
}