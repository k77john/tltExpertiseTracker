import { createAsyncThunk } from '@reduxjs/toolkit'

import { RootState } from '../..'
import {
    CategorySubCategoryMapping,
    PaginationTypes,
} from '../../../constants/types'
import {
    addCategoriesSubCategoriesMapping,
    deleteCategoriesSubCategoriesMapping,
    editCategoriesSubCategoriesMapping,
    getCategoriesSubCategoriesMappings,
} from '../../../services/categorySubCategoryMapping.services'
import { showSuccessToast } from '../../../utils/toast'

export const getCategoriesSubCategoriesAction = createAsyncThunk(
    'CategorySubCategoryMapping/GetAllCategorySubCategoryMapping',
    async (payload: PaginationTypes, { rejectWithValue }) => {
        const resp = await getCategoriesSubCategoriesMappings(payload)

        if (resp?.isSuccessful) {
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
        { rejectWithValue, getState }
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
        { rejectWithValue, getState }
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
        { rejectWithValue, getState }
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
            return resp
        } else {
            return rejectWithValue(resp)
        }
    }
)
