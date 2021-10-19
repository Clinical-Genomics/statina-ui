import React, { useEffect, useState } from 'react'
import jsPDF from 'jspdf'
import 'jspdf-autotable'
import { Tooltip } from 'antd'
import { ErrorNotification, SuccessNotification } from '../../services/helpers/helpers'
import Plotly from 'plotly.js'

type BatchTablePDFProps = {
  pdfData: any[]
  score: string
}

export function BatchTablePDF({ pdfData, score }: BatchTablePDFProps) {
  const [imgURI, setImgURI] = useState('')
  const plotlyData: any[] = [
    {
      name: `Current batch ${pdfData.length}`,
      y: pdfData.map((sample) => sample[score]),
      x: pdfData.map((sample) => sample?.SampleID),
      mode: 'markers',
      type: 'scatter',
    },
  ]
  const layout = {
    /* legend: { hovermode: 'closest' },
    hovermode: 'closest', */
    annotations: [],
    xaxis: {
      showline: true,
      showgrid: true,
    },
    yaxis: {
      range: [-10, 10],
      title: score,
    },
    height: 600,
    width: 1200,
  }
  // Create the ploty in a hidden div in order to convert it to an image
  Plotly.newPlot('hiddenDiv', plotlyData, layout)
    .then((gd) => {
      return Plotly.toImage(gd, {
        format: 'png',
        height: 600,
        width: 1200,
      })
    })
    .then((dataURI) => {
      setImgURI(dataURI)
    })
  const exportPDF = () => {
    if (pdfData === undefined || pdfData.length == 0) {
      ErrorNotification({
        type: 'error',
        message: 'Download failed!',
        description: 'There is no data to download!',
      })
    } else {
      const unit = 'pt'
      const size = 'A4'
      const orientation = 'landscape' // portrait

      const marginLeft = 40
      const doc = new jsPDF(orientation, unit, size) as any

      doc.setFontSize(15)

      const title = 'NIPT Results'
      const batchNum = `Batch: ${pdfData[0].SampleProject}`
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

      const TableData = pdfData.map((item) => [
        item.SampleID,
        item.Zscore_13,
        item.Zscore_18,
        item.Zscore_21,
        item.FetalFractionPreface,
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
        theme: 'striped', // grid, plain, striped

        // Change the background color when there is a text_warning
        didParseCell: function (data) {
          if (
            typeof data.cell.raw == 'string' &&
            data.section === 'body' &&
            data.cell.raw.includes('Zscore_13')
          ) {
            data.cell.styles.fillColor = 'rgb(255, 204, 199)'
            /* console.log(data.row.raw[1]) */
          }
          if (
            typeof data.cell.raw == 'string' &&
            data.section === 'body' &&
            data.cell.raw.includes('Zscore_18')
          ) {
            /* console.log(data.row.raw[2]) */
            data.cell.styles.fillColor = 'rgb(255, 204, 199)'
          }
          if (
            typeof data.cell.raw == 'string' &&
            data.section === 'body' &&
            data.cell.raw.includes('Zscore_21')
          ) {
            /* console.log(data.row.raw[3]) */
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
    }
  }
  return (
    <Tooltip title="Export to PDF">
      <span onClick={(e) => exportPDF()}>Report</span>
    </Tooltip>
  )
}
