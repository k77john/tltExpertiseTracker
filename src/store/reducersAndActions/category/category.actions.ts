import { createAsyncThunk } from '@reduxjs/toolkit'
import { RootState } from '../..'
import { Category, PaginationTypes } from '../../../constants/types'
import {
    addCategory,
    deleteCategory,
    editCategory,
    getCategories,
} from '../../../services/category.services'
import { showSuccessToast } from '../../../utils/toast'

export const getCategoriesAction = createAsyncThunk(
    'category/getCategories',
    async (payload: PaginationTypes, { rejectWithValue }) => {
        const resp = await getCategories(payload)
        if (resp?.isSuccessful) {
            return resp
        } else {
            return rejectWithValue(resp)
        }
    }
)

export const addCategoryAction = createAsyncThunk(
    'category/addCategories',
    async (payload: Category, { rejectWithValue, getState }) => {
        console.log(payload)

        const resp = await addCategory(payload)
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

export const deleteCategoryAction = createAsyncThunk(
    'category/deleteCategories',
    async (payload: Category, { rejectWithValue, getState }) => {
        const resp = await deleteCategory(payload)

        const state = getState() as RootState
        const statusCodes = state.apiStatusCodes.statusCodes

        if (resp?.isSuccessful) {
            const status = statusCodes.find(
                (item) => item.statusCode === resp.data
            )
            if (status) {
                showSuccessToast(status.description || '')
            }
            // dispatch(getCategoriesAction())
            return resp
        } else {
            return rejectWithValue(resp)
        }
    }
)

export const editCategoryAction = createAsyncThunk(
    'category/editCategories',
    async (payload: Category, { rejectWithValue, getState }) => {
        const resp = await editCategory(payload)
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
