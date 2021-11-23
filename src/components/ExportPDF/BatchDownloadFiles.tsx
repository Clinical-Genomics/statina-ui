import React, { useContext } from 'react'
import 'jspdf-autotable'
import { Button } from 'antd'
import { downloadBatchFiles } from '../../services/StatinaApi'
import { UserContext } from '../../services/userContext'
import { CloudDownloadOutlined, LoadingOutlined } from '@ant-design/icons'

export const BatchDownloadFile = ({ batchId, fileType }) => {
  const userContext = useContext(UserContext)
  const [isLoading, setIsLoading] = React.useState<boolean>(false)

  const downloadFile = (batchId) => {
    setIsLoading(true)
    downloadBatchFiles(batchId, fileType, userContext).then((response) => {
      const fileBlob = new Blob([response])
      const url = window.URL.createObjectURL(fileBlob)
      const link = document.createElement('a')
      link.href = url
      link.setAttribute('download', 'fileName')
      document.body.appendChild(link)
      link.click()
      setIsLoading(false)
    })
  }

  return (
    <Button type="primary" onClick={(e) => downloadFile(batchId)}>
      {fileType}
      {isLoading ? <LoadingOutlined /> : <CloudDownloadOutlined />}
    </Button>
  )
}
