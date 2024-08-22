import { API_ROUTES } from '../constants/routes'
import { ApiResponse, Category, SubCategory } from '../constants/types'
import { get, post, remove } from './service.common'

export interface StatusMessageResponse {
    statusMessage?: string | undefined
}

// Define response types for API responses
export type GetCategoriesResponse = ApiResponse<Category[]>

export type SubCategoryAPIResponse = ApiResponse<StatusMessageResponse>

export const getSubCategories = async (): Promise<GetCategoriesResponse> => {
    try {
        const response = await get<SubCategory[]>(API_ROUTES.getSubCategories)
        return response
    } catch (error) {
        console.error('Error fetching SubCategory:', error)
        throw error
    }
}

export const addSubCategory = async (
    values: SubCategory
): Promise<SubCategoryAPIResponse> => {
    try {
        const response = await post(API_ROUTES.addSubCategory, values)
        return response
    } catch (error) {
        console.error('Error adding SubCategory:', error)
        throw error
    }
}

export const deleteSubCategory = async (
    values: SubCategory
): Promise<SubCategoryAPIResponse> => {
    try {
        const url = `${API_ROUTES.deleteSubCategory}?SubCategoryId=${values.subCategoryID}&UpdateUserId=${values.updatedUserID}`
        const response = await remove<StatusMessageResponse>(url)
        return response
    } catch (error) {
        console.error('Error deleting SubCategory:', error)
        throw error
    }
}

export const editSubCategory = async (
    values: SubCategory
): Promise<SubCategoryAPIResponse> => {
    try {
        const response = await post<StatusMessageResponse>(
            API_ROUTES.updateSubCategory,
            values
        )
        return response
    } catch (error) {
        console.error('Error editing SubCategory:', error)
        throw error
    }
}
