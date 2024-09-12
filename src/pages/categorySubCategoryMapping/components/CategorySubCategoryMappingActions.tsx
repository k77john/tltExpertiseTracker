import { useEffect, useState } from 'react'
import {
    Button,
    DropdownInputField,
    InputField,
    Switchtabs,
} from '../../../components'
import { DUMMY_USER_ID, statusTabs } from '../../../constants/constents'
import { CategorySubCategoryMapping } from '../../../constants/types'
import { useAppDispatch, useAppSelector } from '../../../store'
import {
    addCategoriesSubCategoriesAction,
    deleteCategorySubCategoryMappingAction,
    editCategorySubCategoryMappingAction,
} from '../../../store/reducersAndActions/categoriesSubCategoriesMapping/categoriesSubCategories.actions'
import { showErrorToast } from '../../../utils/toast'
import { getSubCategoriesAction } from '../../../store/reducersAndActions/subCategory/subCategory.actions'
import { getCategoriesAction } from '../../../store/reducersAndActions/category/category.actions'

interface CategorySubCategoryMappingActionsProps {
    setModal: (value: boolean) => void
    data?: CategorySubCategoryMapping
    action: 'Add' | 'Edit' | 'Delete'
}

const CategorySubCategoryMappingActions: React.FC<
    CategorySubCategoryMappingActionsProps
> = ({ data, action, setModal }) => {
    const { category } = useAppSelector((state) => state.category)
    const { subCategory } = useAppSelector((state) => state.subCategory)

    const dispatch = useAppDispatch()

    useEffect(() => {
        dispatch(getSubCategoriesAction())
        dispatch(getCategoriesAction())
    }, [])

    const [categoriesSubCategory, setcategoriesSubCategory] =
        useState<CategorySubCategoryMapping>({
            categoryId: data?.categoryId,
            subCategoryId: data?.subCategoryId,
            description: data?.description,
            isActive: data?.isActive,
            isDeleted: data?.isDeleted,
            insertedUserId: DUMMY_USER_ID,
        })

    const handleSelectCategory = (option: (typeof category)[0]) => {
        console.log('Selected option:', option)
        setcategoriesSubCategory((prev) => ({
            ...prev,
            categoryId: option.categoryID,
        }))
    }

    const getCategoryOptionLabel = (option: (typeof category)[0]) =>
        option.categoryName || ''

    const handleSelectSubCategory = (option: (typeof subCategory)[0]) => {
        console.log('Selected option:', option)
        setcategoriesSubCategory((prev) => ({
            ...prev,
            subCategoryId: option.subCategoryID,
        }))
    }

    const getCategorySubOptionLabel = (option: (typeof subCategory)[0]) =>
        option.subCategoryName || ''

    const addCategorySubCategoryHandler = (
        data: CategorySubCategoryMapping
    ) => {
        if (!categoriesSubCategory.categoryId) {
            showErrorToast('Please select category')
            return
        }

        if (!categoriesSubCategory.subCategoryId) {
            showErrorToast('Please select sub category')
            return
        }

        if (!categoriesSubCategory.description) {
            showErrorToast('Sub Category Description Is Required')
            return
        }

        dispatch(addCategoriesSubCategoriesAction(data)).then(() =>
            setModal(false)
        )

        setcategoriesSubCategory({
            categoryId: undefined,
            subCategoryId: undefined,
            description: '',
            isActive: true,
        })
    }

    const editMappingHandler = (Mapping: CategorySubCategoryMapping) => {
        if (!categoriesSubCategory.categoryId) {
            showErrorToast('Please Select Category')
            return
        }

        if (!categoriesSubCategory.subCategoryId) {
            showErrorToast('Please Select Sub Category')
            return
        }

        if (!categoriesSubCategory.description) {
            showErrorToast('Category Description Is Required')
            return
        }
        dispatch(
            editCategorySubCategoryMappingAction({
                ...Mapping,
                mappingId: data?.mappingId,
            })
        ).then(() => setModal(false))
        setcategoriesSubCategory({
            categoryId: undefined,
            subCategoryId: undefined,
            description: '',
            isActive: true,
            updatedUserId: DUMMY_USER_ID,
        })
    }

    const deleteMappingHandler = (data: CategorySubCategoryMapping) => {
        dispatch(deleteCategorySubCategoryMappingAction(data)).then(() =>
            setModal(false)
        )
        setcategoriesSubCategory({
            mappingId: undefined,
            updatedUserId: DUMMY_USER_ID,
        })
    }

    return (
        <div className="flex flex-col gap-4">
            {action !== 'Delete' && (
                <>
                    <div className="flex flex-col gap-4 md:flex-row">
                        <DropdownInputField
                            options={category}
                            getOptionLabel={getCategoryOptionLabel}
                            onSelect={handleSelectCategory}
                            label="Select category"
                            placeholder="Select value"
                            width="100%"
                            selectedOption={category.find(
                                (item) =>
                                    item.categoryID ===
                                    categoriesSubCategory.categoryId
                            )}
                        />
                    </div>
                    <div className="flex flex-col gap-4 md:flex-row">
                        <Switchtabs
                            label="Status"
                            setSelectedTab={(v) =>
                                setcategoriesSubCategory((prev) => ({
                                    ...prev,
                                    isActive: v,
                                }))
                            }
                            tabValues={statusTabs}
                            selectedTab={
                                categoriesSubCategory.isActive || false
                            }
                        />
                    </div>
                    <div className="flex flex-col gap-4">
                        <DropdownInputField
                            options={subCategory}
                            getOptionLabel={getCategorySubOptionLabel}
                            onSelect={handleSelectSubCategory}
                            label="Select sub category"
                            placeholder="Select value"
                            width="100%"
                            selectedOption={subCategory.find(
                                (item) =>
                                    item.subCategoryID ===
                                    categoriesSubCategory.subCategoryId
                            )}
                        />
                    </div>
                    <div className="flex flex-col gap-4">
                        <InputField
                            label="Description"
                            placeholder="Enter value"
                            width="100%"
                            type="textarea"
                            height="20rem"
                            value={categoriesSubCategory.description}
                            onChange={(v) =>
                                setcategoriesSubCategory((prev) => ({
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
                        <strong>Mapping ID - {data?.mappingId}</strong>{' '}
                        category?
                    </h1>
                </div>
            )}
            <div className="flex justify-end gap-4">
                {action === 'Add' && (
                    <Button
                        title="Submit"
                        onClick={() =>
                            addCategorySubCategoryHandler(categoriesSubCategory)
                        }
                    />
                )}
                {action === 'Edit' && (
                    <Button
                        title="Update"
                        onClick={() =>
                            editMappingHandler(categoriesSubCategory)
                        }
                    />
                )}
                {action === 'Delete' && (
                    <>
                        <Button
                            state="delete"
                            title="Delete"
                            onClick={() => deleteMappingHandler(data || {})}
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

export default CategorySubCategoryMappingActions
