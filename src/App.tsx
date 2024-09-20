import { Navigate, Outlet, Route, Routes } from 'react-router-dom'
import './App.css'

import { useEffect, useState } from 'react'
import { Loader, SideBarMenu } from './components'
import { ROUTES } from './constants/routes'
import {
    CategorySubCategoryMapping,
    DashBoard,
    Login,
    ManageCategories,
    ManageSubCategories,
    UserExpertiseMapping,
    VerifyOTP,
} from './pages'
import { useAppDispatch, useAppSelector } from './store'
import { getStatusCodesAction } from './store/reducersAndActions/apiStatusCodes/apiStatusCode.actions'
import { checkLoginAction } from './store/reducersAndActions/authentication/auth.actions'

const OfflineScreen = () => {
    return (
        <div className="flex flex-col items-center justify-center h-screen bg-white text-red-800 text-center">
            <h1 className="text-2xl font-bold">You are Offline</h1>
            <button
                onClick={() => window.location.reload()}
                className="mt-4 px-4 py-2 text-lg font-semibold bg-red-200 border border-red-400 rounded hover:bg-red-300 focus:outline-none focus:ring focus:ring-red-500"
            >
                Retry
            </button>
        </div>
    )
}

function App() {
    const dispatch = useAppDispatch()
    const loading = useAppSelector((state) => state.apiStatusCodes.loading)
    const [appLoader, setAppLoader] = useState<boolean>(true)
    const { isAuthenticated } = useAppSelector((state) => state.auth)

    const [isOnline, setIsOnline] = useState(navigator.onLine)

    useEffect(() => {
        const updateOnlineStatus = () => {
            setIsOnline(navigator.onLine)
        }

        window.addEventListener('online', updateOnlineStatus)
        window.addEventListener('offline', updateOnlineStatus)

        // Cleanup event listeners on component unmount
        return () => {
            window.removeEventListener('online', updateOnlineStatus)
            window.removeEventListener('offline', updateOnlineStatus)
        }
    }, [])

    useEffect(() => {
        setAppLoader(true)
        dispatch(getStatusCodesAction())
        dispatch(checkLoginAction()).then(() => {
            setAppLoader(false)
        })
    }, [])

    return (
        <>
            {isOnline ? (
                <>
                    {loading && <Loader />}
                    {!appLoader && (
                        <Routes>
                            {isAuthenticated && (
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
                                        path={ROUTES.userExpertiseMapping}
                                        element={<UserExpertiseMapping />}
                                    />
                                    <Route
                                        path="*"
                                        element={
                                            <Navigate to={ROUTES.dashBoard} />
                                        }
                                    />
                                </Route>
                            )}
                            {!isAuthenticated && (
                                <>
                                    <Route
                                        path={ROUTES.login}
                                        element={<Login />}
                                    />
                                    <Route
                                        path={ROUTES.vertifyOTP}
                                        element={<VerifyOTP />}
                                    />
                                    <Route
                                        path="*"
                                        element={<Navigate to={ROUTES.login} />}
                                    />
                                </>
                            )}

                            {/* <Route element={<ProtectedRoute />}></Route> */}
                        </Routes>
                    )}
                </>
            ) : (
                <>
                    <OfflineScreen />
                </>
            )}
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
            <div className=" md:flex-1 transition-all h-screen overflow-y-auto">
                <Outlet />
            </div>
        </div>
    )
}

export default App
