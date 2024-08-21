import { useState } from 'react'
import { Button, DropdownInputField } from '../../../components'
import { Category } from '../../../constants/types'
import { useAppDispatch, useAppSelector } from '../../../store'
import { deleteCategoryAction } from '../../../store/reducersAndActions/category/category.actions'

const DeleteCategory = () => {
    const categoryList = useAppSelector((state) => state.category.category)

    const [category, setCategory] = useState<Category>({})

    const dispatch = useAppDispatch()

    const deleteCategoryHandler = (data: Category) => {
        dispatch(deleteCategoryAction(data))
        setCategory({})
    }

    const handleSelect = (option: (typeof categoryList)[0]) => {
        console.log('Selected option:', option)
        setCategory(option)
    }

    const getOptionLabel = (option: (typeof categoryList)[0]) =>
        option.categoryName || ''

    return (
        <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-4 md:flex-row">
                <DropdownInputField
                    options={categoryList}
                    getOptionLabel={getOptionLabel}
                    label="Category"
                    placeholder="Select value"
                    width="65%"
                    onSelect={handleSelect}
                />
            </div>
            <div className="flex justify-end">
                <Button
                    width="15%"
                    title="Delete"
                    onClick={() => deleteCategoryHandler(category)}
                />
            </div>
        </div>
    )
}

export default DeleteCategory
