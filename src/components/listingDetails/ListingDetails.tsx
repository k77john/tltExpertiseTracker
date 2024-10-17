import {
    Category,
    CategorySubCategoryMapping,
    ExpertiseMapping,
    SubCategory,
} from '../../constants/types'
import { formatDateAndTime } from '../../utils/dateFromate'
import Ratings from '../ratings/Ratings'

interface ListingDetailsProps {
    detailsFor: 'Category' | 'SubCategory' | 'Mapping' | 'ExpertiseMapping'
    data?: Category | SubCategory
    Mapping?: CategorySubCategoryMapping
    expertiseMapping?: ExpertiseMapping
}

const ListingDetails: React.FC<ListingDetailsProps> = ({
    data,
    detailsFor = 'Category',
    Mapping,
    expertiseMapping,
}) => {
    return (
        <div className="flex flex-col gap-6 w-full pb-6">
            <div className="flex flex-col items-cente  gap-1 w-full">
                <h3 className=" text-sm font-semibold ">Status</h3>
                {data?.isActive ||
                Mapping?.isActive ||
                expertiseMapping?.isActive ? (
                    <p className="lg:px-2 md:px-2 px-1 py-1 text-white bg-primary-color rounded-md text-xs text-center w-fit">
                        Active
                    </p>
                ) : (
                    <p className=" lg:px-2 md:px-2 px-1 py-1 text-red-700 bg-red-200 rounded-md text-xs text-center w-fit">
                        Inactive
                    </p>
                )}
            </div>
            {detailsFor === 'Mapping' && (
                <>
                    <div className="flex flex-col items-cente  gap-1 w-full">
                        <h3 className=" text-sm font-semibold  ">Domain</h3>
                        <p className="font-semibold text-base text-primary-color ">
                            {Mapping?.categoryName || '-'}
                        </p>
                    </div>

                    <div className="flex flex-col items-cente  gap-1 w-full">
                        <h3 className=" text-sm font-semibold ">Sub Domain</h3>
                        <p className="font-semibold text-base text-primary-color ">
                            {Mapping?.subCategoryName || '-'}
                        </p>
                    </div>
                </>
            )}
            {Mapping?.description && (
                <div className="flex flex-col  items-cente  gap-1 w-full">
                    <h3 className=" text-sm font-semibold ">Mapping</h3>
                    <p className="font-semibold text-base text-primary-color">
                        {Mapping?.description}
                    </p>
                </div>
            )}
            <div className="flex flex-col  items-cente  gap-1 w-full">
                <h3 className=" text-sm font-semibold ">Inserted User</h3>
                <p className="font-normal text-sm text-gray-700 ">
                    {data?.insertedUser ||
                        Mapping?.insertedUser ||
                        expertiseMapping?.insertedUser ||
                        '-'}
                </p>
            </div>

            <div className="flex flex-col  items-cente  gap-1 w-full">
                <h3 className=" text-sm font-semibold ">
                    Inserted Date & Time
                </h3>
                <p className="font-normal text-sm text-gray-700 ">
                    {detailsFor === 'Mapping' &&
                        formatDateAndTime(Mapping?.insertedDate || '')}
                    {detailsFor === 'Category' &&
                        formatDateAndTime(data?.insertedDate || '')}
                    {detailsFor === 'SubCategory' &&
                        formatDateAndTime(data?.insertedDate || '')}
                    {detailsFor === 'ExpertiseMapping' &&
                        formatDateAndTime(expertiseMapping?.insertedDate || '')}
                </p>
            </div>

            <div className="flex flex-col  items-cente  gap-1 w-full">
                <h3 className=" text-sm font-semibold ">Updated User</h3>
                <p className="font-normal text-sm text-gray-700 ">
                    {data?.updatedUser ||
                        Mapping?.updatedUser ||
                        expertiseMapping?.updatedDate ||
                        '-'}
                </p>
            </div>

            <div className="flex flex-col  items-cente  gap-1 w-full">
                <h3 className=" text-sm font-semibold ">Updated Date & Time</h3>
                <p className="font-normal text-sm text-gray-700 ">
                    {detailsFor === 'Mapping' &&
                        formatDateAndTime(Mapping?.updatedDate || '')}
                    {detailsFor === 'Category' &&
                        formatDateAndTime(data?.updatedDate || '')}
                    {detailsFor === 'SubCategory' &&
                        formatDateAndTime(data?.updatedDate || '')}
                    {detailsFor === 'ExpertiseMapping' &&
                        formatDateAndTime(expertiseMapping?.updatedDate || '')}
                </p>
            </div>

            {data?.description && (
                <div className="flex flex-col  items-cente  gap-1 w-full">
                    <h3 className=" text-sm font-semibold ">Description</h3>
                    <p className="font-normal text-sm text-gray-700 ">
                        {data?.description}
                    </p>
                </div>
            )}

            {expertiseMapping && (
                <div className="flex flex-col  items-cente  gap-1 w-full">
                    <h3 className=" text-sm font-semibold ">Rank</h3>
                    <div className="flex gap-1 w-fit items-center">
                        <Ratings rating={expertiseMapping.rank} readOnly /> (
                        {expertiseMapping.rank})
                    </div>
                </div>
            )}
        </div>
    )
}

export default ListingDetails
