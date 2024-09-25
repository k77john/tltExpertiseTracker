import { useState } from 'react'
import {
    Button,
    DropdownInputField,
    Ratings,
    Switchtabs,
} from '../../../components'
import { statusTabs } from '../../../constants/constents'
import { ExpertiseMapping } from '../../../constants/types'
import { useAppDispatch, useAppSelector } from '../../../store'
import { updateExpertiseMappingAction } from '../../../store/reducersAndActions/expertiseMapping/expertiseMapping.actions'
import { showErrorToast } from '../../../utils/toast'

interface MapExpertiseActionsProps {
    setModal: (value: boolean) => void
    data?: ExpertiseMapping
    action: 'Add' | 'Edit' | 'Delete'
    onClose: () => void
}

export interface Mapping {
    ratings: number
    status: boolean
    mappingId: number
}

const EditExpertiseMapping: React.FC<MapExpertiseActionsProps> = ({
    data,
    onClose,
}) => {
    const { usersList, user } = useAppSelector((state) => state.auth)
    const dispatch = useAppDispatch()

    const [expertiseMapping, setExpertiseMapping] = useState<ExpertiseMapping>({
        rank: data?.rank,
        isActive: data?.isActive,
        expertiseMappingId: data?.expertiseMappingId,
        userId: data?.userId,
        catSubCategoryMappingId: data?.catSubCategoryMappingId,
        updatedUserID: user?.employeeID,
    })

    const getUsersOptionLabel = (option: (typeof usersList)[0]) =>
        option.userName || ''

    const updateHandler = (values: ExpertiseMapping) => {
        if (!values.userId) {
            showErrorToast('Please select user')
            return
        }

        dispatch(updateExpertiseMappingAction(values)).then(() => {
            onClose()
        })
    }

    return (
        <div className="flex flex-col gap-4 pb-4">
            <div className="flex flex-col gap-4">
                <DropdownInputField
                    options={usersList}
                    getOptionLabel={getUsersOptionLabel}
                    onSelect={(v) =>
                        setExpertiseMapping((prev) => ({
                            ...prev,
                            userId: v.employeeID,
                        }))
                    }
                    label="User"
                    placeholder="Select value"
                    width="100%"
                    selectedOption={usersList.find(
                        (item) => item.employeeID === expertiseMapping.userId
                    )}
                />
            </div>
            <div className="flex flex-col gap-4">
                <Switchtabs
                    label="Status"
                    setSelectedTab={(v) =>
                        setExpertiseMapping((prev) => ({
                            ...prev,
                            isActive: v,
                        }))
                    }
                    tabValues={statusTabs}
                    selectedTab={expertiseMapping.isActive || false}
                />
            </div>
            <div className="flex flex-col gap-4">
                <Ratings
                    label="Ratings"
                    rating={expertiseMapping.rank}
                    setRating={(v) =>
                        setExpertiseMapping((prev) => ({
                            ...prev,
                            rank: v,
                        }))
                    }
                />
            </div>
            <hr />
            <div className="flex justify-end">
                <Button
                    onClick={() => updateHandler(expertiseMapping)}
                    title="Update"
                />
            </div>
        </div>
    )
}

export default EditExpertiseMapping
