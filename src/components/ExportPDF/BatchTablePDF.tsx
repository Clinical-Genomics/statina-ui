import React, { useContext, useEffect, useState } from 'react'
import jsPDF from 'jspdf'
import 'jspdf-autotable'
import { Tooltip } from 'antd'
import { ErrorNotification, SuccessNotification } from '../../services/helpers/helpers'
/* import Plotly from 'plotly.js' i was using this previously */
import Plot, { ScatterData, Layout } from 'react-plotly.js'
import { useLocation } from 'react-router-dom'
import { getBatchSamples } from '../../services/StatinaApi'
import { UserContext } from '../../services/userContext'
import html2canvas from 'html2canvas'
import { getFetalFractionXYGraph } from '../../services/StatinaApi'
import { FetalFractionXYGraph } from '../../services/interfaces'

type FetalFractionXYGraphProps = {
  batchId: string
  chromosome: number
}

const buildData = (response: FetalFractionXYGraph): ScatterData[] => {
  const data: ScatterData[] = [
    {
      y: response.control?.FFY,
      x: response.control?.FFX,
      text: response.control?.names,
      name: `Negative N=${response.control?.count}`,
      mode: 'markers',
      type: 'scatter',
      marker: { color: '#ccccb3' },
    },
  ]
  response.cases?.names?.forEach((name, index) => {
    data.push({
      y: [response.cases?.FFY[index]],
      x: [response.cases?.FFX[index]],
      name: name,
      mode: 'markers',
      text: name,
      type: 'scatter',
    })
  })

  Object.keys(response.sex_thresholds).forEach((threshold) => {
    data.push({
      x: response.sex_thresholds[threshold].x,
      y: response.sex_thresholds[threshold].y,
      mode: 'lines',
      showlegend: false,
      text: response.sex_thresholds[threshold].text,
      line: {
        dash: 'dot',
        color: 'red',
        width: 1,
      },
      name: threshold,
    })
  })

  Object.keys(response?.abnormal).forEach((abnormal) => {
    Object.keys(response.abnormal[abnormal]).forEach((status) => {
      data.push({
        name: `${abnormal} ${status} ${response.abnormal[abnormal][status].count}`,
        y: response.abnormal[abnormal][status]?.FFY,
        x: response.abnormal[abnormal][status]?.FFX,
        text: response.abnormal[abnormal][status]?.names,
        mode: 'markers',
        marker: {
          line: { width: 2 },
          size: 7,
          symbol: 'circle-open',
          type: 'scatter',
        },
      })
    })
  })
  return data
}

const buildLayout = (response: FetalFractionXYGraph): Layout => {
  return {
    annotations: [],
    autosize: false,
    width: 1100,
    height: 700,
    legend: { hovermode: 'closest', orientation: 'v' },
    hovermode: 'closest',
    xaxis: {
      range: [response.max_x, response.min_x],
      showline: true,
      zeroline: false,
      linecolor: '#636363',
      linewidth: 5,
      showgrid: false,
      gridcolor: '#bdbdbd',
      title: 'Fetal Fraction X',
    },
    yaxis: {
      zeroline: false,
      showline: true,
      showgrid: false,
      linecolor: '#636363',
      linewidth: 5,
      title: 'Fetal Fraction Y',
    },
  }
}

export const BatchTablePDF = ({ batchId }: FetalFractionXYGraphProps) => {
  const [imgURI, setImgURI] = useState('')
  const [samples, setSamples] = useState<any[]>([])
  const [data, setData] = useState<ScatterData[]>()
  const [layout, setLayout] = useState<Layout>()
  const pageSize = 0
  const pageNum = 0
  const userContext = useContext(UserContext)
  useEffect(() => {
    getFetalFractionXYGraph(batchId, userContext).then((response: FetalFractionXYGraph) => {
      setData(buildData(response))
      setLayout(buildLayout(response))
    })
  }, [])

  Plot.newPlot('hiddenDiv', data, layout)
    .then((gd) => {
      return Plot.toImage(gd, {
        format: 'png',
        height: 600,
        width: 1200,
      })
    })
    .then((dataURI) => {
      setImgURI(dataURI)
    })
  const exportPDF = () => {
    if (samples === undefined || samples.length == 0) {
      ErrorNotification({
        type: 'error',
        message: 'Download failed!',
        description: 'There is no data to download!',
      })
    } else {
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

      // convert image to base64
      /* const printArea = document.getElementById('hiddenDiv2') as HTMLInputElement
      console.log(printArea)
      html2canvas(printArea).then((canvas) => {
        const imgWidth = 208
        const imgHeight = (canvas.height * imgWidth) / canvas.width
        const imgData = canvas.toDataURL()
        setImgURI(imgData)
        console.log(imgData)
      }) */

      doc.setFontSize(20)
      doc.text(title, marginLeft, 20)
      doc.setTextColor(105, 105, 105)
      doc.setFontSize(12)
      doc.text(batchNum, marginLeft, 40)
      doc.setTextColor(0, 0, 0)
      /* doc.autoTable(content) */
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
