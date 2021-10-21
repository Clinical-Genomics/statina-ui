import { createErrorNotification } from './helpers/helpers'
import { Login } from './interfaces'
import { UserContext } from './userContext'
const { REACT_APP_BACKEND_URL } = process.env

const axios = require('axios').default

const axiosGET = (endPoint, { token, initializeUser }) => {
  return new Promise((resolve, reject) => {
    axios
      .get(endPoint, { headers: { Authorization: `Bearer ${token}` } })
      .then(function (response) {
        resolve(response.data)
      })
      .catch(function (error) {
        if (error?.response?.status === 401) {
          initializeUser(null)
        }
        reject(error)
        createErrorNotification(error)
      })
  })
}

const axiosGetToken = (endPoint, formInput) => {
  return new Promise((resolve, reject) => {
    const params = new URLSearchParams(formInput)
    axios
      .post(endPoint, params, {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      })
      .then(function (response) {
        resolve(response.data)
      })
      .catch(function (error) {
        reject(error)
        createErrorNotification(error)
      })
  })
}

export const getBatches = async (context: UserContext): Promise<any> => {
  const endPoint = `${REACT_APP_BACKEND_URL}/batches`
  return axiosGET(endPoint, context)
}

export const getBatch = async (batchId: string, context: UserContext): Promise<any> => {
  const endPoint = `${REACT_APP_BACKEND_URL}/batches/${batchId}`
  return axiosGET(endPoint, context)
}

export const login = async (formInput: Login): Promise<any> => {
  const endPoint = `${REACT_APP_BACKEND_URL}/token`
  return axiosGetToken(endPoint, formInput)
}
