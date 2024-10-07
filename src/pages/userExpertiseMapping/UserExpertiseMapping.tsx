import { useEffect, useState } from 'react'
import { EditWhiteIcon, EyeWhiteIcon, StarIcon } from '../../assets/icons'
import { CustomModal, Header, ListingDetails, Loader } from '../../components'
import { ExpertiseMapping } from '../../constants/types'
import { useAppDispatch, useAppSelector } from '../../store'
import { getUsersListAction } from '../../store/reducersAndActions/authentication/auth.actions'
import { getCategoriesAction } from '../../store/reducersAndActions/category/category.actions'
import { getExpertiseMappingAction } from '../../store/reducersAndActions/expertiseMapping/expertiseMapping.actions'
import { getSubCategoriesAction } from '../../store/reducersAndActions/subCategory/subCategory.actions'
import ErrorBoundary from '../../utils/ErrorBoundary'
import { EditExpertiseMapping, MapExpertiseActions } from './components'
import { getExpertiseMappingDetails } from '../../services/expertiseMapping.services'

const UserExpertiseMapping = () => {
    const dispatch = useAppDispatch()
    const { expertiseMapping, loading } = useAppSelector(
        (state) => state.expertiseMapping
    )

    const [loader, setLoader] = useState(false)

    const [mapExpertiesModalOpen, setMapExpertiesModalOpen] =
        useState<boolean>(false)

    const [editCategoryModalOpen, setEditCategoryModalOpen] =
        useState<boolean>(false)

    const [selectedExpertiseMapping, setSelectedExpertiseMapping] =
        useState<ExpertiseMapping>()

    const mapExpertiesHandler = async () => {
        setLoader(true)
        await dispatch(getSubCategoriesAction())
        await dispatch(getCategoriesAction())
        await dispatch(getUsersListAction())
        setLoader(false)
        setMapExpertiesModalOpen(true)
    }

    const [viewDetailsModalOpen, setViewDetailsModalOpen] =
        useState<boolean>(false)

    const viewDetailsHandler = async (id: number) => {
        setLoader(true)
        const resp = await getExpertiseMappingDetails(id)
        if (resp.isSuccessful) {
            setSelectedExpertiseMapping(resp.data || {})
            setViewDetailsModalOpen(true)
            setLoader(false)
        } else {
            setLoader(false)
        }
    }

    const [filteredOptions, setFilteredOptions] = useState<ExpertiseMapping[]>(
        []
    )

    const editHandler = async (item: ExpertiseMapping) => {
        setLoader(true)
        await dispatch(getUsersListAction())
        setSelectedExpertiseMapping(item)
        setEditCategoryModalOpen(true)
        setLoader(false)
    }

    useEffect(() => {
        dispatch(getExpertiseMappingAction())
    }, [])

    useEffect(() => {
        setFilteredOptions(expertiseMapping)
    }, [expertiseMapping])

    const getExpertiesMappingOptionLabel = (
        option: (typeof expertiseMapping)[0]
    ) => option.employeeName || ''

    return (
        <div className="h-full">
            {loading && <Loader />}
            {loader && <Loader />}
            <Header
                title="Experties Mappings"
                buttonTitle={'+ Map Experties'}
                onClick={() => mapExpertiesHandler()}
                searchBar={true}
                options={expertiseMapping}
                getOptionLabel={getExpertiesMappingOptionLabel}
                setFilteredOptions={setFilteredOptions}
                getOptionDescription={(option) =>
                    option.catSubCategoryMappingDescription || ''
                }
            />
            <ErrorBoundary>
                <div
                    style={{ height: 'calc(100% - 128px)' }}
                    className="bg-white gap-4  flex flex-col"
                >
                    <div className="overflow-x-auto">
                        <table className="w-full text-sm text-left  text-gray-500 ">
                            <thead className="text-xs text-gray-700 uppercase bg-gray-50 sticky top-0 ">
                                <tr>
                                    <th scope="col" className="px-6 py-3">
                                        Employee name
                                    </th>

                                    <th scope="col" className="px-6 py-3">
                                        Rank
                                    </th>

                                    <th scope="col" className="px-6 py-3">
                                        Status
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        Description
                                    </th>

                                    <th
                                        scope="col"
                                        className="px-6 py-3 text-right"
                                    >
                                        Action
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredOptions.map((item) => (
                                    <tr
                                        key={item.expertiseMappingId}
                                        className="bg-white border-b "
                                    >
                                        <th
                                            scope="row"
                                            className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap "
                                        >
                                            {item.employeeName}
                                        </th>
                                        <th
                                            scope="row"
                                            className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap "
                                        >
                                            <div className="flex items-center gap-1 px-2 py-1 bg-gray-100 w-fit rounded-full">
                                                <p className="text-xs">
                                                    {item.rank}
                                                </p>
                                                <img
                                                    className="h-4 w-4"
                                                    src={StarIcon}
                                                />
                                            </div>
                                        </th>
                                        <td className="px-6 py-4">
                                            {item.isActive ? (
                                                <p className="lg:px-2 md:px-2 px-1 py-1 text-white bg-primary-color rounded-md text-xs text-center w-fit">
                                                    Active
                                                </p>
                                            ) : (
                                                <p className=" lg:px-2 md:px-2 px-1 py-1 text-red-700 bg-red-200 rounded-md text-xs text-center w-fit">
                                                    Inactive
                                                </p>
                                            )}
                                        </td>
                                        <td className="px-6 py-4 md:max-w-80 lg:max-w-80 text-xs">
                                            <p className="line-clamp-3">
                                                {
                                                    item.catSubCategoryMappingDescription
                                                }
                                            </p>
                                        </td>
                                        <td className="px-6 py-4 flex gap-4 justify-end">
                                            <div
                                                onClick={() =>
                                                    editHandler(item)
                                                }
                                                className="h-8 w-8 flex items-center justify-center p-2 rounded-full bg-primary-color cursor-pointer"
                                            >
                                                <img
                                                    className="h-4/5 w-4/5"
                                                    src={EditWhiteIcon}
                                                />
                                            </div>
                                            <div
                                                onClick={() =>
                                                    viewDetailsHandler(
                                                        item.expertiseMappingId ||
                                                            0
                                                    )
                                                }
                                                className="h-8 w-8 flex items-center justify-center p-2 rounded-full bg-gray-700 cursor-pointer"
                                            >
                                                <img
                                                    className="h-4/5 w-4/5"
                                                    src={EyeWhiteIcon}
                                                />
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

                {mapExpertiesModalOpen && (
                    <CustomModal
                        title="Map Expertise"
                        width="lg:w-[50%] md:w-[70%] sm:w-full"
                        open={mapExpertiesModalOpen}
                        onClose={() => setMapExpertiesModalOpen(false)}
                        children={
                            <MapExpertiseActions
                                action="Add"
                                setModal={setMapExpertiesModalOpen}
                            />
                        }
                    />
                )}

                {editCategoryModalOpen && (
                    <CustomModal
                        title={`Edit Mapping`}
                        open={editCategoryModalOpen}
                        onClose={() => setEditCategoryModalOpen(false)}
                        children={
                            <EditExpertiseMapping
                                action="Edit"
                                data={selectedExpertiseMapping}
                                setModal={setEditCategoryModalOpen}
                                onClose={() => setEditCategoryModalOpen(false)}
                            />
                        }
                    />
                )}

                {viewDetailsModalOpen && (
                    <CustomModal
                        title={'Details'}
                        open={viewDetailsModalOpen}
                        onClose={() => setViewDetailsModalOpen(false)}
                        children={
                            <ListingDetails
                                expertiseMapping={
                                    selectedExpertiseMapping || {}
                                }
                                detailsFor="ExpertiseMapping"
                            />
                        }
                    />
                )}
            </ErrorBoundary>
        </div>
    )
}

export default UserExpertiseMapping
