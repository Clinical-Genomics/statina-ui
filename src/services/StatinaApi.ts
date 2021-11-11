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

const axiosPUT = (endPoint, body, { token, logout }: UserContext) => {
  return new Promise((resolve, reject) => {
    axios
      .put(endPoint, body, {
        headers: {
          Authorization: `Bearer ${token}`,
          ContentType: 'application/x-www-form-urlencoded',
        },
      })
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

const axiosIncludePUT = (endPoint, { token, logout }: UserContext) => {
  const body = null
  return new Promise((resolve, reject) => {
    axios
      .put(endPoint, body, {
        headers: {
          Authorization: `Bearer ${token}`,
          ContentType: 'application/x-www-form-urlencoded',
        },
      })
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

const axiosIncludePATCH = (endPoint, { token, logout }: UserContext) => {
  const body = null
  return new Promise((resolve, reject) => {
    axios
      .patch(endPoint, body, {
        headers: {
          Authorization: `Bearer ${token}`,
          ContentType: 'application/x-www-form-urlencoded',
        },
      })
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

const axiosPostToken = (endPoint, formInput) => {
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

export const getBatchesByText = async (
  context: UserContext,
  pageSize,
  currentPage,
  query_string
): Promise<any> => {
  const endPoint = `${REACT_APP_BACKEND_URL}/batches?page_size=${pageSize}&page_num=${currentPage}&query_string=${query_string}`
  return axiosGET(endPoint, context)
}

export const getSamples = async (context: UserContext, pageSize, currentPage): Promise<any> => {
  const endPoint = `${REACT_APP_BACKEND_URL}/samples?page_size=${pageSize}&page_num=${currentPage}`
  return axiosGET(endPoint, context)
}

export const getSamplesByText = async (
  context: UserContext,
  pageSize,
  currentPage,
  query_string
): Promise<any> => {
  const endPoint = `${REACT_APP_BACKEND_URL}/samples?page_size=${pageSize}&page_num=${currentPage}&query_string=${query_string}`
  return axiosGET(endPoint, context)
}

export const getBatchSamples = async (
  context: UserContext,
  batchId: string,
  pageSize,
  currentPage,
  query_string?
): Promise<any> => {
  const endPoint = `${REACT_APP_BACKEND_URL}/samples?batch_id=${batchId}&page_size=${pageSize}&page_num=${currentPage}&query_string=${query_string}`
  return axiosGET(endPoint, context)
}

export const getBatch = async (batchId: string, context: UserContext): Promise<any> => {
  const endPoint = `${REACT_APP_BACKEND_URL}/batch/${batchId}`
  return axiosGET(endPoint, context)
}

export const getZScoreGraph = async (
  batchId: string,
  chromosome: number,
  context: UserContext
): Promise<any> => {
  const endPoint = `${REACT_APP_BACKEND_URL}/batch/${batchId}/zscore_plot?ncv=${chromosome}`
  return axiosGET(endPoint, context)
}

export const getFetalFractionXYGraph = async (
  batchId: string,
  context: UserContext
): Promise<any> => {
  const endPoint = `${REACT_APP_BACKEND_URL}/batch/${batchId}/fetal_fraction_XY`
  return axiosGET(endPoint, context)
}

export const getStatistics = async (context: UserContext): Promise<any> => {
  const endPoint = `${REACT_APP_BACKEND_URL}/statistics`
  return axiosGET(endPoint, context)
}

export const getSample = async (sampleId: string, context: UserContext): Promise<any> => {
  const endPoint = `${REACT_APP_BACKEND_URL}/sample/${sampleId}/`
  return axiosGET(endPoint, context)
}

export const editSample = async (
  sampleId: string,
  body,
  request: 'comment' | 'include',
  context: UserContext
): Promise<any> => {
  const endPoint = `${REACT_APP_BACKEND_URL}/sample/${sampleId}/${request}`
  return axiosPUT(endPoint, body, context)
}

export const includeBatchSamples = async (
  batchId: string,
  context: UserContext,
  include
): Promise<any> => {
  const endPoint = `${REACT_APP_BACKEND_URL}/batch/${batchId}/include_samples?include=${include}`
  return axiosIncludePATCH(endPoint, context)
}

export const includeSample = async (
  sampleId: string,
  context: UserContext,
  include
): Promise<any> => {
  const endPoint = `${REACT_APP_BACKEND_URL}/sample/${sampleId}/include?include=${include}`
  return axiosIncludePUT(endPoint, context)
}

export const login = async (formInput: Login): Promise<any> => {
  const endPoint = `${REACT_APP_BACKEND_URL}/token`
  return axiosPostToken(endPoint, formInput)
}

export const registerUser = async (formInput: RegisterUser): Promise<any> => {
  const endPoint = `${REACT_APP_BACKEND_URL}/user/register`
  return axiosPostToken(endPoint, formInput)
}
