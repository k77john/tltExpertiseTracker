import { useState } from 'react'
import {
    addCategory,
    deleteCategory,
    editCategory,
} from '../services/category.services'
import { RootState, useAppSelector } from '../store'
import { showErrorToast } from '../utils/toast'
import { Category } from './../constants/types'

const useCategory = (setModal: (open: boolean) => void) => {
    const userFromRedux = useAppSelector((state: RootState) => state.auth.user)

    const user =
        userFromRedux || JSON.parse(localStorage.getItem('user') || 'null')

    const [category, setCategory] = useState<Category>({
        categoryName: '',
        description: '',
        isActive: true,
        isDeleted: false,
        insertedUserID: user?.employeeID || 0,
        updatedUserID: user?.employeeID || 0,
    })

    const [loading, setLoading] = useState<boolean>(false)

    const validateCategory = (): boolean => {
        if (!category.categoryName) {
            showErrorToast('Domain Name Is Required')
            return false
        }
        if (!category.description) {
            showErrorToast('Domain Description Is Required')
            return false
        }
        return true
    }

    const addCategoryHandler = async () => {
        setLoading(true)
        if (!validateCategory()) return
        await addCategory(category)
        resetCategory()
        setModal(false)
        setLoading(false)
    }

    const editCategoryHandler = async (categoryID: number) => {
        setLoading(true)
        if (!validateCategory()) return
        await editCategory({ ...category, categoryID: categoryID })
        setModal(false)
        resetCategory()
        setLoading(false)
    }

    const deleteCategoryHandler = async (categoryID: number) => {
        setLoading(true)
        await deleteCategory({ ...category, categoryID: categoryID })
        setModal(false)
        resetCategory()
        setLoading(false)
    }

    const resetCategory = () => {
        setCategory({
            categoryName: '',
            description: '',
            isActive: true,
            isDeleted: false,
            insertedUserID: user?.employeeID || 0,
            updatedUserID: user?.employeeID || 0,
        })
    }

    return {
        category,
        setCategory,
        loading,
        setLoading,
        addCategoryHandler,
        editCategoryHandler,
        deleteCategoryHandler,
    }
}

export default useCategory
