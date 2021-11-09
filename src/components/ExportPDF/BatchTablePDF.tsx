import React, { useContext, useEffect, useState } from 'react'
import jsPDF from 'jspdf'
import 'jspdf-autotable'
import { Button, Tooltip } from 'antd'
import { ErrorNotification, SuccessNotification } from '../../services/helpers/helpers'
import Plotly from 'plotly.js'
import { useLocation } from 'react-router-dom'
import { getBatchSamples } from '../../services/StatinaApi'
import { UserContext } from '../../services/userContext'
import { CloudDownloadOutlined } from '@ant-design/icons'

export const BatchTablePDF = () => {
  const [imgURI, setImgURI] = useState('')
  const [plotlyScore, setPlotlyScore] = useState('Zscore_13') // The plotly should be changed to a Fetal Fraction
  const pageSize = 0
  const pageNum = 0
  const userContext = useContext(UserContext)
  const { pathname } = useLocation()
  const batchId = pathname.substring(pathname.lastIndexOf('/') + 1, pathname.length)

  const exportPDF = () => {
    getBatchSamples(userContext, batchId, pageSize, pageNum)
      .then((samples) => {
        const unit = 'pt'
        const size = 'A4'
        const orientation = 'landscape'

        const marginLeft = 40
        const doc = new jsPDF(orientation, unit, size) as any

        doc.setFontSize(15)

        const title = 'NIPT Results'
        const batchNum = `Batch: ${samples[0].batch_id}`
        const headers = [
          [
            'Sample',
            'Zscore13',
            'Zscore18',
            'Zscore21',
            'FFPF(%)',
            'FFX(%)',
            'FFY(%)',
            'Sex',
            'Warning',
            'Comment',
          ],
        ]

        const TableData = samples.map((item) => [
          item.sample_id,
          item.Zscore_13,
          item.Zscore_18,
          item.Zscore_21,
          item.FF_Formatted,
          item.FFX,
          item.FFY,
          item.sex,
          item.text_warning,
          item.comment,
        ])

        const content = {
          startY: 50,
          head: headers,
          body: TableData,
          theme: 'striped',

          didParseCell: function (data) {
            if (
              (data.section === 'body' && data.row.raw[8].includes('Zscore_13')) ||
              data.row.raw[8].includes('Zscore_18') ||
              data.row.raw[8].includes('Zscore_21')
            ) {
              data.cell.styles.fillColor = 'rgb(255, 204, 199)'
            }
            if (data.section === 'head') {
              data.cell.styles.fillColor = '#43C59E'
            }
          },
        }

        doc.setFontSize(20)
        doc.text(title, marginLeft, 20)
        doc.setTextColor(105, 105, 105)
        doc.setFontSize(12)
        doc.text(batchNum, marginLeft, 40)
        doc.setTextColor(0, 0, 0)
        doc.autoTable(content)
        doc.addPage()
        doc.text('Fetal Fraction X/Y', marginLeft, 40)
        doc.addImage(imgURI, 'JPEG', 50, 80, 700, 350)
        const pageCount = doc.internal.getNumberOfPages()
        for (let i = 1; i <= pageCount; i++) {
          doc.setPage(i)
          doc.setFontSize(8)
          doc.text(
            'Page ' + String(i) + ' of ' + String(pageCount),
            820 - 20,
            605 - 30,
            null,
            null,
            'right'
          )
        }
        doc.save('Statina.pdf')
        SuccessNotification({
          type: 'success',
          message: 'Download successfully!',
        })
      })
      .catch((error) => {
        ErrorNotification({
          type: 'error',
          message: 'Download failed!',
          description: error,
        })
      })
  }
  return (
    <Button type="primary" onClick={(e) => exportPDF()}>
      Batch Report
      <CloudDownloadOutlined />
    </Button>
  )
}
