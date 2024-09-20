import { useEffect, useState } from 'react'
import { DeleteIcon, EditWhiteIcon, EyeWhiteIcon } from '../../assets/icons'
import { CustomModal, Header, ListingDetails, Loader } from '../../components'
import { CategorySubCategoryMapping as CategorySubCategoryMappingTypes } from '../../constants/types'
import { useAppDispatch, useAppSelector } from '../../store'
import { getCategoriesSubCategoriesAction } from '../../store/reducersAndActions/categoriesSubCategoriesMapping/categoriesSubCategories.actions'
import { CategorySubCategoryMappingActions } from './components'
import { getCategorySubCategoryMappingsByID } from '../../services/categorySubCategoryMapping.services'
import ErrorBoundary from '../../utils/ErrorBoundary'

const CategorySubCategoryMapping = () => {
    const { loading, categoriesSubCategories } = useAppSelector(
        (state) => state.categoriesSubCategories
    )
    const [loader, setLoader] = useState(false)

    const dispatch = useAppDispatch()

    useEffect(() => {
        dispatch(getCategoriesSubCategoriesAction())
    }, [])

    const [selectedMapping, setselectedMapping] =
        useState<CategorySubCategoryMappingTypes>()

    const [addMappingModalOpen, setaddMappingModalOpen] =
        useState<boolean>(false)

    const [editMappingModalOpen, setEditMappingModalOpen] =
        useState<boolean>(false)
    const editHandler = (item: CategorySubCategoryMappingTypes) => {
        setEditMappingModalOpen(true)
        setselectedMapping(item)
    }

    const [deleteMappingModalOpen, setDeleteMappingModalOpen] =
        useState<boolean>(false)
    const deleteHandler = (item: CategorySubCategoryMappingTypes) => {
        setDeleteMappingModalOpen(true)
        setselectedMapping(item)
    }

    const [viewDetailsModalOpen, setViewDetailsModalOpen] =
        useState<boolean>(false)
    const viewDetailsHandler = async (id: number | undefined) => {
        setLoader(true)
        const resp = await getCategorySubCategoryMappingsByID(id)
        if (resp) {
            setLoader(false)
            if (resp.isSuccessful) {
                setViewDetailsModalOpen(true)
                setselectedMapping(resp.data)
            }
        }
    }

    const [filteredOptions, setFilteredOptions] = useState<
        CategorySubCategoryMappingTypes[]
    >([])

    const getCategoryMapingLabel = (
        option: (typeof categoriesSubCategories)[0]
    ) => option.categoryName || option.subCategoryName || ''

    useEffect(() => {
        setFilteredOptions(categoriesSubCategories)
    }, [categoriesSubCategories])

    return (
        <div className="h-full">
            {loading && <Loader />}
            {loader && <Loader />}

            <Header
                title="Manage Mapping"
                buttonTitle="+ Add Mapping"
                onClick={() => setaddMappingModalOpen(true)}
                options={categoriesSubCategories}
                getOptionLabel={getCategoryMapingLabel}
                setFilteredOptions={setFilteredOptions}
                getOptionDescription={(option) => option.description || ''}
                getOptionsOnOther={(option) => option.subCategoryName || ''}
                searchBar
            />
            <ErrorBoundary>
                <div
                    style={{ height: 'calc(100% - 128px)' }}
                    className="bg-white-color gap-4 flex flex-col"
                >
                    <div className="overflow-x-auto">
                        <table className="w-full text-sm text-left  text-gray-500 ">
                            <thead className="text-xs text-gray-700 uppercase bg-gray-50 sticky top-0 ">
                                <tr>
                                    <th scope="col" className="px-6 py-3">
                                        Category
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        Sub Category
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        Status
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        Mapping
                                    </th>
                                    <th
                                        scope="col"
                                        className="px-6 py-3 text-end"
                                    >
                                        Action
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredOptions.map((item) => (
                                    <tr
                                        key={item.mappingId}
                                        className="bg-white border-b "
                                    >
                                        <th
                                            scope="row"
                                            className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap "
                                        >
                                            {item.categoryName}
                                        </th>
                                        <th
                                            scope="row"
                                            className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap "
                                        >
                                            {item.subCategoryName}
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
                                            <p className="line-clamp-2">
                                                {item.description}
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
                                                        item.mappingId
                                                    )
                                                }
                                                className="h-8 w-8 flex items-center justify-center p-2 rounded-full bg-gray-700 cursor-pointer"
                                            >
                                                <img
                                                    className="h-4/5 w-4/5"
                                                    src={EyeWhiteIcon}
                                                />
                                            </div>
                                            <div
                                                onClick={() =>
                                                    deleteHandler(item)
                                                }
                                                className="h-8 w-8 flex items-center justify-center p-2 rounded-full bg-red-200 cursor-pointer"
                                            >
                                                <img
                                                    className="h-4/5 w-4/5"
                                                    src={DeleteIcon}
                                                />
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
                {addMappingModalOpen && (
                    <CustomModal
                        title="Add Mapping"
                        open={addMappingModalOpen}
                        onClose={() => setaddMappingModalOpen(false)}
                        children={
                            <CategorySubCategoryMappingActions
                                action="Add"
                                setModal={setaddMappingModalOpen}
                            />
                        }
                    />
                )}

                {editMappingModalOpen && (
                    <CustomModal
                        title="Edit Mapping"
                        open={editMappingModalOpen}
                        onClose={() => setEditMappingModalOpen(false)}
                        children={
                            <CategorySubCategoryMappingActions
                                action="Edit"
                                data={selectedMapping}
                                setModal={setEditMappingModalOpen}
                            />
                        }
                    />
                )}

                {deleteMappingModalOpen && (
                    <CustomModal
                        title="Delete Mapping"
                        open={deleteMappingModalOpen}
                        onClose={() => setDeleteMappingModalOpen(false)}
                        children={
                            <CategorySubCategoryMappingActions
                                action="Delete"
                                data={selectedMapping}
                                setModal={setDeleteMappingModalOpen}
                            />
                        }
                    />
                )}
                {viewDetailsModalOpen && (
                    <CustomModal
                        title={selectedMapping?.description}
                        open={viewDetailsModalOpen}
                        onClose={() => setViewDetailsModalOpen(false)}
                        children={
                            <ListingDetails
                                Mapping={selectedMapping || {}}
                                detailsFor="Mapping"
                            />
                        }
                    />
                )}
            </ErrorBoundary>
        </div>
    )
}

export default CategorySubCategoryMapping
