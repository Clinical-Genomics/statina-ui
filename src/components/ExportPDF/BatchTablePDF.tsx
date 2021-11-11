import React, { useContext, useEffect, useState } from 'react'
import jsPDF from 'jspdf'
import 'jspdf-autotable'
import { Button, Tooltip } from 'antd'
import { ErrorNotification, SuccessNotification } from '../../services/helpers/helpers'
import Plotly from 'plotly.js'
import { getBatchSamples, getFetalFractionXYGraph } from '../../services/StatinaApi'
import { UserContext } from '../../services/userContext'
import { CloudDownloadOutlined } from '@ant-design/icons'
import { batch } from 'react-redux'
import ReactDOM from 'react-dom'
import Plot, { ScatterData, Layout } from 'react-plotly.js'
import { FetalFractionXYGraph } from '../../services/interfaces'
import { buildData, buildLayout } from '../FetalFractionXYGraph/FetalFractionXY'

export const BatchTablePDF = ({ batchId }) => {
  const [data, setData] = useState<ScatterData[]>()
  const [layout, setLayout] = useState<Layout>()
  const userContext = useContext(UserContext)

  useEffect(() => {
    getFetalFractionXYGraph(batchId, userContext).then((response: FetalFractionXYGraph) => {
      setData(buildData(response))
      setLayout(buildLayout(response))
    })
  }, [])

  const exportPDF = () => {
    getBatchSamples(userContext, batchId, 0, 0, '').then(({ documents }) => {
      const graph = document.getElementById('eheh')
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

      const pdfData = documents.map((item) => [
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
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      Plotly.newPlot(graph, data, layout)

      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      Plotly.toImage(graph, {
        format: 'png',
        width: 800,
        height: 600,
      })
        .then(function (dataUrl) {
          doc.setFontSize(40)
          doc.addImage(dataUrl, 'png', 15, 40, 180, 160)
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
            description: error.message,
          })
        })
    })
  }
  return (
    <Button type="primary" onClick={(e) => exportPDF()}>
      Batch Report
      <CloudDownloadOutlined />
      <div hidden>
        <div id={'eheh'} style={{ zIndex: 10000 }}></div>
      </div>
    </Button>
  )
}
