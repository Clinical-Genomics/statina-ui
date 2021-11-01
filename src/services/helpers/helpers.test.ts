import { createErrorMessage, dateToNumber, sortDate } from './helpers'
import { AxiosError } from 'axios'

describe('Helpers', () => {
  test('Should create the right error message for response 500', () => {
    const error = {
      response: {
        status: 500,
      },
      message: 'Something went wrong',
      config: {
        url: 'www.endpoint.com/v1',
      },
    }
    expect(createErrorMessage(error as AxiosError)).toStrictEqual({
      errorMessage: `Something went wrong in the backend`,
      errorDescription: `${error?.message} ${error?.config?.url}`,
    })
  })

  test('Should create the right error message for response 403', () => {
    const error = {
      response: {
        status: 403,
      },
      message: 'Something went wrong',
      config: {
        url: 'www.endpoint.com/v1',
      },
    }
    expect(createErrorMessage(error as AxiosError)).toStrictEqual({
      errorMessage: `${error?.message}`,
      errorDescription: `You don't have permissions to access the data from ${error?.config?.url}`,
    })
  })

  test('Should create the right error message for response 404', () => {
    const error = {
      response: {
        status: 404,
      },
      message: 'Something went wrong',
      config: {
        url: 'www.endpoint.com/v1',
      },
    }
    expect(createErrorMessage(error as AxiosError)).toStrictEqual({
      errorDescription: `Not found`,
      errorMessage: `Something went wrong`,
    })
  })

  test('Should create the right error message for default responses', () => {
    const error = {
      response: {
        status: 422,
      },
      message: 'Something went wrong',
      config: {
        url: 'www.endpoint.com/v1',
      },
    }
    expect(createErrorMessage(error as AxiosError)).toStrictEqual({
      errorMessage: `Could not fetch data from backend, make sure you are connected to the VPN`,
      errorDescription: `${error?.message} ${error?.config?.url}`,
    })
  })

  test('Should sort date', () => {
    expect(sortDate('2021-01-10', '2021-01-12')).toBe(-2)
    expect(sortDate('2021-01-10', '2020-01-12')).toBe(9998)
  })

  test('Should format date to number', () => {
    expect(dateToNumber('2021-01-10')).toBe(20210110)
  })
})
