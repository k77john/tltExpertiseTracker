import { createAsyncThunk } from '@reduxjs/toolkit'
import {
    addExpertiseMapping,
    getExpertiseMappings,
    updateExpertiseMapping,
} from '../../../services/expertiseMapping.services'
import { ExpertiseMapping } from '../../../constants/types'
import { RootState } from '../..'
import { showSuccessToast } from '../../../utils/toast'

export const getExpertiseMappingAction = createAsyncThunk(
    'expertiseMapping/getExpertiseMapping',
    async (_, { rejectWithValue }) => {
        const resp = await getExpertiseMappings()
        if (resp?.isSuccessful) {
            return resp
        } else {
            return rejectWithValue(resp)
        }
    }
)

export const addExpertiseMappingAction = createAsyncThunk(
    'expertiseMapping/addExpertiseMapping',
    async (
        payload: ExpertiseMapping,
        { rejectWithValue, dispatch, getState }
    ) => {
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
            dispatch(getExpertiseMappingAction())
            return resp
        } else {
            return rejectWithValue(resp)
        }
    }
)

export const updateExpertiseMappingAction = createAsyncThunk(
    'expertiseMapping/updateExpertiseMapping',
    async (
        payload: ExpertiseMapping,
        { rejectWithValue, dispatch, getState }
    ) => {
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
            dispatch(getExpertiseMappingAction())
            return resp
        } else {
            return rejectWithValue(resp)
        }
    }
)
