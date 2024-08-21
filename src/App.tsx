import { Outlet, Route, Routes } from 'react-router-dom'
import './App.css'

import { SideBarMenu } from './components'
import { ROUTES } from './constants/routes'
import {
    CategorySubCategoryMaping,
    DashBoard,
    ManageCategories,
    ManageSubCategories,
    UserExpertiesMaping,
} from './pages'

function App() {
    return (
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
    )
}

function Layout() {
    return (
        <div className="flex flex-col md:flex-row w-full bg-white-color h-screen">
            <div className="w-full md:w-[30%] lg:w-[23%]">
                <SideBarMenu />
            </div>
            <div className="flex-1 p-4 md:p-8">
                <Outlet />
            </div>
        </div>
    )
}

export default App
