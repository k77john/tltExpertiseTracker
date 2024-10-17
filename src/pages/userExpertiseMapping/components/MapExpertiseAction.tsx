import { useEffect, useState } from 'react'
import { DropdownInputField, Loader } from '../../../components'
import {
    CategorySubCategoryMapping,
    SelectedCatSubCatIdOptionTypes,
    SubCategory,
    User,
} from '../../../constants/types'
import { getExpertiseMappingByCatSubCatId } from '../../../services/expertiseMapping.services'
import { getSubCategoriesBasedOnCategory } from '../../../services/subCategory.services'
import { useAppDispatch, useAppSelector } from '../../../store'
import RatingsAndStatus from './RatingsAndStatus'
import { addExpertiseMappingAction } from '../../../store/reducersAndActions/expertiseMapping/expertiseMapping.actions'
import { showErrorToast } from '../../../utils/toast'

interface MapExpertiseActionsProps {
    setModal: (value: boolean) => void
    data?: CategorySubCategoryMapping
    action: 'Add' | 'Edit' | 'Delete'
}

export interface Mapping {
    ratings: number
    status: boolean
    mappingId: number
}

const MapExpertiseActions: React.FC<MapExpertiseActionsProps> = () => {
    const { category } = useAppSelector((state) => state.category)
    const { usersList, user } = useAppSelector((state) => state.auth)
    const [subCategory, setSubCategory] = useState<SubCategory[]>([])
    const [loading, setLoading] = useState(false)

    const [mapping, setMapping] = useState<CategorySubCategoryMapping[]>([])

    const dispatch = useAppDispatch()

    const [selectedOptions, setSelectedOptions] =
        useState<SelectedCatSubCatIdOptionTypes>({
            subCategoryId: undefined,
            categoryId: undefined,
        })

    const [selectedUser, setSelectedUser] = useState<User>()

    const handleFindMapping = async (value: SelectedCatSubCatIdOptionTypes) => {
        setLoading(true)
        const result = await getExpertiseMappingByCatSubCatId(value)
        if (result.isSuccessful) {
            setMapping(result.data)
        }
        setLoading(false)
    }

    const handleSelectCategory = async (option: (typeof category)[0]) => {
        const result = await getSubCategoriesBasedOnCategory(
            option.categoryID || 0
        )
        if (result.isSuccessful) {
            setSubCategory(result.data)
        }

        setSelectedOptions({
            subCategoryId: undefined,
            categoryId: option.categoryID,
        })
    }

    const handleSelectSubCategory = (option: (typeof subCategory)[0]) => {
        setSelectedOptions((prev) => ({
            ...prev,
            subCategoryId: option.subCategoryID,
        }))
    }

    const handleSelectUser = (option: (typeof usersList)[0]) => {
        setSelectedUser(option)
    }

    const getCategoryOptionLabel = (option: (typeof category)[0]) =>
        option.categoryName || ''

    const getUsersOptionLabel = (option: (typeof usersList)[0]) =>
        option.userName || ''

    const getCategorySubOptionLabel = (option: (typeof subCategory)[0]) =>
        option.subCategoryName || ''

    const handleMapping = (value: Mapping) => {
        if (!selectedUser?.employeeID) {
            showErrorToast('Please Select User')
            return
        }

        const data = {
            userId: selectedUser?.employeeID,
            catSubCategoryMappingId: value.mappingId,
            rank: value.ratings,
            isActive: value.status,
            insertedUserId: user?.employeeID,
        }

        dispatch(addExpertiseMappingAction(data))
    }

    useEffect(() => {
        if (selectedOptions.subCategoryId) {
            handleFindMapping(selectedOptions)
        }
    }, [selectedOptions.subCategoryId])

    return (
        <div className="flex flex-col gap-4 pb-4">
            <div className="flex flex-col gap-4">
                <div className="flex flex-col gap-4">
                    <div className="flex flex-col gap-4">
                        <DropdownInputField
                            options={usersList}
                            getOptionLabel={getUsersOptionLabel}
                            onSelect={handleSelectUser}
                            label="Select User"
                            placeholder="Select value"
                            width="100%"
                        />
                    </div>
                    <div className="flex flex-col gap-4 md:flex-row">
                        <DropdownInputField
                            options={category}
                            getOptionLabel={getCategoryOptionLabel}
                            onSelect={handleSelectCategory}
                            label="Select Domain"
                            placeholder="Select value"
                            // width="48%"
                        />
                        {subCategory.length > 0 && (
                            <DropdownInputField
                                options={subCategory}
                                getOptionLabel={getCategorySubOptionLabel}
                                onSelect={handleSelectSubCategory}
                                label="Select sub Domain"
                                placeholder="Select value"
                                // width="48%"
                            />
                        )}
                    </div>
                    {/* <div className="flex justify-end">
                        <Button
                            onClick={() => handleFindMapping(selectedOptions)}
                            title="Fing Mappings"
                        />
                    </div> */}
                </div>
                {mapping.length > 0 && <hr className="bg-primary-color" />}
                <div className="flex flex-col gap-4 ">
                    {loading && (
                        <div className="h-60 flex justify-center items-center">
                            <Loader type="fit" />
                        </div>
                    )}
                    {mapping.map((item) => (
                        <RatingsAndStatus
                            data={item}
                            key={item.mappingId}
                            buttonTitle="Map"
                            onClick={handleMapping}
                        />
                    ))}
                </div>
            </div>
        </div>
    )
}

export default MapExpertiseActions
