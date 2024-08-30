import { useState } from 'react'
import {
    Button,
    DropdownInputField,
    InputField,
    Switchtabs,
} from '../../../components'
import { DUMMY_USER_ID, statusTabs } from '../../../constants/constents'
import { CategorySubCategoryMaping } from '../../../constants/types'
import { useAppDispatch, useAppSelector } from '../../../store'
import { editCategorySubCategoryMapingAction } from '../../../store/reducersAndActions/categoriesSubCategoriesMaping/categoriesSubCategories.actions'
import { showErrorToast } from '../../../utils/toast'

const EditCategoriesSubCategories = () => {
    const { categoriesSubCategories } = useAppSelector(
        (state) => state.categoriesSubCategories
    )
    const { category } = useAppSelector((state) => state.category)
    const { subCategory } = useAppSelector((state) => state.subCategory)

    const [categoriesSubCategory, setcategoriesSubCategory] =
        useState<CategorySubCategoryMaping>({
            mappingId: undefined,
            categoryId: undefined,
            subCategoryId: undefined,
            description: '',
            isActive: true,
            updatedUserId: DUMMY_USER_ID,
        })

    const handleSelectMaping = (
        option: (typeof categoriesSubCategories)[0]
    ) => {
        console.log('Selected option:', option)
        setcategoriesSubCategory({
            mappingId: option.mappingId,
            categoryId: option.categoryId,
            subCategoryId: option.subCategoryId,
            description: option.description,
            isActive: option.isActive,
            updatedUserId: DUMMY_USER_ID,
        })
    }

    const getMapingOptionLabel = (
        option: (typeof categoriesSubCategories)[0]
    ) => `Maping ID - ${option.mappingId?.toString()}` || ''

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

    const dispatch = useAppDispatch()

    const editMapingHandler = (data: CategorySubCategoryMaping) => {
        if (!categoriesSubCategory.mappingId) {
            showErrorToast('Please Select Maping that you want to edit')
            return
        }

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
        dispatch(editCategorySubCategoryMapingAction(data))
        setcategoriesSubCategory({
            mappingId: undefined,
            categoryId: undefined,
            subCategoryId: undefined,
            description: '',
            isActive: true,
            updatedUserId: DUMMY_USER_ID,
        })
    }

    return (
        <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-4 md:flex-row">
                <DropdownInputField
                    options={categoriesSubCategories}
                    getOptionLabel={getMapingOptionLabel}
                    label="Select maping"
                    placeholder="Select value"
                    width="65%"
                    onSelect={handleSelectMaping}
                />
            </div>
            <hr />
            <div className="flex flex-col gap-4 md:flex-row">
                <DropdownInputField
                    options={category}
                    getOptionLabel={getCategoryOptionLabel}
                    onSelect={handleSelectCategory}
                    label="Change category"
                    placeholder="Select value"
                    width="65%"
                    selectedOption={category.find(
                        (item) =>
                            item.categoryID === categoriesSubCategory.categoryId
                    )}
                />
                <Switchtabs
                    label="Status"
                    setSelectedTab={(v) =>
                        setcategoriesSubCategory((prev) => ({
                            ...prev,
                            isActive: v,
                        }))
                    }
                    tabValues={statusTabs}
                    selectedTab={categoriesSubCategory.isActive || false}
                />
            </div>
            <div className="flex flex-col gap-4">
                <DropdownInputField
                    options={subCategory}
                    getOptionLabel={getCategorySubOptionLabel}
                    onSelect={handleSelectSubCategory}
                    label="Change sub category"
                    placeholder="Select value"
                    width="65%"
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
                    width="65%"
                    type="textarea"
                    height="10rem"
                    value={categoriesSubCategory.description}
                    onChange={(v) =>
                        setcategoriesSubCategory((prev) => ({
                            ...prev,
                            description: v,
                        }))
                    }
                />
            </div>
            <div className="flex justify-end">
                <Button
                    width="15%"
                    title="Update"
                    onClick={() => editMapingHandler(categoriesSubCategory)}
                />
            </div>
        </div>
    )
}

export default EditCategoriesSubCategories
