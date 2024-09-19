import { useAppDispatch, useAppSelector } from '../../store'
import { logOutAction } from '../../store/reducersAndActions/authentication/auth.actions'
import { menu } from '../../store/reducersAndActions/sideBarMenu/sideBarMenu.reducer'
import Button from '../button/Button'
import CustomDropDown from '../customDropdown/CustomDropdown'

const NavBar = () => {
    const toggleFullscreen = () => {
        if (document.fullscreenElement) {
            document.exitFullscreen()
        } else {
            document.documentElement.requestFullscreen()
        }
    }

    const dispatch = useAppDispatch()

    const { user } = useAppSelector((state) => state.auth)

    return (
        <div className="py-2 px-6 h-16 bg-[#ffffff] flex items-center shadow-md shadow-black/5 left-0 z-10 ">
            <button
                onClick={() => dispatch(menu())}
                type="button"
                className="text-lg text-gray-900 font-semibold sidebar-toggle flex gap-1 flex-col"
            >
                <div className="h-1 w-6 bg-gray-900 rounded-3xl" />
                <div className="h-1 w-6 bg-gray-900 rounded-3xl" />
                <div className="h-1 w-6 bg-gray-900 rounded-3xl" />
            </button>

            <ul className="ml-auto flex items-center">
                <button onClick={toggleFullscreen} id="fullscreen-button">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        className="hover:bg-gray-100 rounded-full"
                        viewBox="0 0 24 24"
                    >
                        <path d="M5 5h5V3H3v7h2zm5 14H5v-5H3v7h7zm11-5h-2v5h-5v2h7zm-2-4h2V3h-7v2h5z"></path>
                    </svg>
                </button>
                <li className="dropdown ml-3">
                    <CustomDropDown
                        children={
                            <button
                                type="button"
                                className="dropdown-toggle flex items-center"
                            >
                                <div className="flex-shrink-0 w-10 h-10 relative">
                                    <div className="p-1 bg-white rounded-full focus:outline-none focus:ring">
                                        <img
                                            className="w-8 h-8 rounded-full"
                                            src="https://laravelui.spruko.com/tailwind/ynex/build/assets/images/faces/9.jpg"
                                            alt=""
                                        />
                                        <div className="top-0 left-7 absolute w-3 h-3 bg-lime-400 border-2 border-white rounded-full animate-ping"></div>
                                        <div className="top-0 left-7 absolute w-3 h-3 bg-lime-500 border-2 border-white rounded-full"></div>
                                    </div>
                                </div>
                                <div className="p-2 md:block text-left">
                                    <h2 className="text-sm font-semibold text-gray-800">
                                        {user?.employeeName}
                                    </h2>
                                    <p className="text-xs text-gray-500">
                                        {user?.userName}
                                    </p>
                                </div>
                            </button>
                        }
                        dropdownComponent={
                            <div className="flex flex-col gap-3  w-full">
                                <p className="text-sm font-medium cursor-pointer">
                                    View Profile
                                </p>
                                <p className="text-sm font-medium cursor-pointer">
                                    Settings
                                </p>
                                <hr className="bg-gray-200" />
                                <Button
                                    onClick={() => dispatch(logOutAction())}
                                    title="Log Out"
                                    width={'w-full'}
                                />
                            </div>
                        }
                    />
                </li>
            </ul>
        </div>
    )
}

export default NavBar
