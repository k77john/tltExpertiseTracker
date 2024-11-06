import { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { DeleteIcon, EditWhiteIcon, EyeWhiteIcon } from '../../assets/icons'
import {
    Button,
    CustomModal,
    Header,
    ListingDetails,
    Loader,
} from '../../components'
import { ITEMS_LIMIT } from '../../constants/constents'
import { PaginationTypes, SubCategory } from '../../constants/types'
import { getSubCategoryByID } from '../../services/subCategory.services'
import { useAppDispatch, useAppSelector } from '../../store'
import { getSubCategoriesAction } from '../../store/reducersAndActions/subCategory/subCategory.actions'
import ErrorBoundary from '../../utils/ErrorBoundary'
import { SubCategoryActions } from './components'

const ManageSubCategories = () => {
    const [loader, setLoader] = useState(false)
    const { subCategory, loading } = useAppSelector(
        (state) => state.subCategory
    )

    const [searchParams, setSearchParams] = useSearchParams()
    const [searchInput, setSearchInput] = useState<string>('')

    const page = parseInt(searchParams.get('page') || '1')

    const dispatch = useAppDispatch()

    const getSubCategoriesHandler = async (value: PaginationTypes) => {
        dispatch(
            getSubCategoriesAction({
                limit: value.limit,
                page: value.page,
                search: value.search,
            })
        )
    }

    useEffect(() => {
        if (page) {
            getSubCategoriesHandler({
                limit: ITEMS_LIMIT.toString(),
                page: page.toString(),
                search: searchInput,
            })
        } else {
            getSubCategoriesHandler({
                limit: ITEMS_LIMIT.toString(),
                page: '1',
                search: searchInput,
            })
        }
    }, [page, searchInput])

    const [selectedSubCategory, setselectedSubCategory] =
        useState<SubCategory>()

    const [addSubCategoryModalOpen, setaddSubCategoryModalOpen] =
        useState<boolean>(false)

    const [editSubCategoryModalOpen, setEditSubCategoryModalOpen] =
        useState<boolean>(false)
    const editHandler = (item: SubCategory) => {
        setEditSubCategoryModalOpen(true)
        setselectedSubCategory(item)
    }

    const [deleteSubCategoryModalOpen, setDeleteSubCategoryModalOpen] =
        useState<boolean>(false)
    const deleteHandler = (item: SubCategory) => {
        setDeleteSubCategoryModalOpen(true)
        setselectedSubCategory(item)
    }

    const [viewDetailsModalOpen, setViewDetailsModalOpen] =
        useState<boolean>(false)
    const viewDetailsHandler = async (id: number) => {
        setLoader(true)
        const resp = await getSubCategoryByID(id)
        if (resp) {
            setLoader(false)
            if (resp.isSuccessful) {
                setViewDetailsModalOpen(true)
                setselectedSubCategory(resp.data)
            }
        }
    }

    const [filteredOptions, setFilteredOptions] = useState<SubCategory[]>([])

    useEffect(() => {
        setFilteredOptions(subCategory)
    }, [subCategory])

    return (
        <div className="h-full">
            {loader && <Loader />}
            {loading && <Loader />}
            <Header
                title="Manage Sub Domain"
                onClick={() => setaddSubCategoryModalOpen(true)}
                buttonTitle="+ Add Sub Domain"
                searchBar
                setSearchInput={setSearchInput}
                apiSearch
            />
            <ErrorBoundary>
                <div
                    style={{ height: 'calc(100% - 128px)' }}
                    className="bg-white-colo gap-4 flex flex-col"
                >
                    {subCategory.length === 0 && !loader && (
                        <div className="h-[70vh] w-full flex items-center justify-center">
                            <h1 className="text-lg">No SubCategories</h1>
                        </div>
                    )}
                    <div className="overflow-x-auto">
                        <table className="w-full text-sm text-left  text-gray-500 ">
                            {subCategory.length > 0 && !loader && (
                                <thead className="text-xs text-gray-700 uppercase bg-gray-50 sticky top-0">
                                    <tr>
                                        <th scope="col" className="px-6 py-3">
                                            Sub Domain name
                                        </th>
                                        <th scope="col" className="px-6 py-3">
                                            Status
                                        </th>
                                        <th scope="col" className="px-6 py-3">
                                            Description
                                        </th>

                                        <th
                                            scope="col"
                                            className="px-6 py-3 text-end"
                                        >
                                            Action
                                        </th>
                                    </tr>
                                </thead>
                            )}

                            <tbody>
                                {filteredOptions.map((item) => (
                                    <tr
                                        key={item.subCategoryID}
                                        className="bg-white border-b "
                                    >
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
                                                        item.subCategoryID || 0
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
                    <div className="flex justify-end gap-4 px-4 pb-4">
                        <Button
                            state={page === 1 ? 'disabled' : 'primary'}
                            onClick={() =>
                                setSearchParams({ page: (page - 1).toString() })
                            }
                            title="Prev"
                        />
                        <Button
                            state={
                                subCategory.length >= ITEMS_LIMIT
                                    ? 'primary'
                                    : 'disabled'
                            }
                            onClick={() =>
                                setSearchParams({ page: (page + 1).toString() })
                            }
                            title="Next"
                        />
                    </div>
                </div>

                {addSubCategoryModalOpen && (
                    <CustomModal
                        title="Add Sub Domain"
                        open={addSubCategoryModalOpen}
                        onClose={() => setaddSubCategoryModalOpen(false)}
                        children={
                            <SubCategoryActions
                                action="Add"
                                setModal={setaddSubCategoryModalOpen}
                            />
                        }
                    />
                )}

                {editSubCategoryModalOpen && (
                    <CustomModal
                        title="Edit Sub Category"
                        open={editSubCategoryModalOpen}
                        onClose={() => setEditSubCategoryModalOpen(false)}
                        children={
                            <SubCategoryActions
                                action="Edit"
                                data={selectedSubCategory}
                                setModal={setEditSubCategoryModalOpen}
                            />
                        }
                    />
                )}

                {deleteSubCategoryModalOpen && (
                    <CustomModal
                        title="Delete Sub Domain"
                        open={deleteSubCategoryModalOpen}
                        onClose={() => setDeleteSubCategoryModalOpen(false)}
                        children={
                            <SubCategoryActions
                                action="Delete"
                                data={selectedSubCategory}
                                setModal={setDeleteSubCategoryModalOpen}
                            />
                        }
                    />
                )}

                {viewDetailsModalOpen && (
                    <CustomModal
                        title={selectedSubCategory?.subCategoryName}
                        open={viewDetailsModalOpen}
                        onClose={() => setViewDetailsModalOpen(false)}
                        children={
                            <ListingDetails
                                data={selectedSubCategory || {}}
                                detailsFor="SubCategory"
                            />
                        }
                    />
                )}
            </ErrorBoundary>
        </div>
    )
}

export default ManageSubCategories
