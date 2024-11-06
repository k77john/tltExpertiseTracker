import { API_ROUTES } from '../constants/routes'
import { PaginationTypes, SubCategory } from '../constants/types'
import { get, post, remove } from './service.common'

export interface StatusMessageResponse {
    statusMessage?: string | undefined
}

export const getSubCategories = async (value: PaginationTypes) => {
    const params = new URLSearchParams()
    if (value?.search) {
        params.append('pageNumber', '1')
        params.append('searchKeyWord', value.search)
    }
    params.append('pageNumber', value.page)
    params.append('pageSize', value.limit)

    const response = await get<SubCategory[]>(
        `${API_ROUTES.getSubCategories}${params.toString() ? `?${params.toString()}` : ''}`
    )

    return response
}

export const getSubCategoriesAll = async () => {
    const response = await get<SubCategory[]>(
        API_ROUTES.getSubCategoriesAllList
    )
    return response
}

export const getSubCategoriesBasedOnCategory = async (value: number) => {
    const response = await get<SubCategory[]>(
        `${API_ROUTES.getSubCategoryByCategoryID}?CategoryId=${value}`
    )
    return response
}

export const getSubCategoryByID = async (values: number) => {
    const response = await get<SubCategory>(
        `${API_ROUTES.getSubCategoryByID}?subCategoryId=${values}`
    )
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
