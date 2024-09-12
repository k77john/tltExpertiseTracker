import { useEffect, useState } from 'react'
import { DeleteIcon, EditWhiteIcon, EyeWhiteIcon } from '../../assets/icons'
import { CustomModal, Header, ListingDetails, Loader } from '../../components'
import { Category } from '../../constants/types'
import { getCategoryByID } from '../../services/category.services'
import { useAppDispatch, useAppSelector } from '../../store'
import { getCategoriesAction } from '../../store/reducersAndActions/category/category.actions'
import { CategoryActions } from './components'
import ErrorBoundary from '../../utils/ErrorBoundary'

const ManageCategories = () => {
    const { loading, category } = useAppSelector((state) => state.category)
    const [loader, setLoader] = useState(false)

    const dispatch = useAppDispatch()

    useEffect(() => {
        dispatch(getCategoriesAction())
    }, [])

    const [selectedCategory, setselectedCategory] = useState<Category>()

    const [addCategoryModalOpen, setaddCategoryModalOpen] =
        useState<boolean>(false)

    const [editCategoryModalOpen, setEditCategoryModalOpen] =
        useState<boolean>(false)
    const editHandler = (item: Category) => {
        setEditCategoryModalOpen(true)
        setselectedCategory(item)
    }

    const [deleteCategoryModalOpen, setDeleteCategoryModalOpen] =
        useState<boolean>(false)
    const deleteHandler = (item: Category) => {
        setDeleteCategoryModalOpen(true)
        setselectedCategory(item)
    }

    const [viewDetailsModalOpen, setViewDetailsModalOpen] =
        useState<boolean>(false)
    const viewDetailsHandler = async (id: number) => {
        setLoader(true)
        const resp = await getCategoryByID(id)
        if (resp) {
            setLoader(false)
            if (resp.isSuccessful) {
                setViewDetailsModalOpen(true)
                setselectedCategory(resp.data)
            }
        }
    }

    return (
        <div className="h-full">
            {loading && <Loader />}
            {loader && <Loader />}
            <Header
                title="Manage Categories"
                buttonTitle={'+ Add Category'}
                onClick={() => setaddCategoryModalOpen(true)}
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
                                        Category name
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
                                {category.map((item) => (
                                    <tr
                                        key={item.categoryID}
                                        className="bg-white border-b "
                                    >
                                        <th
                                            scope="row"
                                            className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap "
                                        >
                                            {item.categoryName}
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
                                                        item.categoryID || 0
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

                {addCategoryModalOpen && (
                    <CustomModal
                        title="Add Category"
                        open={addCategoryModalOpen}
                        onClose={() => setaddCategoryModalOpen(false)}
                        children={
                            <CategoryActions
                                action="Add"
                                setModal={setaddCategoryModalOpen}
                            />
                        }
                    />
                )}

                {editCategoryModalOpen && (
                    <CustomModal
                        title="Edit Category"
                        open={editCategoryModalOpen}
                        onClose={() => setEditCategoryModalOpen(false)}
                        children={
                            <CategoryActions
                                action="Edit"
                                data={selectedCategory}
                                setModal={setEditCategoryModalOpen}
                            />
                        }
                    />
                )}

                {deleteCategoryModalOpen && (
                    <CustomModal
                        title="Delete Category"
                        open={deleteCategoryModalOpen}
                        onClose={() => setDeleteCategoryModalOpen(false)}
                        children={
                            <CategoryActions
                                action="Delete"
                                data={selectedCategory}
                                setModal={setDeleteCategoryModalOpen}
                            />
                        }
                    />
                )}

                {viewDetailsModalOpen && (
                    <CustomModal
                        title={selectedCategory?.categoryName}
                        open={viewDetailsModalOpen}
                        onClose={() => setViewDetailsModalOpen(false)}
                        children={
                            <ListingDetails
                                data={selectedCategory || {}}
                                detailsFor="Category"
                            />
                        }
                    />
                )}
            </ErrorBoundary>
        </div>
    )
}

export default ManageCategories
