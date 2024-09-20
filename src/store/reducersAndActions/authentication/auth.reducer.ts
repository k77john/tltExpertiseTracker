import { createSlice, SerializedError } from '@reduxjs/toolkit'
import { ErrorResponse, User } from '../../../constants/types'
import {
    checkLoginAction,
    loginAction,
    logOutAction,
    verifyOtpAction,
} from './auth.actions'

interface ApiUserInfo {
    loading: boolean
    user: User | null
    isAuthenticated: boolean
    error: ErrorResponse | null
}

const initialState: ApiUserInfo = {
    loading: false,
    user: null,
    isAuthenticated: false,
    error: null,
}

const mapSerializedErrorToApiError = (
    error: SerializedError
): ErrorResponse => {
    return {
        status: 'error',
        isSuccessful: false,
        statusCode: 500,
        message: error.message,
    }
}

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(loginAction.pending, (state) => {
                state.loading = true
                state.isAuthenticated = false
            })
            .addCase(loginAction.fulfilled, (state, action) => {
                state.user = action.payload.data
                state.loading = false
                state.isAuthenticated = false
            })
            .addCase(loginAction.rejected, (state, action) => {
                state.loading = false
                state.isAuthenticated = false
                state.error = action.error
                    ? mapSerializedErrorToApiError(action.error)
                    : null
            })

            .addCase(verifyOtpAction.pending, (state) => {
                state.loading = true
                state.isAuthenticated = false
            })
            .addCase(verifyOtpAction.fulfilled, (state, action) => {
                state.user = action.payload.data
                if (action.payload.data.email) {
                    state.isAuthenticated = true
                } else state.isAuthenticated = false
                state.loading = false
            })
            .addCase(verifyOtpAction.rejected, (state, action) => {
                state.loading = false
                state.isAuthenticated = false
                state.error = action.error
                    ? mapSerializedErrorToApiError(action.error)
                    : null
            })

            .addCase(checkLoginAction.pending, (state) => {
                state.loading = true
                state.isAuthenticated = false
            })
            .addCase(checkLoginAction.fulfilled, (state, action) => {
                state.user = action.payload
                state.isAuthenticated = true
                state.loading = false
            })
            .addCase(checkLoginAction.rejected, (state, action) => {
                state.loading = false
                state.isAuthenticated = false
                state.error = action.error
                    ? mapSerializedErrorToApiError(action.error)
                    : null
            })

            .addCase(logOutAction.fulfilled, (state) => {
                state.user = null
                state.isAuthenticated = false
            })
    },
})

export default authSlice.reducer
export type { ApiUserInfo }
