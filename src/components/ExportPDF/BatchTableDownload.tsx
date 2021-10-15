import React from 'react'
import { BatchTablePDF } from './BatchTablePDF'
import { DownloadOutlined } from '@ant-design/icons'
import { PDFDownloadLink } from '@react-pdf/renderer'

type SamplesProps = {
  samples: any[]
}

export const CaseReportDownload = ({ samples }: SamplesProps) => {
  return (
    <>
      <PDFDownloadLink document={<BatchTablePDF samples={samples} />} fileName="report.pdf">
        {({ blob, url, loading, error }) =>
          loading ? (
            'Loading document...'
          ) : (
            <DownloadOutlined twoToneColor="#eb2f96" size={900} style={{ fontSize: 20 }} />
          )
        }
      </PDFDownloadLink>
    </>
  )
}
