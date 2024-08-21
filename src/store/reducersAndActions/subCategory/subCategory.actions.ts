import { createAsyncThunk } from '@reduxjs/toolkit'
import { Category } from '../../../constants/types'
import {
    addSubCategory,
    getSubCategories,
} from '../../../services/subCategory.services'
import { showSuccessToast } from '../../../utils/toast'

export const getSubCategoriesAction = createAsyncThunk(
    'category/getCategories',
    async (_, { rejectWithValue }) => {
        const resp = await getSubCategories()
        if (resp?.isSuccessful) {
            return resp
        } else {
            return rejectWithValue(resp)
        }
    }
)

export const addSubCategoryAction = createAsyncThunk(
    'category/addCategories',
    async (payload: Category, { rejectWithValue, dispatch }) => {
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

// export const deleteCategoryAction = createAsyncThunk(
//     'category/deleteCategories',
//     async (payload: Category, { rejectWithValue, dispatch }) => {
//         const resp = await deleteCategory(payload)
//         if (resp?.isSuccessful) {
//             showSuccessToast(resp?.data.statusMessage || '')
//             dispatch(getCategoriesAction())
//             return resp
//         } else {
//             return rejectWithValue(resp)
//         }
//     }
// )

// export const editCategoryAction = createAsyncThunk(
//     'category/editCategories',
//     async (payload: Category, { rejectWithValue, dispatch }) => {
//         console.log(payload)

//         const resp = await editCategory(payload)
//         if (resp?.isSuccessful) {
//             showSuccessToast(resp?.data.statusMessage || '')
//             dispatch(getCategoriesAction())
//             return resp
//         } else {
//             return rejectWithValue(resp)
//         }
//     }
// )
