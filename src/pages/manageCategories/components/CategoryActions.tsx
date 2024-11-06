import { useState } from 'react'
import { Button, InputField, Switchtabs } from '../../../components'
import { ITEMS_LIMIT, statusTabs } from '../../../constants/constents'
import { Category } from '../../../constants/types'
import { useAppDispatch, useAppSelector } from '../../../store'
import {
    addCategoryAction,
    deleteCategoryAction,
    editCategoryAction,
    getCategoriesAction,
} from '../../../store/reducersAndActions/category/category.actions'
import { showErrorToast } from '../../../utils/toast'
import { useSearchParams } from 'react-router-dom'

interface CategoryActionsProps {
    setModal: (value: boolean) => void
    data?: Category
    action: 'Add' | 'Edit' | 'Delete'
}

const CategoryActions: React.FC<CategoryActionsProps> = ({
    setModal,
    data,
    action,
}) => {
    const { user } = useAppSelector((state) => state.auth)
    const [searchParams] = useSearchParams()
    const page = parseInt(searchParams.get('page') || '1')

    const [category, setCategory] = useState<Category>({
        categoryName: data?.categoryName || '',
        description: data?.description || '',
        isActive: data?.isActive,
        isDeleted: data?.isDeleted,
        insertedUserID: user?.employeeID,
        updatedUserID: user?.employeeID,
    })

    const reSetCategoryStates = () => {
        setCategory({
            categoryName: '',
            description: '',
            isActive: true,
            isDeleted: false,
            insertedUserID: user?.employeeID,
            updatedUserID: user?.employeeID,
        })
    }

    const updateList = () => {
        dispatch(
            getCategoriesAction({
                limit: ITEMS_LIMIT.toString(),
                page: page.toString(),
            })
        )
        setModal(false)
    }

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

    const dispatch = useAppDispatch()

    const addCategoryHandler = (data: Category) => {
        if (!validateCategory()) return
        dispatch(addCategoryAction(data)).then(updateList)
        reSetCategoryStates()
    }

    const editCategoryHandler = (category: Category) => {
        if (!validateCategory()) return
        dispatch(
            editCategoryAction({ ...category, categoryID: data?.categoryID })
        ).then(updateList)
        reSetCategoryStates()
    }

    const deleteCategoryHandler = (data: Category) => {
        dispatch(deleteCategoryAction(data)).then(updateList)
        reSetCategoryStates()
    }

    return (
        <div className="flex flex-col gap-4 w-full ">
            {action !== 'Delete' && (
                <>
                    <div className="flex flex-col gap-4 md:flex-row">
                        <InputField
                            label="Domain"
                            placeholder="Enter value"
                            width="100%"
                            value={category.categoryName}
                            onChange={(v) =>
                                setCategory((prev) => ({
                                    ...prev,
                                    categoryName: v,
                                }))
                            }
                        />
                    </div>
                    <div className="flex flex-col gap-4">
                        <Switchtabs
                            label="Status"
                            setSelectedTab={(v) =>
                                setCategory((prev) => ({
                                    ...prev,
                                    isActive: v,
                                }))
                            }
                            tabValues={statusTabs}
                            selectedTab={category.isActive || false}
                        />
                    </div>
                    <div className="flex flex-col gap-4">
                        <InputField
                            label="Description"
                            placeholder="Enter value"
                            width="100%"
                            type="textarea"
                            height="20rem"
                            value={category.description}
                            onChange={(v) =>
                                setCategory((prev) => ({
                                    ...prev,
                                    description: v,
                                }))
                            }
                        />
                    </div>
                </>
            )}

            {action === 'Delete' && (
                <div className="flex flex-col gap-4 md:flex-row">
                    <h1 className="text-md font-normal">
                        Do you want to delete{' '}
                        <strong>{category.categoryName}</strong> Domain?
                    </h1>
                </div>
            )}
            <div className="flex justify-end gap-4">
                {action === 'Add' && (
                    <Button
                        title="Submit"
                        onClick={() => addCategoryHandler(category)}
                    />
                )}
                {action === 'Edit' && (
                    <Button
                        title="Update"
                        onClick={() => editCategoryHandler(category)}
                    />
                )}

                {action === 'Delete' && (
                    <>
                        <Button
                            state="delete"
                            title="Delete"
                            onClick={() => deleteCategoryHandler(data || {})}
                        />
                        <Button
                            title="Cancle"
                            onClick={() => setModal(false)}
                        />
                    </>
                )}
            </div>
        </div>
    )
}

export default CategoryActions
