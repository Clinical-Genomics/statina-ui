import { createParamURL, handleBackendError } from './helpers/helpers'
import { Login, RegisterUser } from './interfaces'
import { UserContext } from './userContext'
import qs from 'qs'

export const { REACT_APP_BACKEND_URL } = process.env

const axios = require('axios').default

const axiosGET = (endPoint, { token, logout }: UserContext) => {
  return new Promise((resolve, reject) => {
    axios
      .get(endPoint, { headers: { Authorization: `Bearer ${token}` } })
      .then((response) => resolve(response.data))
      .catch((error) => handleBackendError(error, reject, logout))
  })
}

const axiosGETDownloadFile = (endPoint, { token, logout }: UserContext) => {
  return new Promise((resolve, reject) => {
    axios
      .get(endPoint, { headers: { Authorization: `Bearer ${token}` }, responseType: 'arraybuffer' })
      .then((response) => resolve(response))
      .catch((error) => handleBackendError(error, reject, logout))
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
      .then((response) => resolve(response.data))
      .catch((error) => handleBackendError(error, reject, logout))
  })
}

const axiosPATCH = (endPoint, body) => {
  return new Promise((resolve, reject) => {
    axios
      .patch(endPoint, body, {
        headers: {
          ContentType: 'application/x-www-form-urlencoded',
        },
      })
      .then((response) => resolve(response.data))
      .catch((error) => handleBackendError(error, reject))
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
      .then((response) => resolve(response.data))
      .catch((error) => handleBackendError(error, reject, logout))
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
      .then((response) => resolve(response.data))
      .catch((error) => handleBackendError(error, reject, logout))
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
      .then((response) => resolve(response.data))
      .catch((error) => handleBackendError(error, reject))
  })
}

const axiosDELETE = (endPoint, body, { token }: UserContext) => {
  return new Promise((resolve, reject) => {
    axios
      .delete(endPoint, {
        headers: {
          Authorization: `Bearer ${token}`,
          ContentType: 'application/x-www-form-urlencoded',
        },
        data: {
          source: body,
        },
      })
      .then((response) => resolve(response.data))
      .catch((error) => handleBackendError(error, reject))
  })
}

export const getBatches = async (
  context: UserContext,
  pageSize,
  currentPage,
  query_string?
): Promise<any> => {
  const endPoint = `${REACT_APP_BACKEND_URL}/batches?page_size=${pageSize}&page_num=${currentPage}&query_string=${query_string}`
  return axiosGET(endPoint, context)
}

