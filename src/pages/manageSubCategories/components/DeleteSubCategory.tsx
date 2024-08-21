import { Button, DropdownInputField } from '../../../components'
import { useAppSelector } from '../../../store'

const DeleteSubCategory = () => {
    const subCategoryList = useAppSelector(
        (state) => state.subCategory.subCategory
    )

    // const [subCategory, setSubCategory] = useState<SubCategory>({})

    // const dispatch = useAppDispatch()

    // const deleteCategoryHandler = (data: SubCategory) => {
    //     dispatch(deleteCategoryAction(data))
    //     setSubCategory({})
    // }

    const handleSelect = (option: (typeof subCategoryList)[0]) => {
        console.log('Selected option:', option)
        // setSubCategory(option)
    }

    const getOptionLabel = (option: (typeof subCategoryList)[0]) =>
        option.subCategoryName || ''

    return (
        <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-4 md:flex-row">
                <DropdownInputField
                    options={subCategoryList}
                    getOptionLabel={getOptionLabel}
                    label="Select Sub Category"
                    placeholder="Select value"
                    width="65%"
                    onSelect={handleSelect}
                />
            </div>
            <div className="flex justify-end">
                <Button width="15%" title="Delete" onClick={() => {}} />
            </div>
        </div>
    )
}

export default DeleteSubCategory
