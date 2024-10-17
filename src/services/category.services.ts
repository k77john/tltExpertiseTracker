import { API_ROUTES } from '../constants/routes'
import { Category, PaginationTypes } from '../constants/types'
import { get, post, remove } from './service.common'

export interface StatusMessageResponse {
    statusMessage?: string | undefined
}

export const getCategories = async (params:PaginationTypes) => {
    const response = await get<Category[]>(`${API_ROUTES.getCategories}?pageNumber=${params.page}&pageSize=${params.limit}`)
    return response
}

export const getCategoriesAllList = async () => {
    const response = await get<Category[]>(API_ROUTES.getCategoriesAllList)
    return response
}

export const getCategoryByID = async (values: number) => {
    const response = await get<Category>(
        `${API_ROUTES.getCategoryByID}?categoryID=${values}`
    )
    return response
}

export const addCategory = async (values: Category) => {
    const response = await post(API_ROUTES.addCategory, values)
    return response
}

export const deleteCategory = async (values: Category) => {
    const url = `${API_ROUTES.deleteCategory}?CategoryID=${values.categoryID}&UpdatedUserID=${values.updatedUserID}`
    const response = await remove<StatusMessageResponse>(url)
    return response
}

export const editCategory = async (values: Category) => {
    const response = await post<StatusMessageResponse>(
        API_ROUTES.updateCategory,
        values
    )
    return response
}
