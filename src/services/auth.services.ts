import { API_ROUTES } from '../constants/routes'
import { LoginInputs, User } from '../constants/types'
import { get } from './service.common'

export interface StatusMessageResponse {
    statusMessage?: string | undefined
}

export const loginUser = async (value: LoginInputs) => {
    const response = await get<User>(
        `${API_ROUTES.login}?loginUserName=${value.loginUserName}`
    )
    return response
}

export const verifyOTP = async (value: LoginInputs) => {
    const response = await get<User>(
        `${API_ROUTES.verifyOtp}?loginUserName=${value.loginUserName}&otp=${value.otp}`
    )
    return response
}

export const checkLogin = async (value: LoginInputs) => {
    const response = await get<User>(
        `${API_ROUTES.verifyOtp}?loginUserName=${value.loginUserName}&otp=${value.otp}`
    )
    return response
}

export const getUsersList = async () => {
    const response = await get<User[]>(API_ROUTES.getAllUsersDetails)
    return response
}
