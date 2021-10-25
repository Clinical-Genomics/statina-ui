import React, { useEffect } from 'react'
import styles from './App.module.css'
import './index.css'
import { Layout, Menu, Button, Dropdown } from 'antd'
import { Link, useLocation } from 'react-router-dom'
import { Routes } from './components/Routes'
import Logo from './assets/logo.png'
import './App.less'
import Footer from './components/Footer/Footer'
import { UserContext } from 'services/userContext'
import { DownOutlined } from '@ant-design/icons'
import { ProfileMenu } from './components/ProfileMenu/ProfileMenu'

const { Header, Content } = Layout
export const App = () => {
  const [isLoaded, setIsLoaded] = React.useState<boolean>(false)
  const [user, setUser] = React.useState<any>()
  const [token, setToken] = React.useState<any>()

  const initializeToken = (token) => {
    setToken(token)
  }

  const initializeUser = (user) => {
    setUser(user)
  }

  const logout = () => {
    setToken(null)
  }

  return (
    <div className="app">
      <UserContext.Provider
        value={{
          user,
          initializeUser: initializeUser,
          initializeToken: initializeToken,
          token: token,
        }}
      >
        <Layout style={{ minHeight: '100vh' }}>
          <Header className={styles.header}>
            <img className={styles.logo} src={Logo} alt={'Small CG logo'} />
            <Menu
              theme="dark"
              mode="horizontal"
              defaultSelectedKeys={['home']}
              selectedKeys={[useLocation().pathname]}
            >
              <Menu.Item key="/batches" disabled={!token}>
                <Link to="/batches">
                  <span>Batches</span>
                </Link>
              </Menu.Item>
              <Menu.Item key="/samples" disabled={!token}>
                <Link to="/samples">
                  <span>Samples</span>
                </Link>
              </Menu.Item>
              <Menu.Item key="/statistics" disabled={!token}>
                <Link to="/statistics">
                  <span>Statistics</span>
                </Link>
              </Menu.Item>
            </Menu>
            {!!token && !!user?.username && (
              <div className={styles.logoutButton}>
                <Dropdown overlay={<ProfileMenu user={user} logout={logout} />} />
              </div>
            )}
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
              <Routes isLoggedIn={!!token} />
            </div>
          </Content>
          <Footer />
        </Layout>
      </UserContext.Provider>
    </div>
  )
}
