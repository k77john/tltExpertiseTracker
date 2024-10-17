import { API_ROUTES } from '../constants/routes'
import {
    CategorySubCategoryMapping,
    DomainSubDomainMappingTree,
    domainSubDomainParameter,
} from '../constants/types'
import { get, post, remove } from './service.common'

export interface StatusMessageResponse {
    statusMessage?: string | undefined
}

export const getCategoriesSubCategoriesMappings = async (
    value: domainSubDomainParameter
) => {
    const params = new URLSearchParams()

    if (value?.search) {
        params.append('searchWord', value.search)
    }

    const response = await get<DomainSubDomainMappingTree[]>(
        `${API_ROUTES.getAllDomainSubDomainMapping}${params.toString() ? `?${params.toString()}` : ''}`
    )

    return response
}

export const getCategorySubCategoryMappingsByID = async (
    values: number | undefined
) => {
    const response = await get<CategorySubCategoryMapping>(
        `${API_ROUTES.getCategorySubCategoryMapingByID}?MappingId=${values}`
    )
    return response
}

export const addCategoriesSubCategoriesMapping = async (
    values: CategorySubCategoryMapping
) => {
    const response = await post(
        API_ROUTES.addCategorySubCategoryMapping,
        values
    )
    return response
}

export const deleteCategoriesSubCategoriesMapping = async (
    values: CategorySubCategoryMapping
) => {
    const url = `${API_ROUTES.deleteCategorySubCategoryMapping}?MappingId=${values.mappingId}&UpdatedUserID=${values.updatedUserId}`
    const response = await remove<StatusMessageResponse>(url)
    return response
}

export const editCategoriesSubCategoriesMapping = async (
    values: CategorySubCategoryMapping
) => {
    const response = await post<StatusMessageResponse>(
        API_ROUTES.updateCategorySubCategoryMapping,
        values
    )
    return response
}