export const getSamples = async (
  context: UserContext,
  pageSize: number,
  currentPage: number,
  batchId?: string,
  queryString?: string,
  sortKey?: string,
  sortDirection?: 'ascend' | 'descend'
): Promise<any> => {
  return axiosGET(
    createParamURL(`${REACT_APP_BACKEND_URL}/samples?`, {
      page_size: pageSize,
      page_num: currentPage,
      batch_id: batchId,
      query_string: queryString,
      sort_key: sortKey,
      sort_direction: sortDirection,
    }),
    context
  )
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

export const getSamplePlot = async (sampleId: string, context: UserContext): Promise<any> => {
  const endPoint = `${REACT_APP_BACKEND_URL}/sample/${sampleId}/tris`
  return axiosGET(endPoint, context)
}

export const getFetalFractionXYGraph = async (
  batchId: string,
  context: UserContext
): Promise<any> => {
  const endPoint = `${REACT_APP_BACKEND_URL}/batch/${batchId}/fetal_fraction_XY`
  return axiosGET(endPoint, context)
}

export const getFetalFractionPrefaceGraph = async (
  batchId: string,
  context: UserContext
): Promise<any> => {
  const endPoint = `${REACT_APP_BACKEND_URL}/batch/${batchId}/fetal_fraction`
  return axiosGET(endPoint, context)
}

export const getChromosomeRatioGraph = async (
  batchId: string,
  context: UserContext
): Promise<any> => {
  const endPoint = `${REACT_APP_BACKEND_URL}/batch/${batchId}/coverage`
  return axiosGET(endPoint, context)
}

export const getStatistics = async (context: UserContext, numOfBatches): Promise<any> => {
  const endPoint = `${REACT_APP_BACKEND_URL}/statistics?nr_batches=${numOfBatches}`
  return axiosGET(endPoint, context)
}

export const getSample = async (sampleId: string, context: UserContext): Promise<any> => {
  const endPoint = `${REACT_APP_BACKEND_URL}/sample/${sampleId}`
  return axiosGET(endPoint, context)
}

export const editSample = async (
  sampleId: string,
  body,
  request: 'include' | string,
  context: UserContext
): Promise<any> => {
  const endPoint = `${REACT_APP_BACKEND_URL}/sample/${sampleId}/${request}`
  return axiosPUT(endPoint, body, context)
}

export const putSampleComment = async (
  sampleId: string,
  comment,
  context: UserContext
): Promise<any> => {
  const endPoint = `${REACT_APP_BACKEND_URL}/sample/${sampleId}/comment`
  return axiosPUT(
    endPoint,
    qs.stringify({
      comment: comment,
    }),
    context
  )
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

export const editBatchComment = async (
  batchId: string,
  comment,
  context: UserContext
): Promise<any> => {
  const endPoint = `${REACT_APP_BACKEND_URL}/batch/${batchId}/comment`
  return axiosPUT(
    endPoint,
    qs.stringify({
      comment: comment,
    }),
    context
  )
}

export const editBatchDataset = async (
  batchId: string,
  dataset,
  context: UserContext
): Promise<any> => {
  const endPoint = `${REACT_APP_BACKEND_URL}/batch/${batchId}/dataset`
  return axiosPUT(
    endPoint,
    qs.stringify({
      dataset: dataset,
    }),
    context
  )
}

export const login = async (formInput: Login): Promise<any> => {
  const endPoint = `${REACT_APP_BACKEND_URL}/token`
  return axiosPostToken(endPoint, formInput)
}

export const registerUser = async (formInput: RegisterUser): Promise<any> => {
  const endPoint = `${REACT_APP_BACKEND_URL}/user/register`
  return axiosPostToken(endPoint, formInput)
}

export const downloadBatchFiles = async (
  batchId: string,
  fileType: 'segmental_calls' | 'result_file' | 'multiqc_report',
  context: UserContext
): Promise<any> => {
  const endPoint = `${REACT_APP_BACKEND_URL}/batch/${batchId}/download/${fileType}`
  return axiosGETDownloadFile(endPoint, context)
}

export const downloadSegmentalCalls = async (
  sample_id: string,
  context: UserContext
): Promise<any> => {
  const endPoint = `${REACT_APP_BACKEND_URL}/sample/${sample_id}/download/segmental_calls`
  return axiosGETDownloadFile(endPoint, context)
}

export const deleteBatch = async (batchId: string, context: UserContext): Promise<any> => {
  const endPoint = `${REACT_APP_BACKEND_URL}/batch/${batchId}`
  return axiosDELETE(endPoint, batchId, context)
}

export const getUsers = async (
  context: UserContext,
  pageSize,
  currentPage,
  query_string?
): Promise<any> => {
  const endPoint = `${REACT_APP_BACKEND_URL}/users?page_size=${pageSize}&page_num=${currentPage}&query_string=${query_string}`
  return axiosGET(endPoint, context)
}

export const deleteUser = async (username: string, context: UserContext): Promise<any> => {
  const endPoint = `${REACT_APP_BACKEND_URL}/user/${username}`
  return axiosDELETE(endPoint, username, context)
}

export const putUserRole = async (
  username: string,
  role: string,
  context: UserContext
): Promise<any> => {
  const endPoint = `${REACT_APP_BACKEND_URL}/user/${username}/role?role=${role}`
  return axiosPUT(endPoint, null, context)
}

export const validateUserEmail = async (
  username: string,
  verificationhex: string
): Promise<any> => {
  const endPoint = `${REACT_APP_BACKEND_URL}/user/${username}/validate?verification_hex=${verificationhex}`
  return axiosPATCH(endPoint, username)
}

export const getDatasets = async (context: UserContext, query_string: string): Promise<any> => {
  const endPoint = `${REACT_APP_BACKEND_URL}/datasets?query_string=${query_string}`
  return axiosGET(endPoint, context)
}

export const getDatasetOptions = async (context: UserContext): Promise<any> => {
  const endPoint = `${REACT_APP_BACKEND_URL}/dataset_options`
  return axiosGET(endPoint, context)
}
