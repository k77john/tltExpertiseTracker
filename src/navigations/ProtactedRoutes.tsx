import { Outlet, useNavigate } from 'react-router-dom'
import { ROUTES } from '../constants/routes'

const ProtectedRoute = () => {
    const navigate = useNavigate()
    const userInfo = true
    if (!userInfo) {
        navigate(ROUTES.login, { replace: true })
        return null
    }

    return <Outlet />
}

export default ProtectedRoute
