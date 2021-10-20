import React from 'react'
import styles from './App.module.css'
import './index.css'
import { Layout, Menu, Button } from 'antd'
import { Link, useLocation } from 'react-router-dom'
import { Routes } from './components/Routes'
import Logo from './assets/logo.png'
import './App.less'
import Footer from './components/Footer/Footer'

const { Header, Content } = Layout
export const App = () => {
  const [isLoaded, setIsLoaded] = React.useState<boolean>(false)

  return (
    <div className="app">
      <Layout style={{ minHeight: '100vh' }}>
        <Header className={styles.header}>
          <img className={styles.logo} src={Logo} alt={'Small CG logo'} />
          <Menu
            theme="dark"
            mode="horizontal"
            defaultSelectedKeys={['home']}
            selectedKeys={[useLocation().pathname]}
          >
            <Menu.Item key="/">
              <Link to="/">
                <span>Home</span>
              </Link>
            </Menu.Item>
            <Menu.Item key="/batches">
              <Link to="/batches">
                <span>Batches</span>
              </Link>
            </Menu.Item>
            <Menu.Item key="/samples">
              <Link to="/samples">
                <span>Samples</span>
              </Link>
            </Menu.Item>
            <Menu.Item key="/statistics">
              <Link to="/statistics">
                <span>Statistics</span>
              </Link>
            </Menu.Item>
            <Menu.Item key="/latest">
              <Link to="/latest">
                <span>Latest updates</span>
              </Link>
            </Menu.Item>
          </Menu>
        </Header>
        <Content
          className={styles.siteLayout}
          style={{
            padding: '0 50px',
            marginTop: 64,
            minHeight: 'calc(100vh - 155px)',
          }}
        >
          <div className={styles.siteLayoutBackground} style={{ padding: 24, minHeight: 380 }}>
            <Routes isLoggedIn={true} />
          </div>
        </Content>
        <Footer />
      </Layout>
    </div>
  )
}
