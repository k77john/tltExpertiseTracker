import React from 'react'

interface CustomModalProps {
    children: React.ReactNode
    open: boolean
    onClose: () => void
    title?: string
    width?: string
}

const CustomModal: React.FC<CustomModalProps> = ({
    children,
    onClose,
    title,
    open,
    width = 'lg:w-[30%] md:w-[50%] sm:w-[70%]',
}) => {
    return (
        <div
            className={`w-full h-full bg-transparent fixed top-0 left-0 z-50 flex ${!open && 'hidden'}`}
        >
            <div onClick={onClose} className="flex-1 bg-transparent"></div>
            <div className={`${width} w-full h-full bg-white shadow-lg`}>
                <div
                    className={`bg-white rounded-lg shadow-lg w-full  h-full transition-all overflow-hidden`}
                >
                    <div className=" px-6 py-4 border-b border-b-gray-200 h-[8%] flex w-full justify-between items-center">
                        <h1 className="text-2xl font-semibold">{title}</h1>
                        <button onClick={onClose}>
                            <svg
                                aria-hidden="true"
                                className="w-5 h-5"
                                fill="currentColor"
                                viewBox="0 0 20 20"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    fill-rule="evenodd"
                                    d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                                    clip-rule="evenodd"
                                ></path>
                            </svg>
                        </button>
                    </div>
                    <div className="py-6 h-[92%] overflow-y-auto relative ">
                        <div className=" px-6 overflow-y-autorelative h-full">
                            {children}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CustomModal
