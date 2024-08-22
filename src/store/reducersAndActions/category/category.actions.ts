import { createAsyncThunk } from '@reduxjs/toolkit'
import {
    addCategory,
    deleteCategory,
    getCategories,
    editCategory,
} from '../../../services/category.services'
import { Category } from '../../../constants/types'
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
    async (payload: Category, { rejectWithValue, dispatch }) => {
        console.log(payload)

        const resp = await addCategory(payload)
        if (resp?.isSuccessful) {
            showSuccessToast(resp?.data.statusMessage || '')
            dispatch(getCategoriesAction())
            return resp
        } else {
            return rejectWithValue(resp)
        }
    }
)

export const deleteCategoryAction = createAsyncThunk(
    'category/deleteCategories',
    async (payload: Category, { rejectWithValue, dispatch }) => {
        const resp = await deleteCategory(payload)
        if (resp?.isSuccessful) {
            showSuccessToast(resp?.data.statusMessage || '')
            dispatch(getCategoriesAction())
            return resp
        } else {
            return rejectWithValue(resp)
        }
    }
)

export const editCategoryAction = createAsyncThunk(
    'category/editCategories',
    async (payload: Category, { rejectWithValue, dispatch }) => {
        console.log(payload)

        const resp = await editCategory(payload)
        if (resp?.isSuccessful) {
            showSuccessToast(resp?.data.statusMessage || '')
            dispatch(getCategoriesAction())
            return resp
        } else {
            return rejectWithValue(resp)
        }
    }
)
