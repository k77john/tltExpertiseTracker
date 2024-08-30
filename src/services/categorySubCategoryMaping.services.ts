import { API_ROUTES } from '../constants/routes'
import { CategorySubCategoryMaping } from '../constants/types'
import { get, post, remove } from './service.common'

export interface StatusMessageResponse {
    statusMessage?: string | undefined
}

export const getCategoriesSubCategoriesMapings = async () => {
    const response = await get<CategorySubCategoryMaping[]>(
        API_ROUTES.getAllCategorySubCategoryMaping
    )
    return response
}

export const addCategoriesSubCategoriesMaping = async (
    values: CategorySubCategoryMaping
) => {
    const response = await post(API_ROUTES.addCategorySubCategoryMaping, values)
    return response
}

export const deleteCategoriesSubCategoriesMaping = async (
    values: CategorySubCategoryMaping
) => {
    const url = `${API_ROUTES.deleteCategorySubCategoryMaping}?MappingId=${values.mappingId}&UpdatedUserID=${values.updatedUserId}`
    const response = await remove<StatusMessageResponse>(url)
    return response
}

export const editCategoriesSubCategoriesMaping = async (
    values: CategorySubCategoryMaping
) => {
    const response = await post<StatusMessageResponse>(
        API_ROUTES.updateSubCategory,
        values
    )
    return response
}
