import { useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { Button, InputField, Switchtabs } from '../../../components'
import DomainDropDown from '../../../components/Dropdown/DomainDropDown'
import SubDomainDropDown from '../../../components/Dropdown/SubDomainDropDown'
import { statusTabs } from '../../../constants/constents'
import { CategorySubCategoryMapping } from '../../../constants/types'
import { useAppDispatch, useAppSelector } from '../../../store'
import {
    addCategoriesSubCategoriesAction,
    deleteCategorySubCategoryMappingAction,
    editCategorySubCategoryMappingAction,
    getCategoriesSubCategoriesAction,
} from '../../../store/reducersAndActions/categoriesSubCategoriesMapping/categoriesSubCategories.actions'
import { showErrorToast } from '../../../utils/toast'

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
    const { user } = useAppSelector((state) => state.auth)
    const [searchParams] = useSearchParams()

    const dispatch = useAppDispatch()

    const page = parseInt(searchParams.get('page') || '1')

    const [categoriesSubCategory, setcategoriesSubCategory] =
        useState<CategorySubCategoryMapping>({
            categoryId: data?.categoryId,
            subCategoryId: data?.subCategoryId,
            description: data?.description,
            isActive: data?.isActive,
            isDeleted: data?.isDeleted,
            insertedUserId: user?.employeeID,
            updatedUserId: user?.employeeID,
        })

    const reSetMeppingsState = () => {
        setcategoriesSubCategory({
            categoryId: undefined,
            subCategoryId: undefined,
            description: '',
            isActive: true,
            updatedUserId: user?.employeeID,
        })
    }

    const updateList = () => {
        dispatch(
            getCategoriesSubCategoriesAction({
                limit: '12',
                page: page.toString(),
            })
        )
        setModal(false)
    }

    console.log('====================================')
    console.log(data)
    console.log('====================================')

    const validateMapping = (): boolean => {
        if (!categoriesSubCategory.categoryId) {
            showErrorToast('Please Select Domain')
            return false
        }

        if (!categoriesSubCategory.subCategoryId) {
            showErrorToast('Please Select Sub Domain')
            return false
        }

        if (!categoriesSubCategory.description) {
            showErrorToast('Domain Description Is Required')
            return false
        }
        return true
    }

    const handleSelectCategory = (option: (typeof category)[0]) => {
        console.log('Selected option:', option)
        setcategoriesSubCategory((prev) => ({
            ...prev,
            categoryId: option.categoryID,
        }))
    }

    const handleSelectSubCategory = (option: (typeof subCategory)[0]) => {
        console.log('Selected option:', option)
        setcategoriesSubCategory((prev) => ({
            ...prev,
            subCategoryId: option.subCategoryID,
        }))
    }

    const addCategorySubCategoryHandler = (
        data: CategorySubCategoryMapping
    ) => {
        if (!validateMapping()) return
        dispatch(addCategoriesSubCategoriesAction(data)).then(updateList)
        reSetMeppingsState()
    }

    const editMappingHandler = (Mapping: CategorySubCategoryMapping) => {
        if (!validateMapping()) return
        dispatch(
            editCategorySubCategoryMappingAction({
                ...Mapping,
                mappingId: data?.mappingId,
            })
        ).then(updateList)
        reSetMeppingsState()
    }

    const deleteMappingHandler = (data: CategorySubCategoryMapping) => {
        dispatch(
            deleteCategorySubCategoryMappingAction({
                ...data,
                updatedUserId: user?.employeeID,
            })
        ).then(updateList)
        reSetMeppingsState()
    }

    return (
        <div className="flex flex-col gap-4">
            {action !== 'Delete' && (
                <>
                    <div className="flex flex-col gap-4">
                        <InputField
                            label="Mapping"
                            placeholder="Enter value"
                            width="100%"
                            type="text"
                            value={categoriesSubCategory.description}
                            onChange={(v) =>
                                setcategoriesSubCategory((prev) => ({
                                    ...prev,
                                    description: v,
                                }))
                            }
                        />
                    </div>
                    <div className="flex flex-col gap-4 md:flex-row">
                        <DomainDropDown
                            onSelect={handleSelectCategory}
                            label="Select Domain"
                            placeholder="Select value"
                            width="100%"
                            selectedOption={data?.categoryName}
                        />
                    </div>
                    <div className="flex flex-col gap-4">
                        <SubDomainDropDown
                            onSelect={handleSelectSubCategory}
                            label="Select Sub Domain"
                            placeholder="Select value"
                            width="100%"
                            selectedOption={data?.subCategoryName}
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
                </>
            )}
            {action === 'Delete' && (
                <div className="flex flex-col gap-4 md:flex-row">
                    <h1 className="text-md font-normal">
                        Do you want to delete{' '}
                        <strong>Mapping ID - {data?.mappingId}</strong> Domain?
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
