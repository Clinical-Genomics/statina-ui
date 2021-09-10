import { ErrorNotification } from '../interfaces';
import { notification } from 'antd';
import { AxiosError } from 'axios';

export const OpenNotification = ({
  type,
  message,
  description,
}: ErrorNotification) => {
  const key = `open${Date.now()}`;
  notification[type]({
    message,
    description,
    btn: null,
    key,
    closeIcon: null,
    duration: 0,
  });
};

export const createErrorNotification = (error: AxiosError) => {
  const { errorMessage, errorDescription } = createErrorMessage(error);
  OpenNotification({
    type: 'error',
    message: errorMessage,
    description: errorDescription,
  });
};

export const createErrorMessage = (error: AxiosError) => {
  switch (error?.response?.status) {
    case 403:
      return {
        errorMessage: `${error?.message}`,
        errorDescription: `You don't have permissions to access the data from ${error?.config?.url}`,
      };
    case 500:
      return {
        errorMessage: 'Something went wrong in the backend',
        errorDescription: `${error?.message} ${error?.config?.url}`,
      };
    default:
      return {
        errorMessage: `Could not fetch data from backend, make sure you are connected to the VPN`,
        errorDescription: `${error?.message} ${error?.config?.url}`,
      };
  }
};

export const parseDate = (date: string) => {
  const re = new RegExp('-', 'g');
  return parseInt(date.replace(re, ''));
};

export const sortDate = (dateA: string, dateB: string) => {
  return parseDate(dateA) - parseDate(dateB);
};

export const windowMatchMedia = () => {
  return (
    window.matchMedia ||
    function () {
      return {
        matches: false,
        addListener: () => null,
        removeListener: () => null,
      };
    }
  );
};
