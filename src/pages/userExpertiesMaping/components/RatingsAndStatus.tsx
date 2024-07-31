import { useState, FC } from 'react'
import { Button, Ratings, Switchtabs } from '../../../components'

interface StatusTabs {
    left: string
    right: string
}

interface RatingsAndStatusProps {
    buttonTitle: string
    forDelete?: boolean
}

const RatingsAndStatus: FC<RatingsAndStatusProps> = ({
    buttonTitle,
    forDelete,
}) => {
    const statusTabs: StatusTabs = {
        left: 'Active',
        right: 'In Active',
    }

    const [status, setStatus] = useState<string>(statusTabs.left)

    return (
        <div className="bg-white rounded-lg border border-light-gray-color">
            <div className="flex items-center justify-between gap-4 border-b border-light-gray-color p-4">
                <h4 className="text-base text-black-color font-semibold">
                    Flufy
                </h4>
                <p className="text-sm text-body-text-color">
                    👋 Mapped Sub Category
                </p>
            </div>
            <div className="p-4">
                <div
                    className={`flex flex-col gap-4 md:flex-row ${forDelete ? 'justify-end' : 'justify-between'}  items-center`}
                >
                    {!forDelete && (
                        <div className="flex gap-4 flex-col lg:flex-row">
                            <Switchtabs
                                label="Status"
                                onClick={(value) => setStatus(value)}
                                tabValues={statusTabs}
                                value={status}
                            />
                            <Ratings label="Ratings" setRating={() => {}} />
                        </div>
                    )}
                    <Button
                        onClick={() => {}}
                        title={buttonTitle}
                        width={'20%'}
                    />
                </div>
            </div>
        </div>
    )
}

export default RatingsAndStatus
