export interface SuccessResponse<T> {
    status?: 'success'
    isSuccessful: true
    data: T
    statusCode: number
}

export interface ErrorResponse {
    status?: 'error'
    isSuccessful: false
    message?: string
    statusCode?: number | string
}

export type ApiResponse<T> = SuccessResponse<T> | ErrorResponse

export interface Category {
    categoryID?: number
    categoryName?: string
    description?: string
    insertedDate?: string
    insertedUserID?: number
    isActive?: boolean
    isDeleted?: boolean
    updatedDate?: string
    updatedUserID?: number
    statusMessage?: string | undefined
}

export interface SubCategory {
    subCategoryID?: number
    subCategoryName?: string
    description?: string
    insertedUserID?: number
    isActive?: boolean
    isDeleted?: boolean
    updatedUserID?: number
    statusMessage?: string | undefined
}

export interface CategorySubCategoryMaping {
    mappingId?: number
    categoryId?: number
    description?: string
    subCategoryId?: number
    isActive?: boolean
    insertedUserId?: number
    insertedDate?: string
    updatedUserId?: number
    updatedDate?: string
    isDeleted?: boolean
    statusMessage?: string | undefined
}

export interface StatusCodes {
    statusCode: number
    description: string
}

export interface ApiResponsePayload {
    statusCode: number | string
}
