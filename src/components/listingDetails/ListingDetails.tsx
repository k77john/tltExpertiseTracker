import {
    Category,
    CategorySubCategoryMapping,
    SubCategory,
} from '../../constants/types'
import { formatDateAndTime } from '../../utils/dateFromate'

interface ListingDetailsProps {
    detailsFor: 'Category' | 'SubCategory' | 'Mapping'
    data?: Category | SubCategory
    Mapping?: CategorySubCategoryMapping
}

const ListingDetails: React.FC<ListingDetailsProps> = ({
    data,
    detailsFor,
    Mapping,
}) => {
    return (
        <div className="flex flex-col  gap-4 w-full">
            <div className="flex flex-col items-cente  gap-1 w-full">
                <h3 className=" text-sm font-semibold ">Status</h3>
                {data?.isActive || Mapping?.isActive ? (
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
                        <h3 className=" text-sm font-semibold  ">Category</h3>
                        <p className="font-semibold text-base text-primary-color ">
                            {Mapping?.categoryName}
                        </p>
                    </div>

                    <div className="flex flex-col items-cente  gap-1 w-full">
                        <h3 className=" text-sm font-semibold ">
                            Sub Category
                        </h3>
                        <p className="font-semibold text-base text-primary-color ">
                            {Mapping?.subCategoryName}
                        </p>
                    </div>
                </>
            )}

            <div className="flex flex-col  items-cente  gap-1 w-full">
                <h3 className=" text-sm font-semibold ">
                    Inserted Date & Time
                </h3>
                <p className="font-normal text-sm text-gray-700 ">
                    {detailsFor === 'Mapping'
                        ? formatDateAndTime(Mapping?.insertedDate || '')
                        : formatDateAndTime(data?.insertedDate || '') || '-'}
                </p>
            </div>

            <div className="flex flex-col  items-cente  gap-1 w-full">
                <h3 className=" text-sm font-semibold ">Updated Date & Time</h3>
                <p className="font-normal text-sm text-gray-700 ">
                    {detailsFor === 'Mapping'
                        ? formatDateAndTime(Mapping?.updatedDate || '')
                        : formatDateAndTime(data?.updatedDate || '') || '-'}
                </p>
            </div>

            <div className="flex flex-col  items-cente  gap-1 w-full">
                <h3 className=" text-sm font-semibold ">Inserted User</h3>
                <p className="font-normal text-sm text-gray-700 ">
                    {data?.insertedUser || Mapping?.insertedUser || '-'}
                </p>
            </div>
            <div className="flex flex-col  items-cente  gap-1 w-full">
                <h3 className=" text-sm font-semibold ">Updated User</h3>
                <p className="font-normal text-sm text-gray-700 ">
                    {data?.updatedUser || Mapping?.updatedUser || '-'}
                </p>
            </div>
            <div className="flex flex-col  items-cente  gap-1 w-full">
                <h3 className=" text-sm font-semibold ">Description</h3>
                <p className="font-normal text-sm text-gray-700 ">
                    {data?.description || Mapping?.description}
                </p>
            </div>
        </div>
    )
}

export default ListingDetails
