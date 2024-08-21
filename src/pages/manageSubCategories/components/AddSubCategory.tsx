import { useState } from 'react'
import { Button, InputField, Switchtabs } from '../../../components'
import { SubCategory } from '../../../constants/types'
import { DUMMY_USER_ID, statusTabs } from '../../../constants/constents'
import { useAppDispatch } from '../../../store'
import { showErrorToast } from '../../../utils/toast'
import { addSubCategoryAction } from '../../../store/reducersAndActions/subCategory/subCategory.actions'

const AddSubCategory = () => {
    const [subCategory, setSubCategory] = useState<SubCategory>({
        subCategoryName: '',
        description: '',
        isActive: true,
        isDeleted: false,
        insertedUserID: DUMMY_USER_ID,
        updatedUserID: DUMMY_USER_ID,
    })

    const dispatch = useAppDispatch()

    const addSubCategoryHandler = (data: SubCategory) => {
        if (!subCategory.subCategoryName) {
            showErrorToast('Category Name Is Required')
            return
        }

        if (!subCategory.description) {
            showErrorToast('Category Description Is Required')
            return
        }

        dispatch(addSubCategoryAction(data))

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
            <div className="flex flex-col gap-4 md:flex-row">
                <InputField
                    label="Sub Category"
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
                    title="Submit"
                    onClick={() => addSubCategoryHandler(subCategory)}
                />
            </div>
        </div>
    )
}

export default AddSubCategory
