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
import { addCategoriesSubCategoriesAction } from '../../../store/reducersAndActions/categoriesSubCategoriesMaping/categoriesSubCategories.actions'
import { showErrorToast } from '../../../utils/toast'

const AddCategoriesSubCategories = () => {
    const { category } = useAppSelector((state) => state.category)
    const { subCategory } = useAppSelector((state) => state.subCategory)

    const dispatch = useAppDispatch()

    const [categoriesSubCategory, setcategoriesSubCategory] =
        useState<CategorySubCategoryMaping>({
            categoryId: undefined,
            subCategoryId: undefined,
            description: '',
            isActive: true,
            isDeleted: false,
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

    const addCategorySubCategoryHandler = (data: CategorySubCategoryMaping) => {
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

        dispatch(addCategoriesSubCategoriesAction(data))

        setcategoriesSubCategory({
            categoryId: undefined,
            subCategoryId: undefined,
            description: '',
            isActive: true,
        })
    }

    return (
        <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-4 md:flex-row">
                <DropdownInputField
                    options={category}
                    getOptionLabel={getCategoryOptionLabel}
                    onSelect={handleSelectCategory}
                    label="Select category"
                    placeholder="Select value"
                    width="65%"
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
                    label="Select sub category"
                    placeholder="Select value"
                    width="65%"
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
                    title="Submit"
                    onClick={() =>
                        addCategorySubCategoryHandler(categoriesSubCategory)
                    }
                />
            </div>
        </div>
    )
}

export default AddCategoriesSubCategories
