import { useState } from 'react'
import { Button, InputField, Switchtabs } from '../../../components'
import { statusTabs } from '../../../constants/constents'
import { SubCategory } from '../../../constants/types'
import { useAppDispatch, useAppSelector } from '../../../store'
import {
    addSubCategoryAction,
    deleteSubCategoryAction,
    editSubCategoryAction,
} from '../../../store/reducersAndActions/subCategory/subCategory.actions'
import { showErrorToast } from '../../../utils/toast'

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

    const dispatch = useAppDispatch()

    const addSubCategoryHandler = (data: SubCategory) => {
        if (!subCategory.subCategoryName) {
            showErrorToast('Sub Category Name Is Required')
            return
        }

        if (!subCategory.description) {
            showErrorToast('Sub Category Description Is Required')
            return
        }

        dispatch(addSubCategoryAction(data)).then(() => setModal(false))

        setSubCategory({
            subCategoryName: '',
            description: '',
            isActive: true,
            isDeleted: false,
            insertedUserID: 2,
            updatedUserID: 2,
        })
    }

    const editSubCategoryHandler = (subCategory: SubCategory) => {
        if (!subCategory.subCategoryName) {
            showErrorToast('Sub Domain Name Is Required')
            return
        }

        if (!subCategory.description) {
            showErrorToast('Sub Domain Description Is Required')
            return
        }

        dispatch(
            editSubCategoryAction({
                ...subCategory,
                subCategoryID: data?.subCategoryID,
            })
        ).then(() => setModal(false))
        setSubCategory({
            subCategoryName: '',
            description: '',
            isActive: true,
            isDeleted: false,
            insertedUserID: 2,
            updatedUserID: 2,
        })
    }

    const deleteSubCategoryHandler = (data: SubCategory) => {
        dispatch(deleteSubCategoryAction(data)).then(() => setModal(false))
        setSubCategory({
            subCategoryName: '',
            description: '',
            isActive: true,
            isDeleted: false,
            insertedUserID: 2,
            updatedUserID: 2,
        })
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
