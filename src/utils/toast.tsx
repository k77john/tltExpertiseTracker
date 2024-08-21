import { toast } from 'react-toastify'

export const showErrorToast = (message: string) => {
    toast.error(message, {
        position: 'top-center',
        autoClose: 3000,
    })
}

export const showSuccessToast = (message: string) => {
    toast.success(message, {
        position: 'top-center',
        autoClose: 3000,
    })
}
