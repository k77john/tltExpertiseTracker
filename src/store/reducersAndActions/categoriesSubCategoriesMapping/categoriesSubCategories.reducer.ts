import { createSlice, SerializedError } from '@reduxjs/toolkit'
import {
    CategorySubCategoryMapping,
    ErrorResponse,
} from '../../../constants/types'
import {
    addCategoriesSubCategoriesAction,
    deleteCategorySubCategoryMappingAction,
    getCategoriesSubCategoriesAction,
} from './categoriesSubCategories.actions'

interface CategoriesSubCategoriesState {
    loading: boolean
    categoriesSubCategories: CategorySubCategoryMapping[]
    error: ErrorResponse | null
}

const initialState: CategoriesSubCategoriesState = {
    loading: false,
    categoriesSubCategories: [],
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

const categoriesSubCategoriesSlice = createSlice({
    name: 'categoriesSubCategories',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getCategoriesSubCategoriesAction.pending, (state) => {
                state.loading = true
            })
            .addCase(
                getCategoriesSubCategoriesAction.fulfilled,
                (state, action) => {
                    state.categoriesSubCategories = action.payload.data
                    state.loading = false
                }
            )
            .addCase(
                getCategoriesSubCategoriesAction.rejected,
                (state, action) => {
                    state.loading = false
                    state.error = action.error
                        ? mapSerializedErrorToApiError(action.error)
                        : null
                }
            )

            .addCase(addCategoriesSubCategoriesAction.pending, (state) => {
                state.loading = true
            })
            .addCase(addCategoriesSubCategoriesAction.fulfilled, (state) => {
                state.loading = false
            })
            .addCase(
                addCategoriesSubCategoriesAction.rejected,
                (state, action) => {
                    state.loading = false
                    state.error = action.error
                        ? mapSerializedErrorToApiError(action.error)
                        : null
                }
            )

            .addCase(
                deleteCategorySubCategoryMappingAction.pending,
                (state) => {
                    state.loading = true
                }
            )
            .addCase(
                deleteCategorySubCategoryMappingAction.fulfilled,
                (state) => {
                    state.loading = false
                }
            )
            .addCase(
                deleteCategorySubCategoryMappingAction.rejected,
                (state, action) => {
                    state.loading = false
                    state.error = action.error
                        ? mapSerializedErrorToApiError(action.error)
                        : null
                }
            )
    },
})

export default categoriesSubCategoriesSlice.reducer
export type { CategoriesSubCategoriesState }
