import { useState, FC } from 'react'
import { Button, Ratings, Switchtabs } from '../../../components'
import { CategorySubCategoryMapping } from '../../../constants/types'
import { Mapping } from './MapExpertiseAction'

interface StatusTabs {
    left: string
    right: string
}

interface RatingsAndStatusProps {
    buttonTitle: string
    data: CategorySubCategoryMapping
    forDelete?: boolean
    onClick: (value: Mapping) => void
}

const RatingsAndStatus: FC<RatingsAndStatusProps> = ({
    buttonTitle,
    forDelete,
    onClick,
    data,
}) => {
    const statusTabs: StatusTabs = {
        left: 'Active',
        right: 'In Active',
    }

    const [status, setStatus] = useState<boolean>(false)
    const [ratings, setRatings] = useState<number>(0)

    const handleMapping = (value: Mapping) => {
        onClick({
            status: value.status,
            ratings: value.ratings,
            mappingId: value.mappingId,
        })
    }

    return (
        <div className="bg-white rounded-lg border border-light-gray-color">
            <div className="flex items-center justify-between gap-4 border-b border-light-gray-color p-4">
                <h4 className="text-base text-black-color font-semibold">
                    {data.description}
                </h4>
                <p className="text-sm text-body-text-color">
                    👋 {data.subCategoryName}
                </p>
            </div>
            <div className="p-4">
                <div
                    className={`flex flex-col sm:md:flex-row md:items-center gap-4 md:flex-row ${forDelete ? 'justify-end' : 'justify-between'}`}
                >
                    {!forDelete && (
                        <div className="flex gap-4 flex-col lg:flex-row">
                            <Switchtabs
                                label="Status"
                                setSelectedTab={(value) => setStatus(value)}
                                tabValues={statusTabs}
                                selectedTab={status}
                            />
                            <Ratings
                                label="Ratings"
                                rating={ratings}
                                setRating={(v) => setRatings(v)}
                            />
                        </div>
                    )}
                    <Button
                        onClick={() =>
                            handleMapping({
                                mappingId: data.mappingId || 0,
                                status: status,
                                ratings: ratings,
                            })
                        }
                        title={buttonTitle}
                        width={'20%'}
                    />
                </div>
            </div>
        </div>
    )
}

export default RatingsAndStatus
