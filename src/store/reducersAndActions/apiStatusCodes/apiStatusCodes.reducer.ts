import { createSlice, SerializedError } from '@reduxjs/toolkit'
import { ErrorResponse, StatusCodes } from '../../../constants/types'
import { getStatusCodesAction } from './apiStatusCode.actions'

interface ApiStatusCodesState {
    loading: boolean
    statusCodes: StatusCodes[]
    error: ErrorResponse | null
}

const initialState: ApiStatusCodesState = {
    loading: false,
    statusCodes: [],
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

const statusCodeSlice = createSlice({
    name: 'status',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getStatusCodesAction.pending, (state) => {
                state.loading = true
            })
            .addCase(getStatusCodesAction.fulfilled, (state, action) => {
                state.statusCodes = action.payload.data
                state.loading = false
            })
            .addCase(getStatusCodesAction.rejected, (state, action) => {
                state.loading = false
                state.error = action.error
                    ? mapSerializedErrorToApiError(action.error)
                    : null
            })
    },
})

export default statusCodeSlice.reducer
export type { ApiStatusCodesState }
