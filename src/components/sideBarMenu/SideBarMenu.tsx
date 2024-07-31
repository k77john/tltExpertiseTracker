import { ROUTES } from '../../constants/routes'
import { NavLink } from 'react-router-dom'

const SideBarMenu: React.FC = () => {
    return (
        <section className="lg:h-screen w-full md:h-screen       shadow-lg p-4 sm:p-6 md:p-8  sticky top-0 z-10">
            <div className="flex flex-col gap-4">
                <NavLink
                    to={ROUTES.dashBoard}
                    className={({ isActive }) =>
                        isActive
                            ? 'bg-primary-color text-white rounded-md p-3 sm:p-4 text-xs sm:text-sm'
                            : 'text-body-text-color   p-3 sm:p-4 text-xs sm:text-sm rounded-md'
                    }
                >
                    Employee Expertise Dashboard
                </NavLink>
                <NavLink
                    to={ROUTES.manageCategories}
                    className={({ isActive }) =>
                        isActive
                            ? 'bg-primary-color text-white rounded-md p-3 sm:p-4 text-xs sm:text-sm'
                            : 'text-body-text-color   p-3 sm:p-4 text-xs sm:text-sm rounded-md'
                    }
                >
                    Manage Categories
                </NavLink>
                <NavLink
                    to={ROUTES.manageSubCategories}
                    className={({ isActive }) =>
                        isActive
                            ? 'bg-primary-color text-white rounded-md p-3 sm:p-4 text-xs sm:text-sm'
                            : 'text-body-text-color  p-3 sm:p-4 text-xs sm:text-sm rounded-md'
                    }
                >
                    Manage Sub Categories
                </NavLink>
                <NavLink
                    to={ROUTES.categorySubCategoryMaping}
                    className={({ isActive }) =>
                        isActive
                            ? 'bg-primary-color text-white rounded-md p-3 sm:p-4 text-xs sm:text-sm'
                            : 'text-body-text-color  p-3 sm:p-4 text-xs sm:text-sm rounded-md'
                    }
                >
                    Category Sub Category Maping
                </NavLink>
                <NavLink
                    to={ROUTES.userExpertiesMaping}
                    className={({ isActive }) =>
                        isActive
                            ? 'bg-primary-color text-white rounded-md p-3 sm:p-4 text-xs sm:text-sm'
                            : 'text-body-text-color  p-3 sm:p-4 text-xs sm:text-sm rounded-md'
                    }
                >
                    User Experties Maping
                </NavLink>
            </div>
        </section>
    )
}

export default SideBarMenu
