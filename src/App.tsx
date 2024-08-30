import { Outlet, Route, Routes } from 'react-router-dom'
import './App.css'

import { useEffect } from 'react'
import { Loader, NavBar, SideBarMenu } from './components'
import { ROUTES } from './constants/routes'
import {
    CategorySubCategoryMaping,
    DashBoard,
    ManageCategories,
    ManageSubCategories,
    UserExpertiesMaping,
} from './pages'
import { useAppDispatch, useAppSelector } from './store'
import { getStatusCodesAction } from './store/reducersAndActions/apiStatusCodes/apiStatusCode.actions'
import { getCategoriesSubCategoriesAction } from './store/reducersAndActions/categoriesSubCategoriesMaping/categoriesSubCategories.actions'
import { getCategoriesAction } from './store/reducersAndActions/category/category.actions'
import { getSubCategoriesAction } from './store/reducersAndActions/subCategory/subCategory.actions'

function App() {
    const dispatch = useAppDispatch()
    const loading = useAppSelector((state) => state.apiStatusCodes.loading)

    useEffect(() => {
        dispatch(getStatusCodesAction())
        dispatch(getSubCategoriesAction())
        dispatch(getCategoriesAction())
        dispatch(getCategoriesSubCategoriesAction())
    }, [])

    return (
        <>
            {loading && <Loader />}
            <Routes>
                <Route element={<Layout />}>
                    <Route path={ROUTES.dashBoard} element={<DashBoard />} />
                    <Route
                        path={ROUTES.manageCategories}
                        element={<ManageCategories />}
                    />
                    <Route
                        path={ROUTES.manageSubCategories}
                        element={<ManageSubCategories />}
                    />
                    <Route
                        path={ROUTES.categorySubCategoryMaping}
                        element={<CategorySubCategoryMaping />}
                    />
                    <Route
                        path={ROUTES.userExpertiesMaping}
                        element={<UserExpertiesMaping />}
                    />
                </Route>
            </Routes>
        </>
    )
}

function Layout() {
    const sideBarMenue = useAppSelector((state) => state.sideBar.menu)

    return (
        <div className="flex flex-col md:flex-row w-full bg-white-color h-screen">
            <div
                className={` transition-all ${sideBarMenue ? 'w-[80%] sm:w-[60%] md:w-[35%] lg:w-[23%]' : 'w-0'}`}
            >
                <SideBarMenu />
            </div>
            <div className="flex-1 transition-all">
                <NavBar />
                <div className="p-4 md:p-4">
                    <Outlet />
                </div>
            </div>
        </div>
    )
}

export default App
