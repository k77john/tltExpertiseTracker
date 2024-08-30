import { API_ROUTES } from '../constants/routes'
import { SubCategory } from '../constants/types'
import { get, post, remove } from './service.common'

export interface StatusMessageResponse {
    statusMessage?: string | undefined
}

export const getSubCategories = async () => {
    const response = await get<SubCategory[]>(API_ROUTES.getSubCategories)
    return response
}

export const addSubCategory = async (values: SubCategory) => {
    const response = await post(API_ROUTES.addSubCategory, values)
    return response
}

export const deleteSubCategory = async (values: SubCategory) => {
    const url = `${API_ROUTES.deleteSubCategory}?SubCategoryId=${values.subCategoryID}&UpdateUserId=${values.updatedUserID}`
    const response = await remove<StatusMessageResponse>(url)
    return response
}

export const editSubCategory = async (values: SubCategory) => {
    const response = await post<StatusMessageResponse>(
        API_ROUTES.updateSubCategory,
        values
    )
    return response
}
