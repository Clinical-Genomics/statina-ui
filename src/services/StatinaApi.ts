import { createErrorNotification } from './helpers/helpers'
import { Login } from './interfaces'
const { REACT_APP_BACKEND_URL } = process.env

const axios = require('axios').default

const axiosGET = (endPoint, token) => {
  return new Promise((resolve, reject) => {
    axios
      // .get(endPoint, { headers: { Authorization: `Bearer ${token}` } })
      .get(endPoint)
      .then(function (response) {
        resolve(response.data)
      })
      .catch(function (error) {
        reject(error)
        createErrorNotification(error)
      })
  })
}

const axiosGetToken = (endPoint, formInput) => {
  return new Promise((resolve, reject) => {
    const params = new URLSearchParams(formInput)

    axios
      // .get(endPoint, { headers: { Authorization: `Bearer ${token}` } })
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

export const getBatches = async (): Promise<any> => {
  const endPoint = `${REACT_APP_BACKEND_URL}/batches`
  return axiosGET(endPoint, null)
}

export const getBatch = async (batchId: string): Promise<any> => {
  const endPoint = `${REACT_APP_BACKEND_URL}/batches/${batchId}`
  return axiosGET(endPoint, null)
}

export const login = async (formInput: Login): Promise<any> => {
  const endPoint = `${REACT_APP_BACKEND_URL}/token`
  return axiosGetToken(endPoint, formInput)
}
