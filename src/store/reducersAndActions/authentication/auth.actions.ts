import { createAsyncThunk } from '@reduxjs/toolkit'
import { RootState } from '../..'
import { LoginInputs } from '../../../constants/types'
import {
    getUsersList,
    loginUser,
    verifyOTP,
} from '../../../services/auth.services'
import { showToast } from '../../../utils/toast'
import {
    clearStorage,
    getDataFromStorage,
    setDataToStorage,
} from '../../../utils/asyncStorage'

export const loginAction = createAsyncThunk(
    'login/userLogin',
    async (payload: LoginInputs, { rejectWithValue, getState }) => {
        const resp = await loginUser(payload)
        const state = getState() as RootState
        const statusCodes = state.apiStatusCodes.statusCodes

        if (resp?.isSuccessful) {
            const status = statusCodes.find(
                (item) => item.statusCode === resp.data.status
            )
            if (status) {
                showToast(status.description || '')
            }
            return resp
        } else {
            return rejectWithValue(resp)
        }
    }
)

export const verifyOtpAction = createAsyncThunk(
    'login/verifyOtp',
    async (payload: LoginInputs, { rejectWithValue, getState }) => {
        const resp = await verifyOTP(payload)
        const state = getState() as RootState
        const statusCodes = state.apiStatusCodes.statusCodes

        if (resp?.isSuccessful) {
            const status = statusCodes.find(
                (item) => item.statusCode === resp.data.status
            )
            if (status) {
                showToast(status.description || '')
            }

            if (resp.data.status === 0) {
                setDataToStorage('userData', resp.data)
            }

            return resp
        } else {
            return rejectWithValue(resp)
        }
    }
)

export const checkLoginAction = createAsyncThunk(
    'login/checkLogin',
    async (_, { rejectWithValue }) => {
        const resp = await getDataFromStorage('userData')
        if (resp) {
            return resp
        } else {
            return rejectWithValue(resp)
        }
    }
)

export const logOutAction = createAsyncThunk('login/logOut', async () => {
    clearStorage()
    return {}
})

export const getUsersListAction = createAsyncThunk(
    'login/userList',
    async (_, { rejectWithValue }) => {
        const resp = await getUsersList()

        if (resp?.isSuccessful) {
            return resp
        } else {
            return rejectWithValue(resp)
        }
    }
)
