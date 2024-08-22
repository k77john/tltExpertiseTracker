import { useState } from 'react'
import {
    Button,
    DropdownInputField,
    InputField,
    Switchtabs,
} from '../../../components'
import { DUMMY_USER_ID, statusTabs } from '../../../constants/constents'
import { SubCategory } from '../../../constants/types'
import { useAppDispatch, useAppSelector } from '../../../store'
import { editSubCategoryAction } from '../../../store/reducersAndActions/subCategory/subCategory.actions'
import { showErrorToast } from '../../../utils/toast'

const EditSubCategory = () => {
    const subCategoryList = useAppSelector(
        (state) => state.subCategory.subCategory
    )

    const [subCategory, setSubCategory] = useState<SubCategory>({
        subCategoryName: '',
        description: '',
        isActive: true,
        isDeleted: false,
        insertedUserID: DUMMY_USER_ID,
        updatedUserID: DUMMY_USER_ID,
    })

    const handleSelect = (option: (typeof subCategoryList)[0]) => {
        console.log('Selected option:', option)
        setSubCategory(option)
    }

    const dispatch = useAppDispatch()

    const editSubCategoryHandler = (data: SubCategory) => {
        if (!subCategory.subCategoryID) {
            showErrorToast('Please Select Sub Category')
            return
        }

        if (!subCategory.subCategoryName) {
            showErrorToast('Sub Category Name Is Required')
            return
        }

        if (!subCategory.description) {
            showErrorToast('Sub Category Description Is Required')
            return
        }

        dispatch(editSubCategoryAction(data))
        setSubCategory({
            subCategoryName: '',
            description: '',
            isActive: true,
            isDeleted: false,
            insertedUserID: 2,
            updatedUserID: 2,
        })
    }

    const getOptionLabel = (option: (typeof subCategoryList)[0]) =>
        option.subCategoryName || ''

    return (
        <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-4 md:flex-row">
                <DropdownInputField
                    getOptionLabel={getOptionLabel}
                    options={subCategoryList}
                    label="Select Sub Category"
                    placeholder="Select value"
                    width="65%"
                    onSelect={handleSelect}
                />
            </div>
            <div className="flex flex-col gap-4 md:flex-row">
                <InputField
                    label="Edit Sub Category Name"
                    placeholder="Enter value"
                    width="65%"
                    value={subCategory.subCategoryName}
                    onChange={(v) =>
                        setSubCategory((prev) => ({
                            ...prev,
                            subCategoryName: v,
                        }))
                    }
                />
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
                    width="65%"
                    type="textarea"
                    height="10rem"
                    value={subCategory.description}
                    onChange={(v) =>
                        setSubCategory((prev) => ({
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
                    onClick={() => editSubCategoryHandler(subCategory)}
                />
            </div>
        </div>
    )
}

export default EditSubCategory
