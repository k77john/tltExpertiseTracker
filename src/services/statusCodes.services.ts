import { API_ROUTES } from '../constants/routes'
import { StatusCodes } from '../constants/types'
import { get } from './service.common'

export const getStatusCodes = async () => {
    const response = await get<StatusCodes[]>(API_ROUTES.getApiStatusCodes)
    return response
}
