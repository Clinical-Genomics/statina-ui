import { createErrorNotification } from './helpers/helpers';
const { REACT_APP_BACKEND_URL } = process.env;

const axios = require('axios').default;

const axiosGET = (endPoint, token) => {
  return new Promise((resolve, reject) => {
    axios
      // .get(endPoint, { headers: { Authorization: `Bearer ${token}` } })
      .get(endPoint)
      .then(function (response) {
        resolve(response.data);
      })
      .catch(function (error) {
        reject(error);
        createErrorNotification(error);
      });
  });
};

export const getBatches = async (): Promise<any> => {
  const endPoint = `${REACT_APP_BACKEND_URL}/batches`;
  return axiosGET(endPoint, null);
};
