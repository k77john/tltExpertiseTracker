import { useState } from 'react'
import { Button, DropdownInputField } from '../../../components'
import { useAppDispatch, useAppSelector } from '../../../store'
import { CategorySubCategoryMaping } from '../../../constants/types'
import { DUMMY_USER_ID } from '../../../constants/constents'
import { showErrorToast } from '../../../utils/toast'
import { deleteCategorySubCategoryMappingAction } from '../../../store/reducersAndActions/categoriesSubCategoriesMaping/categoriesSubCategories.actions'

const DeleteCategoriesSubCategories = () => {
    const { categoriesSubCategories } = useAppSelector(
        (state) => state.categoriesSubCategories
    )

    const [categoriesSubCategory, setcategoriesSubCategory] =
        useState<CategorySubCategoryMaping>({
            mappingId: undefined,
            updatedUserId: DUMMY_USER_ID,
        })

    const handleSelectMaping = (
        option: (typeof categoriesSubCategories)[0]
    ) => {
        console.log('Selected option:', option)
        setcategoriesSubCategory({
            mappingId: option.mappingId,
            updatedUserId: DUMMY_USER_ID,
        })
    }

    const getMapingOptionLabel = (
        option: (typeof categoriesSubCategories)[0]
    ) => `Maping ID - ${option.mappingId?.toString()}` || ''

    const dispatch = useAppDispatch()

    const deleteMapingHandler = (data: CategorySubCategoryMaping) => {
        if (!categoriesSubCategory.mappingId) {
            showErrorToast('Please Select Maping that you want to edit')
            return
        }
        dispatch(deleteCategorySubCategoryMappingAction(data))
        setcategoriesSubCategory({
            mappingId: undefined,
            updatedUserId: DUMMY_USER_ID,
        })
    }
    return (
        <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-4 md:flex-row">
                <DropdownInputField
                    options={categoriesSubCategories}
                    getOptionLabel={getMapingOptionLabel}
                    label="Select Maping"
                    placeholder="Select value"
                    width="65%"
                    onSelect={handleSelectMaping}
                    id={categoriesSubCategory.mappingId}
                    selectedOption={categoriesSubCategories.find(
                        (item) =>
                            item.mappingId === categoriesSubCategory.mappingId
                    )}
                />
            </div>
            <div className="flex justify-end">
                <Button
                    width="15%"
                    title="Delete"
                    onClick={() => deleteMapingHandler(categoriesSubCategory)}
                />
            </div>
        </div>
    )
}

export default DeleteCategoriesSubCategories
