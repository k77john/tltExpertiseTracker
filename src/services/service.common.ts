import axios, { AxiosError, AxiosResponse, AxiosRequestConfig } from 'axios'
import axiosRetry from 'axios-retry'

import { StorageKeys } from '../constants/constents'
import { getDataFromStorage } from '../utils/asyncStorage'
import { showErrorToast } from '../utils/toast'
import { ApiResponse, ErrorResponse, SuccessResponse } from '../constants/types'

interface ErrorResponseData {
    error?: string
}

// Axios instance
const apiClient = axios.create({
    baseURL: 'http://192.168.5.11:8012/api',
    timeout: 10000,
})

// Axios retry
axiosRetry(apiClient, {
    retries: 3,
    retryDelay: axiosRetry.exponentialDelay,
    retryCondition: (error: AxiosError) => {
        return (
            axiosRetry.isNetworkOrIdempotentRequestError(error) ||
            error.response?.status === 500
        )
    },
})

// Error handler
const handleError = (e: AxiosError<ErrorResponseData>): ErrorResponse => {
    console.log(e)
    const statusCode = e.response?.status || 'unknown'
    const errorMessage =
        e.response?.data?.error || e.message || 'An unknown error occurred'

    showErrorToast(`Error ${statusCode}: ${errorMessage}`)
    return {
        status: 'error',
        isSuccessful: false,
        message: errorMessage,
        statusCode,
    }
}

// Success handler
const handleSuccess = <T>(data: T, statusCode: number): SuccessResponse<T> => {
    return {
        status: 'success',
        isSuccessful: true,
        data,
        statusCode,
    }
}

// Get authentication headers
export const getAuthHeaders = async (): Promise<
    AxiosRequestConfig['headers']
> => {
    const token = await getDataFromStorage(StorageKeys.KEY_AUTH_TOKEN)
    return {
        Authorization: `Bearer ${token}`,
    }
}

// Get authentication headers with multipart
export const getAuthHeadersWithMultipart = async (): Promise<
    AxiosRequestConfig['headers']
> => {
    const token = await getDataFromStorage(StorageKeys.KEY_AUTH_TOKEN)
    return {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'multipart/form-data',
    }
}

// HTTP methods
export const get = async <T>(
    url: string,
    headers: AxiosRequestConfig['headers'] = {},
    params: AxiosRequestConfig['params'] = {}
): Promise<ApiResponse<T>> => {
    try {
        const response: AxiosResponse<T> = await apiClient.get(url, {
            params,
            headers,
        })
        return handleSuccess(response.data, response.status)
    } catch (e) {
        return handleError(e as AxiosError<ErrorResponseData>)
    }
}

export const post = async <T>(
    url: string,
    data?: T,
    headers: AxiosRequestConfig['headers'] = {}
): Promise<ApiResponse<T>> => {
    try {
        const response: AxiosResponse<T> = await apiClient.post(url, data, {
            headers,
        })
        return handleSuccess(response.data, response.status)
    } catch (e) {
        return handleError(e as AxiosError<ErrorResponseData>)
    }
}

export const update = async <T>(
    url: string,
    data: T,
    headers: AxiosRequestConfig['headers'] = {}
): Promise<ApiResponse<T>> => {
    try {
        const response: AxiosResponse<T> = await apiClient.put(url, data, {
            headers,
        })
        return handleSuccess(response.data, response.status)
    } catch (e) {
        return handleError(e as AxiosError<ErrorResponseData>)
    }
}

export const patch = async <T>(
    url: string,
    data: T,
    headers: AxiosRequestConfig['headers'] = {}
): Promise<ApiResponse<T>> => {
    try {
        const response: AxiosResponse<T> = await apiClient.patch(url, data, {
            headers,
        })
        return handleSuccess(response.data, response.status)
    } catch (e) {
        return handleError(e as AxiosError<ErrorResponseData>)
    }
}

export const remove = async <T>(
    url: string,
    headers: AxiosRequestConfig['headers'] = {}
): Promise<ApiResponse<T>> => {
    try {
        const response: AxiosResponse<T> = await apiClient.post(url, {
            headers,
        })
        return handleSuccess(response.data, response.status)
    } catch (e) {
        return handleError(e as AxiosError<ErrorResponseData>)
    }
}
