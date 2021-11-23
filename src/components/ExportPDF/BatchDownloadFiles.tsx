import React, { useContext } from 'react'
import 'jspdf-autotable'
import { Button } from 'antd'
import { downloadBatchFiles } from '../../services/StatinaApi'
import { UserContext } from '../../services/userContext'
import { CloudDownloadOutlined, LoadingOutlined } from '@ant-design/icons'
import { createFileDownload } from '../../services/helpers/helpers'

export const BatchDownloadFile = ({ batchId, fileType }) => {
  const userContext = useContext(UserContext)
  const [isLoading, setIsLoading] = React.useState<boolean>(false)

  const downloadFile = (batchId, file) => {
    setIsLoading(true)
    downloadBatchFiles(batchId, file, userContext).then((response) => {
      createFileDownload(response)
      setIsLoading(false)
    })
  }

  return (
    <Button type="primary" onClick={(e) => downloadFile(batchId, fileType.type)}>
      {fileType.name}
      {isLoading ? <LoadingOutlined /> : <CloudDownloadOutlined />}
    </Button>
  )
}
