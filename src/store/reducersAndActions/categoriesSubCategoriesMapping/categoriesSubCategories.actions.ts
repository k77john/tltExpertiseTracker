import { createAsyncThunk } from '@reduxjs/toolkit'

import { RootState } from '../..'
import { CategorySubCategoryMapping } from '../../../constants/types'
import {
    addCategoriesSubCategoriesMapping,
    deleteCategoriesSubCategoriesMapping,
    editCategoriesSubCategoriesMapping,
    getCategoriesSubCategoriesMappings,
} from '../../../services/categorySubCategoryMapping.services'
import { showSuccessToast } from '../../../utils/toast'

export const getCategoriesSubCategoriesAction = createAsyncThunk(
    'CategorySubCategoryMapping/GetAllCategorySubCategoryMapping',
    async (_, { rejectWithValue }) => {
        const resp = await getCategoriesSubCategoriesMappings()
        if (resp?.isSuccessful) {
            const updatedData = resp.data.filter((item) => !item.isDeleted)
            resp.data = updatedData
            return resp
        } else {
            return rejectWithValue(resp)
        }
    }
)

export const addCategoriesSubCategoriesAction = createAsyncThunk(
    'CategorySubCategoryMapping/AddCategorySubCategoryMapping',
    async (
        payload: CategorySubCategoryMapping,
        { rejectWithValue, dispatch, getState }
    ) => {
        console.log(payload)

        const resp = await addCategoriesSubCategoriesMapping(payload)
        const state = getState() as RootState
        const statusCodes = state.apiStatusCodes.statusCodes

        if (resp?.isSuccessful) {
            const status = statusCodes.find(
                (item) => item.statusCode === resp.data
            )
            if (status) {
                showSuccessToast(status.description || '')
            }
            dispatch(getCategoriesSubCategoriesAction())
            return resp
        } else {
            return rejectWithValue(resp)
        }
    }
)

export const deleteCategorySubCategoryMappingAction = createAsyncThunk(
    'CategorySubCategoryMapping/DeleteCategorySubCategoryMapping',
    async (
        payload: CategorySubCategoryMapping,
        { rejectWithValue, dispatch, getState }
    ) => {
        const state = getState() as RootState
        const statusCodes = state.apiStatusCodes.statusCodes
        const resp = await deleteCategoriesSubCategoriesMapping(payload)

        if (resp?.isSuccessful) {
            const status = statusCodes.find(
                (item) => item.statusCode === resp.data
            )
            if (status) {
                showSuccessToast(status.description || '')
            }
            dispatch(getCategoriesSubCategoriesAction())
            return resp
        } else {
            return rejectWithValue(resp)
        }
    }
)

export const editCategorySubCategoryMappingAction = createAsyncThunk(
    'CategorySubCategoryMapping/UpdateCategorySubCategoryMapping',
    async (
        payload: CategorySubCategoryMapping,
        { rejectWithValue, dispatch, getState }
    ) => {
        console.log(payload)

        const resp = await editCategoriesSubCategoriesMapping(payload)
        const state = getState() as RootState
        const statusCodes = state.apiStatusCodes.statusCodes

        if (resp?.isSuccessful) {
            const status = statusCodes.find(
                (item) => item.statusCode === resp.data
            )
            if (status) {
                showSuccessToast(status.description || '')
            }
            dispatch(getCategoriesSubCategoriesAction())
            return resp
        } else {
            return rejectWithValue(resp)
        }
    }
)
