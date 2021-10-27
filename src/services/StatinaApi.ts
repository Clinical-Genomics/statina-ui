import { createErrorNotification } from './helpers/helpers'
import { Login, RegisterUser } from './interfaces'
import { UserContext } from './userContext'
const { REACT_APP_BACKEND_URL } = process.env

const axios = require('axios').default

const axiosGET = (endPoint, { token, logout }: UserContext) => {
  return new Promise((resolve, reject) => {
    axios
      .get(endPoint, { headers: { Authorization: `Bearer ${token}` } })
      .then(function (response) {
        resolve(response.data)
      })
      .catch(function (error) {
        if (error?.response?.status === 401) {
          logout()
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

export const getBatches = async (context: UserContext, pageSize, currentPage): Promise<any> => {
  const endPoint = `${REACT_APP_BACKEND_URL}/batches?page_size=${pageSize}&page_num=${currentPage}`
  return axiosGET(endPoint, context)
}

export const getSamples = async (context: UserContext, pageSize, currentPage): Promise<any> => {
  const endPoint = `${REACT_APP_BACKEND_URL}/samples?page_size=${pageSize}&page_num=${currentPage}`
  return axiosGET(endPoint, context)
}

export const getBatchSamples = async (
  context: UserContext,
  batchId: string,
  pageSize,
  currentPage
): Promise<any> => {
  const endPoint = `${REACT_APP_BACKEND_URL}/batch/${batchId}/samples?page_size=${pageSize}&page_num=${currentPage}`
  return axiosGET(endPoint, context)
}

export const getBatch = async (batchId: string, context: UserContext): Promise<any> => {
  const endPoint = `${REACT_APP_BACKEND_URL}/batch/${batchId}`
  return axiosGET(endPoint, context)
}

export const getSample = async (sampleId: string, context: UserContext): Promise<any> => {
  const endPoint = `${REACT_APP_BACKEND_URL}/sample/${sampleId}/`
  return axiosGET(endPoint, context)
}

export const login = async (formInput: Login): Promise<any> => {
  const endPoint = `${REACT_APP_BACKEND_URL}/token`
  return axiosGetToken(endPoint, formInput)
}

export const registerUser = async (formInput: RegisterUser): Promise<any> => {
  const endPoint = `${REACT_APP_BACKEND_URL}/user/register`
  return axiosGetToken(endPoint, formInput)
}
