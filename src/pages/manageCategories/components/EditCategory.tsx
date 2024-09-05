import React, { useState } from 'react'
import { Button, InputField, Switchtabs } from '../../../components'
import { DUMMY_USER_ID, statusTabs } from '../../../constants/constents'
import { Category } from '../../../constants/types'
import { useAppDispatch } from '../../../store'
import { editCategoryAction } from '../../../store/reducersAndActions/category/category.actions'
import { showErrorToast } from '../../../utils/toast'

interface EditCategoryProps {
    data: Category
    setModal: (value: boolean) => void
}

const EditCategory: React.FC<EditCategoryProps> = ({ data, setModal }) => {
    // const categoryList = useAppSelector((state) => state.category.category)

    const [category, setCategory] = useState<Category>({
        categoryID: data.categoryID,
        categoryName: data.categoryName || '',
        description: data.description || '',
        isActive: data.isActive,
        isDeleted: data.isDeleted,
        insertedUserID: DUMMY_USER_ID,
        updatedUserID: DUMMY_USER_ID,
    })

    // const handleSelect = (option: (typeof categoryList)[0]) => {
    //     console.log('Selected option:', option)
    //     setCategory(option)
    // }

    const dispatch = useAppDispatch()

    const editCategoryHandler = (data: Category) => {
        if (!category.categoryID) {
            showErrorToast('Please Select Category')
            return
        }

        if (!category.categoryName) {
            showErrorToast('Category Name Is Required')
            return
        }

        if (!category.description) {
            showErrorToast('Category Description Is Required')
            return
        }
        dispatch(editCategoryAction(data)).then(() => setModal(false))
        setCategory({
            categoryName: '',
            description: '',
            isActive: true,
            isDeleted: false,
            insertedUserID: 2,
            updatedUserID: 2,
        })
    }

    // const getOptionLabel = (option: (typeof categoryList)[0]) =>
    //     option.categoryName || ''

    return (
        <div className="flex flex-col gap-4">
            {/* <div className="flex flex-col gap-4 md:flex-row">
                <DropdownInputField
                    getOptionLabel={getOptionLabel}
                    options={categoryList}
                    label="Category"
                    placeholder="Select value"
                    width="65%"
                    onSelect={handleSelect}
                />
            </div> */}
            <div className="flex flex-col gap-4 md:flex-row">
                <InputField
                    label="Category"
                    placeholder="Enter value"
                    width="65%"
                    value={category.categoryName}
                    onChange={(v) =>
                        setCategory((prev) => ({
                            ...prev,
                            categoryName: v,
                        }))
                    }
                />
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
                    width="65%"
                    type="textarea"
                    height="10rem"
                    value={category.description}
                    onChange={(v) =>
                        setCategory((prev) => ({
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
                    onClick={() => editCategoryHandler(category)}
                />
            </div>
        </div>
    )
}

export default EditCategory
