import { createAsyncThunk } from '@reduxjs/toolkit'
import { getStatusCodes } from '../../../services/statusCodes.services'

export const getStatusCodesAction = createAsyncThunk(
    'Response/GetAllResponseStatuses',
    async (_, { rejectWithValue }) => {
        const resp = await getStatusCodes()
        if (resp?.isSuccessful) {
            return resp
        } else {
            return rejectWithValue(resp)
        }
    }
)
