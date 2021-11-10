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
import { batch } from 'react-redux'

export const BatchTablePDF = ({ batchId }) => {
  const [imgURI, setImgURI] = useState('')
  const [plotlyScore, setPlotlyScore] = useState('Zscore_13') // The plotly should be changed to a Fetal Fraction
  const userContext = useContext(UserContext)
  const { pathname } = useLocation()

  const exportPDF = () => {
    getBatchSamples(userContext, batchId, 0, 0, '')
      .then(({ documents }) => {
        const unit = 'pt'
        const size = 'A4'
        const orientation = 'landscape'

        const marginLeft = 40
        const doc = new jsPDF(orientation, unit, size) as any

        doc.setFontSize(15)

        const title = `Batch ${batchId} results`
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

        const data = documents.map((item) => [
          item.sample_id,
          item.z_score['13'],
          item.z_score['18'],
          item.z_score['21'],
          item.fetal_fraction?.preface,
          item.fetal_fraction?.x,
          item.fetal_fraction?.y,
          item.sex,
          item.text_warning,
          item.comment,
        ])

        const content = {
          startY: 50,
          head: headers,
          body: data,
          theme: 'grid',
        }

        doc.text(title, marginLeft, 40)
        doc.autoTable(content)
        doc.save(`Statina - batch ${batchId}.pdf`)
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
