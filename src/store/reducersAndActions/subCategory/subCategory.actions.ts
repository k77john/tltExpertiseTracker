import { createAsyncThunk } from '@reduxjs/toolkit'
import { SubCategory } from '../../../constants/types'
import {
    addSubCategory,
    deleteSubCategory,
    editSubCategory,
    getSubCategories,
} from '../../../services/subCategory.services'
import { showSuccessToast } from '../../../utils/toast'
import { RootState } from '../..'

export const getSubCategoriesAction = createAsyncThunk(
    'subCategory/getSubCategories',
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
    'subCategory/addSubCategories',
    async (payload: SubCategory, { rejectWithValue, dispatch, getState }) => {
        console.log(payload)

        const resp = await addSubCategory(payload)
        const state = getState() as RootState
        const statusCodes = state.apiStatusCodes.statusCodes

        if (resp?.isSuccessful) {
            const status = statusCodes.find(
                (item) => item.statusCode === resp.data
            )
            if (status) {
                showSuccessToast(status.description || '')
            }
            dispatch(getSubCategoriesAction())
            return resp
        } else {
            return rejectWithValue(resp)
        }
    }
)

export const deleteSubCategoryAction = createAsyncThunk(
    'subSategory/deleteSubCategories',
    async (payload: SubCategory, { rejectWithValue, dispatch, getState }) => {
        const state = getState() as RootState
        const statusCodes = state.apiStatusCodes.statusCodes
        const resp = await deleteSubCategory(payload)

        if (resp?.isSuccessful) {
            const status = statusCodes.find(
                (item) => item.statusCode === resp.data
            )
            if (status) {
                showSuccessToast(status.description || '')
            }
            dispatch(getSubCategoriesAction())
            return resp
        } else {
            return rejectWithValue(resp)
        }
    }
)

export const editSubCategoryAction = createAsyncThunk(
    'subCategory/editSubCategories',
    async (payload: SubCategory, { rejectWithValue, dispatch, getState }) => {
        console.log(payload)

        const resp = await editSubCategory(payload)
        const state = getState() as RootState
        const statusCodes = state.apiStatusCodes.statusCodes

        if (resp?.isSuccessful) {
            const status = statusCodes.find(
                (item) => item.statusCode === resp.data
            )
            if (status) {
                showSuccessToast(status.description || '')
            }
            dispatch(getSubCategoriesAction())
            return resp
        } else {
            return rejectWithValue(resp)
        }
    }
)
