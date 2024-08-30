import { createAsyncThunk } from '@reduxjs/toolkit'

import { RootState } from '../..'
import { CategorySubCategoryMaping } from '../../../constants/types'
import {
    addCategoriesSubCategoriesMaping,
    deleteCategoriesSubCategoriesMaping,
    editCategoriesSubCategoriesMaping,
    getCategoriesSubCategoriesMapings,
} from '../../../services/categorySubCategoryMaping.services'
import { showSuccessToast } from '../../../utils/toast'

export const getCategoriesSubCategoriesAction = createAsyncThunk(
    'CategorySubCategoryMapping/GetAllCategorySubCategoryMapping',
    async (_, { rejectWithValue }) => {
        const resp = await getCategoriesSubCategoriesMapings()
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
        payload: CategorySubCategoryMaping,
        { rejectWithValue, dispatch, getState }
    ) => {
        console.log(payload)

        const resp = await addCategoriesSubCategoriesMaping(payload)
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
        payload: CategorySubCategoryMaping,
        { rejectWithValue, dispatch, getState }
    ) => {
        const state = getState() as RootState
        const statusCodes = state.apiStatusCodes.statusCodes
        const resp = await deleteCategoriesSubCategoriesMaping(payload)

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

export const editCategorySubCategoryMapingAction = createAsyncThunk(
    'CategorySubCategoryMapping/UpdateCategorySubCategoryMapping',
    async (
        payload: CategorySubCategoryMaping,
        { rejectWithValue, dispatch, getState }
    ) => {
        console.log(payload)

        const resp = await editCategoriesSubCategoriesMaping(payload)
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
