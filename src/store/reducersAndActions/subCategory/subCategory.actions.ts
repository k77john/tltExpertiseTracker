import { createAsyncThunk } from '@reduxjs/toolkit'
import { SubCategory } from '../../../constants/types'
import {
    addSubCategory,
    deleteSubCategory,
    editSubCategory,
    getSubCategories,
} from '../../../services/subCategory.services'
import { showSuccessToast } from '../../../utils/toast'

export const getSubCategoriesAction = createAsyncThunk(
    'category/getCategories',
    async (_, { rejectWithValue }) => {
        const resp = await getSubCategories()
        if (resp?.isSuccessful) {
            const updatedData = resp.data.filter((item) => !item.isDeleted)
            resp.data = updatedData
            return resp
        } else {
            return rejectWithValue(resp)
        }
    }
)

export const addSubCategoryAction = createAsyncThunk(
    'category/addCategories',
    async (payload: SubCategory, { rejectWithValue, dispatch }) => {
        console.log(payload)

        const resp = await addSubCategory(payload)
        if (resp?.isSuccessful) {
            showSuccessToast(resp?.data.statusMessage || '')
            dispatch(getSubCategoriesAction())
            return resp
        } else {
            return rejectWithValue(resp)
        }
    }
)

export const deleteSubCategoryAction = createAsyncThunk(
    'category/deleteCategories',
    async (payload: SubCategory, { rejectWithValue, dispatch }) => {
        const resp = await deleteSubCategory(payload)
        if (resp?.isSuccessful) {
            showSuccessToast(resp?.data.statusMessage || '')
            dispatch(getSubCategoriesAction())
            return resp
        } else {
            return rejectWithValue(resp)
        }
    }
)

export const editSubCategoryAction = createAsyncThunk(
    'category/editCategories',
    async (payload: SubCategory, { rejectWithValue, dispatch }) => {
        console.log(payload)

        const resp = await editSubCategory(payload)
        if (resp?.isSuccessful) {
            showSuccessToast(resp?.data.statusMessage || '')
            dispatch(getSubCategoriesAction())
            return resp
        } else {
            return rejectWithValue(resp)
        }
    }
)
