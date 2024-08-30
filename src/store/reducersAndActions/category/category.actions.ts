import { createAsyncThunk } from '@reduxjs/toolkit'
import { RootState } from '../..'
import { Category } from '../../../constants/types'
import {
    addCategory,
    deleteCategory,
    editCategory,
    getCategories,
} from '../../../services/category.services'
import { showSuccessToast } from '../../../utils/toast'

export const getCategoriesAction = createAsyncThunk(
    'category/getCategories',
    async (_, { rejectWithValue }) => {
        const resp = await getCategories()
        if (resp?.isSuccessful) {
            const updatedData = resp.data.filter((item) => !item.isDeleted)
            resp.data = updatedData
            return resp
        } else {
            return rejectWithValue(resp)
        }
    }
)

export const addCategoryAction = createAsyncThunk(
    'category/addCategories',
    async (payload: Category, { rejectWithValue, dispatch, getState }) => {
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
            dispatch(getCategoriesAction())
            return resp
        } else {
            return rejectWithValue(resp)
        }
    }
)

export const deleteCategoryAction = createAsyncThunk(
    'category/deleteCategories',
    async (payload: Category, { rejectWithValue, dispatch, getState }) => {
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
            dispatch(getCategoriesAction())
            return resp
        } else {
            return rejectWithValue(resp)
        }
    }
)

export const editCategoryAction = createAsyncThunk(
    'category/editCategories',
    async (payload: Category, { rejectWithValue, dispatch, getState }) => {
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
            dispatch(getCategoriesAction())
            return resp
        } else {
            return rejectWithValue(resp)
        }
    }
)
