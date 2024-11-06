import { createAsyncThunk } from '@reduxjs/toolkit'
import {
    addExpertiseMapping,
    getExpertiseMappings,
    updateExpertiseMapping,
} from '../../../services/expertiseMapping.services'
import { ExpertiseMapping, PaginationTypes } from '../../../constants/types'
import { RootState } from '../..'
import { showSuccessToast } from '../../../utils/toast'

export const getExpertiseMappingAction = createAsyncThunk(
    'expertiseMapping/getExpertiseMapping',
    async (payload: PaginationTypes, { rejectWithValue }) => {
        const resp = await getExpertiseMappings(payload)
        if (resp?.isSuccessful) {
            return resp
        } else {
            return rejectWithValue(resp)
        }
    }
)

export const addExpertiseMappingAction = createAsyncThunk(
    'expertiseMapping/addExpertiseMapping',
    async (payload: ExpertiseMapping, { rejectWithValue, getState }) => {
        console.log(payload)

        const resp = await addExpertiseMapping(payload)
        const state = getState() as RootState
        const statusCodes = state.apiStatusCodes.statusCodes

        if (resp?.isSuccessful) {
            const status = statusCodes.find(
                (item) => item.statusCode === resp.data
            )
            if (status) {
                showSuccessToast(status.description || '')
            }
            return resp
        } else {
            return rejectWithValue(resp)
        }
    }
)

export const updateExpertiseMappingAction = createAsyncThunk(
    'expertiseMapping/updateExpertiseMapping',
    async (payload: ExpertiseMapping, { rejectWithValue, getState }) => {
        console.log(payload)

        const resp = await updateExpertiseMapping(payload)
        const state = getState() as RootState
        const statusCodes = state.apiStatusCodes.statusCodes

        if (resp?.isSuccessful) {
            const status = statusCodes.find(
                (item) => item.statusCode === resp.data
            )
            if (status) {
                showSuccessToast(status.description || '')
            }
            return resp
        } else {
            return rejectWithValue(resp)
        }
    }
)
