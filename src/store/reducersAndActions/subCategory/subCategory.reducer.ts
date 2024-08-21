import { createSlice, SerializedError } from '@reduxjs/toolkit'
import { ErrorResponse, SubCategory } from '../../../constants/types'
import {
    addSubCategoryAction,
    getSubCategoriesAction,
} from './subCategory.actions'

interface SubCategoryState {
    loading: boolean
    subCategory: SubCategory[]
    error: ErrorResponse | null
}

const initialState: SubCategoryState = {
    loading: false,
    subCategory: [],
    error: null,
}

const mapSerializedErrorToApiError = (
    error: SerializedError
): ErrorResponse => {
    return {
        status: 'error',
        isSuccessful: false,
        statusCode: 500,
        message: error.message,
    }
}

const subCategorySlice = createSlice({
    name: 'subCategories',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getSubCategoriesAction.pending, (state) => {
                state.loading = true
            })
            .addCase(getSubCategoriesAction.fulfilled, (state, action) => {
                state.subCategory = action.payload.data
                state.loading = false
            })
            .addCase(getSubCategoriesAction.rejected, (state, action) => {
                state.loading = false
                state.error = action.error
                    ? mapSerializedErrorToApiError(action.error)
                    : null
            })

            .addCase(addSubCategoryAction.pending, (state) => {
                state.loading = true
            })
            .addCase(addSubCategoryAction.fulfilled, (state) => {
                state.loading = false
            })
            .addCase(addSubCategoryAction.rejected, (state, action) => {
                state.loading = false
                state.error = action.error
                    ? mapSerializedErrorToApiError(action.error)
                    : null
            })
    },
})

export default subCategorySlice.reducer
export type { SubCategoryState }
