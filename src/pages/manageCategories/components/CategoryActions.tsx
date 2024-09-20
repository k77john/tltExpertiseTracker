import { useState } from 'react'
import { Button, InputField, Switchtabs } from '../../../components'
import { DUMMY_USER_ID, statusTabs } from '../../../constants/constents'
import { Category } from '../../../constants/types'
import { useAppDispatch } from '../../../store'
import {
    addCategoryAction,
    deleteCategoryAction,
    editCategoryAction,
} from '../../../store/reducersAndActions/category/category.actions'
import { showErrorToast } from '../../../utils/toast'

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
    const [category, setCategory] = useState<Category>({
        categoryName: data?.categoryName || '',
        description: data?.description || '',
        isActive: data?.isActive,
        isDeleted: data?.isDeleted,
        insertedUserID: DUMMY_USER_ID,
        updatedUserID: DUMMY_USER_ID,
    })

    const dispatch = useAppDispatch()

    const addCategoryHandler = (data: Category) => {
        if (!category.categoryName) {
            showErrorToast('Category Name Is Required')
            return
        }

        if (!category.description) {
            showErrorToast('Category Description Is Required')
            return
        }

        dispatch(addCategoryAction(data)).then(() => setModal(false))

        setCategory({
            categoryName: '',
            description: '',
            isActive: true,
            isDeleted: false,
            insertedUserID: 2,
            updatedUserID: 2,
        })
    }

    const editCategoryHandler = (category: Category) => {
        if (!category.categoryName) {
            showErrorToast('Category Name Is Required')
            return
        }

        if (!category.description) {
            showErrorToast('Category Description Is Required')
            return
        }
        dispatch(
            editCategoryAction({ ...category, categoryID: data?.categoryID })
        ).then(() => setModal(false))
        setCategory({
            categoryName: '',
            description: '',
            isActive: true,
            isDeleted: false,
            insertedUserID: DUMMY_USER_ID,
            updatedUserID: DUMMY_USER_ID,
        })
    }

    const deleteCategoryHandler = (data: Category) => {
        dispatch(deleteCategoryAction(data)).then(() => setModal(false))
        setCategory({
            categoryName: '',
            description: '',
            isActive: true,
            isDeleted: false,
            insertedUserID: DUMMY_USER_ID,
            updatedUserID: DUMMY_USER_ID,
        })
    }

    return (
        <div className="flex flex-col gap-4 w-full ">
            {action !== 'Delete' && (
                <>
                    <div className="flex flex-col gap-4 md:flex-row">
                        <InputField
                            label="Category"
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
                        Do you want to delete
                        <strong>{category.categoryName}</strong> category?
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
