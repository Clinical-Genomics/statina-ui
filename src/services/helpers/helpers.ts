import { Notification } from '../interfaces'
import { notification } from 'antd'
import { AxiosError } from 'axios'
import Cookies from 'universal-cookie'

const userCookie = 'statinaUser'

export const ErrorNotification = ({ type, message, description }: Notification) => {
  const key = `open${Date.now()}`
  notification[type]({
    message,
    description,
    btn: null,
    key,
    closeIcon: null,
    duration: 0,
  })
}

export const SuccessNotification = ({ type, message, description }: Notification) => {
  const key = `open${Date.now()}`
  notification[type]({
    message,
    description,
    btn: null,
    key,
    closeIcon: null,
    duration: 2,
  })
}

export const createErrorNotification = (error: AxiosError) => {
  const { errorMessage, errorDescription } = createErrorMessage(error)
  ErrorNotification({
    type: 'error',
    message: errorMessage,
    description: errorDescription,
  })
}

export const createErrorMessage = (error: AxiosError) => {
  switch (error?.response?.status) {
    case 403:
      return {
        errorMessage: `${error?.message}`,
        errorDescription: `You don't have permissions to access the data from ${error?.config?.url}`,
      }
    case 401:
      return {
        errorMessage: `${error?.response?.data?.detail}`,
        errorDescription: `Login failed, wrong credentials or no permissions. Try to login again`,
      }
    case 409:
      return {
        errorMessage: `${error?.response?.data}`,
        errorDescription: `Could not submit request`,
      }
    case 500:
      return {
        errorMessage: 'Something went wrong in the backend',
        errorDescription: `${error?.message} ${error?.config?.url}`,
      }
    default:
      return {
        errorMessage: `Could not fetch data from backend, make sure you are connected to the VPN`,
        errorDescription: `${error?.message} ${error?.config?.url}`,
      }
  }
}

export const dateToNumber = (date: string) => {
  const re = new RegExp('-', 'g')
  return parseInt(date.replace(re, ''))
}

export const sortDate = (dateA: string, dateB: string) => {
  return dateToNumber(dateA) - dateToNumber(dateB)
}

export const windowMatchMedia = () => {
  return (
    window.matchMedia ||
    function () {
      return {
        matches: false,
        addListener: () => null,
        removeListener: () => null,
      }
    }
  )
}

export const getUserRole = (scopes: string[]): string => {
  if (scopes.includes('admin')) return 'Admin role'
  else if (scopes.includes('RW')) return 'Read/Write role'
  else if (scopes.includes('R')) return 'Read role'
  else if (scopes.includes('inactive')) return 'Inactive user'
  else if (scopes.includes('unconfirmed')) return 'Unconfirmed email'
  return ''
}

export const setCookies = (user, cookieName = userCookie) => {
  const cookies = new Cookies()
  cookies.set(cookieName, JSON.stringify(user), { path: '/', secure: true })
}

export const getCookies = (cookieName = userCookie) => {
  const cookies = new Cookies()
  cookies.get(cookieName)
  return new Promise((resolve, reject) => {
    const cookie = cookies.get(cookieName)
    if (cookie?.access_token) resolve(cookie)
    else reject('No cookie found')
  })
}

export const removeCookies = (cookieName = userCookie) => {
  const cookies = new Cookies()
  cookies.remove(cookieName)
}
