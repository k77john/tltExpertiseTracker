import { useState } from 'react'
import { Button, InputField, Switchtabs } from '../../../components'
import { DUMMY_USER_ID, statusTabs } from '../../../constants/constents'
import { Category } from '../../../constants/types'
import { useAppDispatch } from '../../../store'
import { addCategoryAction } from '../../../store/reducersAndActions/category/category.actions'
import { showErrorToast } from '../../../utils/toast'

const AddNewCategory = () => {
    const [category, setCategory] = useState<Category>({
        categoryName: '',
        description: '',
        isActive: true,
        isDeleted: false,
        insertedUserID: DUMMY_USER_ID,
        updatedUserID: DUMMY_USER_ID,
    })

    const dispatch = useAppDispatch()

    const addCategoryHandler = (data: Category) => {
        if (!category.categoryName) {
            showErrorToast('Category Name Is Required')
            return
        }

        if (!category.description) {
            showErrorToast('Category Description Is Required')
            return
        }

        dispatch(addCategoryAction(data))

        setCategory({
            categoryName: '',
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
                    title="Submit"
                    onClick={() => addCategoryHandler(category)}
                />
            </div>
        </div>
    )
}

export default AddNewCategory
