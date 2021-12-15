import { Notification } from '../interfaces'
import { notification } from 'antd'
import { AxiosError } from 'axios'
import Cookies from 'universal-cookie'
import { userCookie } from './constants'
import { isNil } from 'ramda'

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
    case 400:
      return {
        errorMessage: `${error?.message}`,
      }
    case 401:
      return {
        errorMessage: `${error?.message}`,
        errorDescription: `Login failed, wrong credentials or no permissions. Try to login again`,
      }
    case 403:
      return {
        errorMessage: `${error?.message}`,
        errorDescription: `You don't have permissions to access the data from ${error?.config?.url}`,
      }
    case 404:
      return {
        errorMessage: `${error?.message}`,
        errorDescription: `Not found`,
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

export const getUserRole = (scopes: string[] = ['']): string => {
  if (scopes.includes('admin')) return userRoles.admin.name
  else if (scopes.includes('RW')) return userRoles.RW.name
  else if (scopes.includes('R')) return userRoles.R.name
  else if (scopes.includes('inactive')) return userRoles.inactive.name
  else if (scopes.includes('unconfirmed')) return userRoles.unconfirmed.name
  return ''
}

export const isUserUnconfirmed = (scopes: string[] = ['']): boolean => {
  return getUserRole(scopes) === userRoles.unconfirmed.name
}
export const isUserInactive = (scopes: string[] = ['']): boolean => {
  return getUserRole(scopes) === userRoles.inactive.name
}

export const userRoles = {
  admin: { name: 'Admin role', emailConfirmed: true, adminConfirmed: true },
  RW: { name: 'Read/Write role', emailConfirmed: true, adminConfirmed: true },
  R: { name: 'Read role', emailConfirmed: true, adminConfirmed: true },
  inactive: { name: 'Inactive user', emailConfirmed: false, adminConfirmed: true },
  unconfirmed: { name: 'Unconfirmed email', emailConfirmed: true, adminConfirmed: false },
}

export const setCookies = (user, cookieName = userCookie) => {
  const cookies = new Cookies()
  cookies.set(cookieName, JSON.stringify(user), { path: '/', secure: true })
}

export const getCookies = (cookieName = userCookie) => {
  const cookies = new Cookies()
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

export const escapeRegExp = (input) => {
  return input.replace(/[^A-Za-z0-9 _]/g, '\\$&')
}

export const createFileDownload = (response) => {
  const fileBlob: Blob = new Blob([response.data])
  const url = window.URL.createObjectURL(fileBlob)
  const link = document.createElement('a')
  link.href = url
  const fileName = response.headers['content-disposition']
    ?.split('filename=')[1]
    .replace(/['"]+/g, '')
  link.setAttribute('download', fileName || 'statina-report')
  document.body.appendChild(link)
  link.click()
}

export const handleBackendError = (error, reject, logout?) => {
  createErrorNotification(error)
  if (error?.response?.status === 401 && logout) {
    logout()
    SuccessNotification({
      type: 'info',
      message: 'You were logged out',
      description: 'Login again to browse the data',
    })
  }
  reject(error)
}

export const createParamURL = (url, params): URL => {
  Object.keys(params)
    .filter((param) => !isNil(params[param]))
    .map((definedParam) => {
      url = url.concat(`&${definedParam}=${params[definedParam]}`)
    })
  return url
}
