import axios, {
    AxiosError,
    AxiosResponse,
    InternalAxiosRequestConfig,
} from 'axios'
import axiosRetry from 'axios-retry'
import { toast } from 'react-toastify'

interface ErrorResponseData {
    error?: string
    message?: string
}

const axiosInstance = axios.create({
    baseURL: 'https://api.example.com', // Replace with your API base URL
    timeout: 10000, // Optional: Set a timeout for requests
})

axiosRetry(axiosInstance, {
    retries: 3,
    retryDelay: (retryCount) => retryCount * 1000,
    retryCondition: (error: AxiosError) => {
        return (
            axiosRetry.isNetworkOrIdempotentRequestError(error) ||
            (error.response?.status ?? 500) >= 500
        )
    },
})

axiosInstance.interceptors.request.use(
    (config: InternalAxiosRequestConfig) => {
        const token = localStorage.getItem('token')
        if (token) {
            config.headers.Authorization = `Bearer ${token}`
        }
        return config
    },
    (error: AxiosError) => {
        // Handle request errors here
        console.error('Request error:', error)
        return Promise.reject(error)
    }
)

axiosInstance.interceptors.response.use(
    (response: AxiosResponse) => {
        return response
    },
    (error: AxiosError) => {
        const statusCode = error.response?.status ?? 500
        const errorData = error.response?.data as ErrorResponseData
        const message = errorData.error || errorData.message || 'Unknown Error'

        console.error(`Error ${statusCode}: ${message}`)

        toast.error(`Error ${statusCode}: ${message}`)

        switch (statusCode) {
            case 400:
                console.error('Bad Request')
                break
            case 401:
                console.error('Unauthorized')
                break
            case 403:
                console.error('Forbidden')
                break
            case 404:
                console.error('Not Found')
                break
            case 500:
                console.error('Internal Server Error')
                break
            default:
                console.error('An unexpected error occurred')
                break
        }

        return Promise.reject(error)
    }
)

export default axiosInstance
