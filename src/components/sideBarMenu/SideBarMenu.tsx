import { ROUTES } from '../../constants/routes'
import { NavLink } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../../store'
import { menu } from '../../store/reducersAndActions/sideBarMenu/sideBarMenu.reducer'
import { BrandLogo } from '../../assets/images'

const SideBarMenu: React.FC = () => {
    const sideBarMenue = useAppSelector((state) => state.sideBar.menu)
    const dispatch = useAppDispatch()

    return (
        <section className={`${sideBarMenue ? '' : 'hidden'}`}>
            <div className=" fixed left-0 top-0 w-[80%] sm:w-[60%] md:w-[35%] lg:w-[23%] h-full shadow-lg bg-[#ffffff] sidebar-menu transition-transform z-50">
                <div className="flex items-center px-4 py-3  border-b border-b-gray-200 h-16  ">
                    <div className="w-auto h-full ">
                        <img src={BrandLogo} className="h-full w-full" />
                    </div>
                </div>
                <div className="flex flex-col gap-4 p-4 ">
                    <NavLink
                        to={ROUTES.dashBoard}
                        className={({ isActive }) =>
                            `${isActive ? 'bg-primary-color text-white-color' : 'bg-white'} flex font-medium text-sm items-center py-4 px-4 text-gray-900 ${!isActive && 'hover:bg-gray-100 hover:text-gray-900'} rounded-md`
                        }
                    >
                        Employee Expertise Dashboard
                    </NavLink>
                    <NavLink
                        to={ROUTES.manageCategories}
                        className={({ isActive }) =>
                            `${isActive ? 'bg-primary-color text-white-color' : 'bg-white'} flex font-medium text-sm items-center py-4 px-4 text-gray-900 ${!isActive && 'hover:bg-gray-100 hover:text-gray-900'} rounded-md`
                        }
                    >
                        Manage Categories
                    </NavLink>
                    <NavLink
                        to={ROUTES.manageSubCategories}
                        className={({ isActive }) =>
                            `${isActive ? 'bg-primary-color text-white-color' : 'bg-white'} flex font-medium text-sm items-center py-4 px-4 text-gray-900 ${!isActive && 'hover:bg-gray-100 hover:text-gray-900'} rounded-md`
                        }
                    >
                        Manage Sub Categories
                    </NavLink>
                    <NavLink
                        to={ROUTES.categorySubCategoryMapping}
                        className={({ isActive }) =>
                            `${isActive ? 'bg-primary-color text-white-color' : 'bg-white'} flex font-medium text-sm items-center py-4 px-4 text-gray-900 ${!isActive && 'hover:bg-gray-100 hover:text-gray-900'}  rounded-md`
                        }
                    >
                        Category Sub Category Mapping
                    </NavLink>
                    <NavLink
                        to={ROUTES.userExpertiesMapping}
                        className={({ isActive }) =>
                            `${isActive ? 'bg-primary-color text-white-color' : 'bg-white'} flex font-medium text-sm items-center py-4 px-4 text-gray-900 ${!isActive && 'hover:bg-gray-100 hover:text-gray-900'} rounded-md`
                        }
                    >
                        User Experties Mapping
                    </NavLink>
                </div>
            </div>
            <div
                onClick={() => dispatch(menu())}
                className="fixed top-0 left-0 w-full h-full bg-black/50 z-30 lg:hidden sidebar-overlay"
            ></div>
        </section>
    )
}

export default SideBarMenu
