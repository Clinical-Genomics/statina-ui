import React, { useEffect } from 'react'
import styles from './App.module.css'
import './index.css'
import { Layout, Menu, Button, Dropdown } from 'antd'
import { Link, useLocation } from 'react-router-dom'
import { datasetsPath, Routes } from './components/Routes'
import Logo from './assets/logo.png'
import Footer from './components/Footer/Footer'
import { UserContext } from 'services/userContext'
import { ProfileDropdown } from './components/ProfileDropdown/ProfileDropdown'
import { DownOutlined, ToolFilled } from '@ant-design/icons'
import {
  getCookies,
  isUserInactive,
  isUserUnconfirmed,
  removeCookies,
  setCookies,
} from './services/helpers/helpers'
import { Loading } from './components/Loading'
import { UnconfirmedResult } from './components/NoPermissonResults/UnconfirmedResult'
import { InactiveResult } from './components/NoPermissonResults/InactiveResult'

const { Header, Content } = Layout
export const App = () => {
  const [isLoading, setIsLoading] = React.useState<boolean>(true)
  const [user, setUser] = React.useState<any>()
  const [token, setToken] = React.useState<any>()
  const location = useLocation()

  useEffect(() => {
    getCookies()
      .then((userCookie) => {
        initializeUserContext(userCookie)
        setIsLoading(false)
      })
      .catch(() => {
        setIsLoading(false)
      })
  }, [])

  const initializeUserContext = (user) => {
    setToken(user?.access_token)
    setUser(user)
    setCookies(user)
  }

  const logout = () => {
    setToken(null)
    removeCookies()
  }

  return (
    <div className="app">
      <UserContext.Provider
        value={{
          initializeUserContext,
          logout,
          token: token,
          username: user?.username,
          email: user?.email,
          permissions: user?.scopes,
        }}
      >
        <Layout style={{ minHeight: '100vh' }}>
          <Header className={styles.header}>
            <img className={styles.logo} src={Logo} alt={'Small CG logo'} />
            <Menu
              theme="dark"
              mode="horizontal"
              defaultSelectedKeys={['home']}
              selectedKeys={[location.pathname]}
              items={[
                {
                  key: '/batches',
                  disabled: !token,
                  label: (
                    <Link to="/batches">
                      <span>Batches</span>
                    </Link>
                  ),
                },
                {
                  key: '/samples',
                  disabled: !token,
                  label: (
                    <Link to="/samples">
                      <span>Samples</span>
                    </Link>
                  ),
                },
                {
                  key: '/statistics',
                  disabled: !token,
                  label: (
                    <Link to="/statistics">
                      <span>Quality Control</span>
                    </Link>
                  ),
                },
                {
                  key: `/${datasetsPath}`,
                  disabled: !token,
                  label: (
                    <Link to={`/${datasetsPath}`}>
                      <span>Datasets</span>
                    </Link>
                  ),
                },
                ...(user?.scopes?.includes('admin')
                  ? [
                      {
                        key: '/admin',
                        disabled: !token,
                        label: (
                          <Link to="/admin">
                            Admin <ToolFilled />
                          </Link>
                        ),
                      },
                    ]
                  : []),
                ...(!!token && !!user?.username
                  ? [
                      {
                        key: '/user',
                        disabled: !token,
                        style: { marginLeft: 'auto' },
                        label: (
                          <Dropdown
                            menu={{
                              items: [
                                {
                                  key: 'profile',
                                  label: <ProfileDropdown user={user} logout={logout} />,
                                },
                              ],
                            }}
                          >
                            <Button type="primary">
                              {user?.username} <DownOutlined />
                            </Button>
                          </Dropdown>
                        ),
                      },
                    ]
                  : []),
              ]}
            />
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
              {!isLoading && !isUserInactive(user?.scopes) && !isUserUnconfirmed(user?.scopes) && (
                <Routes isLoggedIn={!!token} />
              )}
              {isLoading && !isUserInactive(user?.scopes) && !isUserUnconfirmed(user?.scopes) && (
                <Loading />
              )}
              {isUserInactive(user?.scopes) && <InactiveResult />}
              {isUserUnconfirmed(user?.scopes) && <UnconfirmedResult />}
            </div>
          </Content>
          <Footer />
        </Layout>
      </UserContext.Provider>
    </div>
  )
}
