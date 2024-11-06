import { useState } from 'react'
import { Button, InputField, Switchtabs } from '../../../components'
import { ITEMS_LIMIT, statusTabs } from '../../../constants/constents'
import { SubCategory } from '../../../constants/types'
import { useAppDispatch, useAppSelector } from '../../../store'
import {
    addSubCategoryAction,
    deleteSubCategoryAction,
    editSubCategoryAction,
    getSubCategoriesAction,
} from '../../../store/reducersAndActions/subCategory/subCategory.actions'
import { showErrorToast } from '../../../utils/toast'
import { useSearchParams } from 'react-router-dom'

interface SubCategoryActionsProps {
    setModal: (value: boolean) => void
    data?: SubCategory
    action: 'Add' | 'Edit' | 'Delete'
}

const SubCategoryActions: React.FC<SubCategoryActionsProps> = ({
    data,
    setModal,
    action,
}) => {
    const { user } = useAppSelector((state) => state.auth)

    const [subCategory, setSubCategory] = useState<SubCategory>({
        subCategoryName: data?.subCategoryName || '',
        description: data?.description || '',
        isActive: data?.isActive,
        isDeleted: data?.isDeleted,
        insertedUserID: user?.employeeID,
        updatedUserID: user?.employeeID,
    })

    const [searchParams] = useSearchParams()

    const page = parseInt(searchParams.get('page') || '1')

    const dispatch = useAppDispatch()

    const reSetSubCategoryState = () => {
        setSubCategory({
            subCategoryName: '',
            description: '',
            isActive: true,
            isDeleted: false,
            insertedUserID: user?.employeeID,
            updatedUserID: user?.employeeID,
        })
    }

    const updateList = () => {
        dispatch(
            getSubCategoriesAction({
                limit: ITEMS_LIMIT.toString(),
                page: page.toString(),
            })
        )
        setModal(false)
    }

    const validateSubCategory = (): boolean => {
        if (!subCategory.subCategoryName) {
            showErrorToast('Sub Category Name Is Required')
            return false
        }

        if (!subCategory.description) {
            showErrorToast('Sub Category Description Is Required')
            return false
        }
        return true
    }

    const addSubCategoryHandler = (data: SubCategory) => {
        if (!validateSubCategory()) return
        dispatch(addSubCategoryAction(data)).then(updateList)
        reSetSubCategoryState()
    }

    const editSubCategoryHandler = (subCategory: SubCategory) => {
        if (!validateSubCategory()) return
        dispatch(
            editSubCategoryAction({
                ...subCategory,
                subCategoryID: data?.subCategoryID,
            })
        ).then(updateList)
        reSetSubCategoryState()
    }

    const deleteSubCategoryHandler = (data: SubCategory) => {
        dispatch(deleteSubCategoryAction(data)).then(updateList)
        reSetSubCategoryState()
    }

    return (
        <div className="flex flex-col gap-4">
            {action !== 'Delete' && (
                <>
                    <div className="flex flex-col gap-4 md:flex-row">
                        <InputField
                            label="Sub Domain"
                            placeholder="Enter value"
                            width="100%"
                            value={subCategory.subCategoryName}
                            onChange={(v) =>
                                setSubCategory((prev) => ({
                                    ...prev,
                                    subCategoryName: v,
                                }))
                            }
                        />
                    </div>
                    <div className="flex flex-col gap-4 md:flex-row">
                        <Switchtabs
                            label="Status"
                            setSelectedTab={(v) =>
                                setSubCategory((prev) => ({
                                    ...prev,
                                    isActive: v,
                                }))
                            }
                            tabValues={statusTabs}
                            selectedTab={subCategory.isActive || false}
                        />
                    </div>
                    <div className="flex flex-col gap-4">
                        <InputField
                            label="Description"
                            placeholder="Enter value"
                            width="100%"
                            type="textarea"
                            height="20rem"
                            value={subCategory.description}
                            onChange={(v) =>
                                setSubCategory((prev) => ({
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
                        <strong>{subCategory.subCategoryName}</strong> Sub
                        Domain?
                    </h1>
                </div>
            )}

            <div className="flex justify-end gap-4">
                {action === 'Add' && (
                    <Button
                        title="Submit"
                        onClick={() => addSubCategoryHandler(subCategory)}
                    />
                )}
                {action === 'Edit' && (
                    <Button
                        title="Update"
                        onClick={() => editSubCategoryHandler(subCategory)}
                    />
                )}

                {action === 'Delete' && (
                    <>
                        <Button
                            state="delete"
                            title="Delete"
                            onClick={() => deleteSubCategoryHandler(data || {})}
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

export default SubCategoryActions
