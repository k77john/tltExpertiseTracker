import { API_ROUTES } from '../constants/routes'
import { ApiResponse, Category } from '../constants/types'
import { get, post, remove } from './service.common'

export interface StatusMessageResponse {
    statusMessage?: string | undefined
}

// Define response types for API responses
export type GetCategoriesResponse = ApiResponse<Category[]>

export type CategoryAPIResponse = ApiResponse<StatusMessageResponse>

export const getCategories = async (): Promise<GetCategoriesResponse> => {
    try {
        const response = await get<Category[]>(API_ROUTES.getCategories)
        return response
    } catch (error) {
        console.error('Error fetching categories:', error)
        throw error
    }
}

export const addCategory = async (
    values: Category
): Promise<CategoryAPIResponse> => {
    try {
        const response = await post(API_ROUTES.addCategory, values)
        return response
    } catch (error) {
        console.error('Error adding category:', error)
        throw error
    }
}

export const deleteCategory = async (
    values: Category
): Promise<CategoryAPIResponse> => {
    try {
        const url = `${API_ROUTES.deleteCategory}?CategoryID=${values.categoryID}&UpdatedUserID=${values.updatedUserID}`
        const response = await remove<StatusMessageResponse>(url)
        return response
    } catch (error) {
        console.error('Error deleting category:', error)
        throw error
    }
}

export const editCategory = async (
    values: Category
): Promise<CategoryAPIResponse> => {
    try {
        const response = await post<StatusMessageResponse>(
            API_ROUTES.updateCategory,
            values
        )
        return response
    } catch (error) {
        console.error('Error editing category:', error)
        throw error
    }
}
