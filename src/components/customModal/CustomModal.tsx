import React from 'react'
import { Modal } from '@mui/material'

interface CustomModalProps {
    children: React.ReactNode
    open: boolean
    onClose: () => void
    title?: string
}

const CustomModal: React.FC<CustomModalProps> = ({
    children,
    open,
    onClose,
    title,
}) => {
    return (
        <Modal
            open={open}
            onClose={onClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <div className="flex justify-center items-center w-full h-full">
                <div className="bg-white  rounded-lg shadow-lg w-1/2">
                    <div className=" px-6 py-4 border-b border-b-gray-200 flex w-full justify-between items-center">
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
                    <div className="p-6">{children}</div>
                </div>
            </div>
        </Modal>
    )
}

export default CustomModal
