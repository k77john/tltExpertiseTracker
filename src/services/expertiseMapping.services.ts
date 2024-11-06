import { API_ROUTES } from '../constants/routes'
import {
    CategorySubCategoryMapping,
    ExpertiseMapping,
    PaginationTypes,
    SelectedCatSubCatIdOptionTypes,
} from '../constants/types'
import { get, post } from './service.common'

export interface StatusMessageResponse {
    statusMessage?: string | undefined
}

export const getExpertiseMappings = async (value: PaginationTypes) => {
    const params = new URLSearchParams()

    if (value?.search) {
        params.append('pageNumber', '1')
        params.append('searchKeyWord', value.search)
    }
    params.append('pageNumber', value.page)
    params.append('pageSize', value.limit)

    const response = await get<ExpertiseMapping[]>(
        `${API_ROUTES.getExpertiseMapping}${params.toString() ? `?${params.toString()}` : ''}`
    )

    return response
}

export const getExpertiseMappingByCatSubCatId = async (
    values: SelectedCatSubCatIdOptionTypes
) => {
    const response = await get<CategorySubCategoryMapping[]>(
        `${API_ROUTES.getExpertiesMappingByCatSubCat}?CategoryId=${values.categoryId}&SubCategoryId=${values.subCategoryId}`
    )
    return response
}

export const addExpertiseMapping = async (values: ExpertiseMapping) => {
    const response = await post(API_ROUTES.addExpertiseMapping, values)
    return response
}

export const updateExpertiseMapping = async (values: ExpertiseMapping) => {
    const response = await post(API_ROUTES.updateExpertiseMapping, values)
    return response
}

export const getExpertiseMappingDetails = async (values: number) => {
    const response = await get(
        `${API_ROUTES.getExpertiseMappingDetails}?expertiseMappingId=${values}`
    )
    return response
}

// export const getCategoryByID = async (values: number) => {
//     const response = await get<Category>(
//         `${API_ROUTES.getCategoryByID}?categoryID=${values}`
//     )
//     return response
// }

// export const addCategory = async (values: Category) => {
//     const response = await post(API_ROUTES.addCategory, values)
//     return response
// }

// export const deleteCategory = async (values: Category) => {
//     const url = `${API_ROUTES.deleteCategory}?CategoryID=${values.categoryID}&UpdatedUserID=${values.updatedUserID}`
//     const response = await remove<StatusMessageResponse>(url)
//     return response
// }

// export const editCategory = async (values: Category) => {
//     const response = await post<StatusMessageResponse>(
//         API_ROUTES.updateCategory,
//         values
//     )
//     return response
// }
