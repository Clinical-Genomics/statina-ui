import React from 'react'
import { createRoot } from 'react-dom/client'
import { App } from '@/App'
import { BrowserRouter } from 'react-router-dom'
import { ConfigProvider } from 'antd'
import { setTwoToneColor } from '@ant-design/icons'
import { getRuntimeConfigValue, validateRuntimeConfig } from '@/runtimeConfig'

validateRuntimeConfig(['VITE_BACKEND_URL'])

const getRouterBaseName = () => {
  const basePath = getRuntimeConfigValue('VITE_BASE_PATH', '/').trim()
  if (basePath === '' || basePath === '/') {
    return undefined
  }

  const normalizedPath = basePath.startsWith('/') ? basePath : `/${basePath}`
  return normalizedPath.replace(/\/+$/, '')
}

const container = document.getElementById('root')
if (!container) {
  throw new Error('Root element not found')
}
const root = createRoot(container)
setTwoToneColor('#16a4f2') // set icons color

root.render(
  <ConfigProvider
    theme={{
      token: {
        colorPrimary: '#43C59E',
        colorLink: '#16a4f2',
        colorTextSecondary: '#000000D9',
      },
      components: {
        Menu: {
          horizontalItemHoverBg: '#43C59E',
          darkItemBg: '#14453d',
        },
        Layout: {
          headerBg: '#14453d',
        },
      },
    }}
  >
    <BrowserRouter
      basename={getRouterBaseName()}
      future={{ v7_startTransition: true, v7_relativeSplatPath: true }}
    >
      <React.StrictMode>
        <App />
      </React.StrictMode>
    </BrowserRouter>
  </ConfigProvider>
)
