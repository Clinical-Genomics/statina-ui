import React from 'react'
import { createRoot } from 'react-dom/client'
import { App } from './App'
import { BrowserRouter } from 'react-router-dom'
import { ConfigProvider } from 'antd'
import { setTwoToneColor } from '@ant-design/icons'

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
    <BrowserRouter>
      <React.StrictMode>
        <App />
      </React.StrictMode>
    </BrowserRouter>
  </ConfigProvider>
)
