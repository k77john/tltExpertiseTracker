import { Outlet, Route, Routes } from 'react-router-dom'
import './App.css'

import { useEffect } from 'react'
import { Loader, SideBarMenu } from './components'
import { ROUTES } from './constants/routes'
import {
    CategorySubCategoryMapping,
    DashBoard,
    Login,
    ManageCategories,
    ManageSubCategories,
    UserExpertiesMapping,
} from './pages'
import { useAppDispatch, useAppSelector } from './store'
import { getStatusCodesAction } from './store/reducersAndActions/apiStatusCodes/apiStatusCode.actions'
import ProtectedRoute from './navigations/ProtactedRoutes'

function App() {
    const dispatch = useAppDispatch()
    const loading = useAppSelector((state) => state.apiStatusCodes.loading)

    useEffect(() => {
        dispatch(getStatusCodesAction())
    }, [])

    return (
        <>
            {loading && <Loader />}
            <Routes>
                <Route path={ROUTES.login} element={<Login />} />
                <Route element={<ProtectedRoute />}>
                    <Route element={<Layout />}>
                        <Route
                            path={ROUTES.dashBoard}
                            element={<DashBoard />}
                        />
                        <Route
                            path={ROUTES.manageCategories}
                            element={<ManageCategories />}
                        />
                        <Route
                            path={ROUTES.manageSubCategories}
                            element={<ManageSubCategories />}
                        />
                        <Route
                            path={ROUTES.categorySubCategoryMapping}
                            element={<CategorySubCategoryMapping />}
                        />
                        <Route
                            path={ROUTES.userExpertiesMapping}
                            element={<UserExpertiesMapping />}
                        />
                    </Route>
                </Route>
            </Routes>
        </>
    )
}

function Layout() {
    const sideBarMenue = useAppSelector((state) => state.sideBar.menu)

    return (
        <div className="flex flex-col md:flex-row w-full bg-white-color">
            <div
                className={`${sideBarMenue ? 'w-[80%] sm:w-[60%] md:w-0 lg:w-[23%]' : 'w-0'}`}
            >
                <SideBarMenu />
            </div>
            <div className="flex-1 transition-all h-screen  overflow-y-auto">
                <Outlet />
            </div>
        </div>
    )
}

export default App
