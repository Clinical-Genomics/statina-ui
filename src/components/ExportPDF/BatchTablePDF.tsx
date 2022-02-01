import React, { useContext, useEffect, useState } from 'react'
import jsPDF from 'jspdf'
import 'jspdf-autotable'
import { Button } from 'antd'
import { ErrorNotification } from '../../services/helpers/helpers'
import Plotly from 'plotly.js'
import { getSamples, getFetalFractionXYGraph } from '../../services/StatinaApi'
import { UserContext } from '../../services/userContext'
import { CloudDownloadOutlined, LoadingOutlined } from '@ant-design/icons'
import { ScatterData, Layout } from 'react-plotly.js'
import { FetalFractionXYGraph } from '../../services/interfaces'
import {
  buildFFXYGraphData,
  buildFFXYGraphLayout,
  fFXYGraphHeight,
  fFXYGraphWidth,
} from '../FetalFractionXYGraph/FetalFractionXY'

export const BatchTablePDF = ({ batchId, batchComment }) => {
  const [data, setData] = useState<ScatterData[]>()
  const [layout, setLayout] = useState<Layout>()
  const userContext = useContext(UserContext)
  const [isLoading, setIsLoading] = React.useState<boolean>(false)

  const graphId = 'pdf-report-graph'

  useEffect(() => {
    getFetalFractionXYGraph(batchId, userContext).then((response: FetalFractionXYGraph) => {
      setData(buildFFXYGraphData(response))
      setLayout(buildFFXYGraphLayout(response))
    })
  }, [])

  const exportPDF = () => {
    setIsLoading(true)
    getSamples(userContext, 0, 0, batchId, '', 'sample_id', 'ascend').then(({ documents }) => {
      const graph = document.getElementById(graphId)
      const unit = 'pt'
      const size = 'A4'
      const orientation = 'landscape'

      const marginLeft = 40
      const doc = new jsPDF(orientation, unit, size) as any

      doc.setFontSize(15)

      const title = `Batch ${batchId} report`
      const subtitle = `${batchComment}`
      const headers = [
        ['Sample', 'Z_13', 'Z_18', 'Z_21', 'FFPF', 'FFX', 'FFY', 'Sex', 'Warning', 'Comment'],
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

      const contentStart = batchComment ? batchComment.match(/(.{1,100})/g).length * 20 + 50 : 70

      const content = {
        startY: contentStart,
        head: headers,
        body: pdfData,
        theme: 'grid',
        didParseCell: function (data) {
          if (data.section === 'head') {
            data.cell.styles.fillColor = '#43C59E'
          }
        },
      }

      doc.text(title, marginLeft, 40)
      doc.text(subtitle, marginLeft, 60, {
        maxWidth: 750,
      })
      doc.autoTable(content)

      if (graph && data && layout) {
        Plotly.newPlot(graph, data, layout).then((plot) =>
          Plotly.toImage(plot, {
            format: 'png',
            width: fFXYGraphWidth,
            height: fFXYGraphHeight,
            scale: 1,
          })
            .then(function (dataUrl) {
              doc.setFontSize(40)
              doc.addPage()
              doc.addImage(dataUrl, 'png', 0, -20, 790, 600)
              doc.save(`Statina - batch ${batchId}.pdf`)
              setIsLoading(false)
            })
            .catch((error) => {
              ErrorNotification({
                type: 'error',
                message: 'Download failed!',
                description: error.message,
              })
            })
        )
      }
    })
  }
  return (
    <Button type="primary" onClick={() => exportPDF()}>
      Batch Report
      {isLoading ? <LoadingOutlined /> : <CloudDownloadOutlined />}
      <div hidden>
        <div id={graphId}></div>
      </div>
    </Button>
  )
}
