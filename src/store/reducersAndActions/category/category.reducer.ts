import { createSlice, SerializedError } from '@reduxjs/toolkit'
import { ErrorResponse, Category } from '../../../constants/types'
import {
    addCategoryAction,
    deleteCategoryAction,
    getCategoriesAction,
} from './category.actions'

interface CategoryState {
    loading: boolean
    category: Category[]
    error: ErrorResponse | null
}

const initialState: CategoryState = {
    loading: false,
    category: [],
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

const categorySlice = createSlice({
    name: 'categories',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getCategoriesAction.pending, (state) => {
                state.loading = true
            })
            .addCase(getCategoriesAction.fulfilled, (state, action) => {
                state.category = action.payload.data
                state.loading = false
            })
            .addCase(getCategoriesAction.rejected, (state, action) => {
                state.loading = false
                state.error = action.error
                    ? mapSerializedErrorToApiError(action.error)
                    : null
            })

            .addCase(addCategoryAction.pending, (state) => {
                state.loading = true
            })
            .addCase(addCategoryAction.fulfilled, (state) => {
                state.loading = false
            })
            .addCase(addCategoryAction.rejected, (state, action) => {
                state.loading = false
                state.error = action.error
                    ? mapSerializedErrorToApiError(action.error)
                    : null
            })

            .addCase(deleteCategoryAction.pending, (state) => {
                state.loading = true
            })
            .addCase(deleteCategoryAction.fulfilled, (state) => {
                state.loading = false
            })
            .addCase(deleteCategoryAction.rejected, (state, action) => {
                state.loading = false
                state.error = action.error
                    ? mapSerializedErrorToApiError(action.error)
                    : null
            })
    },
})

export default categorySlice.reducer
export type { CategoryState }
