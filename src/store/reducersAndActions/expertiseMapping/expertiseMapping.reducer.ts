import { createSlice, SerializedError } from '@reduxjs/toolkit'
import { ErrorResponse, ExpertiseMapping } from '../../../constants/types'
import { getExpertiseMappingAction } from './expertiseMapping.actions'

interface ExpertiseMappingState {
    loading: boolean
    expertiseMapping: ExpertiseMapping[]
    error: ErrorResponse | null
}

const initialState: ExpertiseMappingState = {
    loading: false,
    expertiseMapping: [],
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

const expertiseMappingSlice = createSlice({
    name: 'expertiseMappings',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getExpertiseMappingAction.pending, (state) => {
                state.loading = true
            })
            .addCase(getExpertiseMappingAction.fulfilled, (state, action) => {
                state.expertiseMapping = action.payload.data
                state.loading = false
            })
            .addCase(getExpertiseMappingAction.rejected, (state, action) => {
                state.loading = false
                state.error = action.error
                    ? mapSerializedErrorToApiError(action.error)
                    : null
            })
    },
})

export default expertiseMappingSlice.reducer
export type { ExpertiseMappingState }
