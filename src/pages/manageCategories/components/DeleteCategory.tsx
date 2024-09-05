import { useState } from 'react'
import { Button } from '../../../components'
import { Category } from '../../../constants/types'
import { useAppDispatch } from '../../../store'
import { deleteCategoryAction } from '../../../store/reducersAndActions/category/category.actions'
import { showErrorToast } from '../../../utils/toast'

interface DeleteCategoryProps {
    data: Category
    setModal: (value: boolean) => void
}

const DeleteCategory: React.FC<DeleteCategoryProps> = ({ data, setModal }) => {
    // const categoryList = useAppSelector((state) => state.category.category)

    const [category, setCategory] = useState<Category>(data)

    const dispatch = useAppDispatch()

    const deleteCategoryHandler = (data: Category) => {
        if (!category.categoryID) {
            showErrorToast('Please Select Category')
            return
        }
        dispatch(deleteCategoryAction(data)).then(() => setModal(false))
        setCategory({})
    }

    // const handleSelect = (option: (typeof categoryList)[0]) => {
    //     console.log('Selected option:', option)
    //     setCategory(option)
    // }

    // const getOptionLabel = (option: (typeof categoryList)[0]) =>
    //     option.categoryName || ''

    return (
        <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-4 md:flex-row">
                {/* <DropdownInputField
                    options={categoryList}
                    getOptionLabel={getOptionLabel}
                    label="Category"
                    placeholder="Select value"
                    width="65%"
                    onSelect={handleSelect}
                /> */}
                <h1 className="text-md font-normal">
                    Do you want to delete{' '}
                    <strong>{category.categoryName}</strong> category?
                </h1>
            </div>
            <div className="flex justify-end gap-4">
                <Button
                    width="15%"
                    title="Cancle"
                    onClick={() => setModal(false)}
                />
                <Button
                    width="15%"
                    state="delete"
                    title="Delete"
                    onClick={() => deleteCategoryHandler(category)}
                />
            </div>
        </div>
    )
}

export default DeleteCategory
