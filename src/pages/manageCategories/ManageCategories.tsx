import { CustomModal, Header, Loader } from '../../components'
// import { AddNewCategory, DeleteCategory, EditCategory } from './components'
import { DeleteIcon, EditWhiteIcon } from '../../assets/icons'
import { useAppSelector } from '../../store'
import { useState } from 'react'
import { AddNewCategory, DeleteCategory, EditCategory } from './components'
import { Category } from '../../constants/types'

const ManageCategories = () => {
    const { loading, category } = useAppSelector((state) => state.category)
    const [addCategoryModalOpen, setaddCategoryModalOpen] =
        useState<boolean>(false)

    const [selectedCategory, setselectedCategory] = useState<Category>()

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

    return (
        <div>
            {loading && <Loader />}
            <Header
                title="Manage Categories"
                buttonTitle={'+ Add Category'}
                onClick={() => setaddCategoryModalOpen(true)}
            />
            <div className="bg-white-color gap-4 flex flex-col">
                {/* <div className="flex flex-col">
                    <div className="flex items-center gap-4 border-b border-secondary-color p-4">
                        {Object.values(cateogryTabs).map((tab) => (
                            <button
                                key={tab}
                                className={`py-2 px-4 text-xs font-medium rounded-md ${
                                    currentCategoryTab === tab
                                        ? 'bg-primary-color text-white'
                                        : 'bg-white-color text-body-text-color'
                                }`}
                                onClick={() => handleCategoryTabs(tab)}
                            >
                                {tab}
                            </button>
                        ))}
                    </div>
                    <div className="flex flex-col gap-4 p-4">
                        <h4 className="text-base text-black-color font-semibold">
                            {currentCategoryTab}
                        </h4>
                        {currentCategoryTab === cateogryTabs.new && (
                            <AddNewCategory />
                        )}
                        {currentCategoryTab === cateogryTabs.edit && (
                            <EditCategory />
                        )}
                        {currentCategoryTab === cateogryTabs.delete && (
                            <DeleteCategory />
                        )}
                    </div>
                </div> */}
                {/* {category.map((item) => (
                    <div className="w-full p-4 bg-gray-100 rounded-md flex justify-between items-center">
                        <h3 className="font-semibold text-md">
                            {item.categoryName}
                        </h3>
                        <div className="flex justify-between items-center gap-4">
                            <div className="h-10 w-10 flex items-center justify-center p-3 rounded-full bg-primary-color cursor-pointer">
                                <img
                                    className="h-full w-full"
                                    src={EditWhiteIcon}
                                />
                            </div>
                            <div className="h-10 w-10 flex items-center justify-center p-3 rounded-full bg-red-200 cursor-pointer">
                                <img
                                    className="h-full w-full"
                                    src={DeleteIcon}
                                />
                            </div>
                        </div>
                    </div>
                ))} */}
                <div className="overflow-x-auto">
                    <table className="w-full text-sm text-left  text-gray-500 ">
                        <thead className="text-xs text-gray-700 uppercase bg-gray-50 ">
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

                                <th scope="col" className="px-6 py-3">
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
                                        {item.description}
                                    </td>
                                    <td className="px-6 py-4 flex gap-4">
                                        <div
                                            onClick={() => editHandler(item)}
                                            className="h-8 w-8 flex items-center justify-center p-2 rounded-full bg-primary-color cursor-pointer"
                                        >
                                            <img
                                                className="h-4/5 w-4/5"
                                                src={EditWhiteIcon}
                                            />
                                        </div>
                                        <div
                                            onClick={() => deleteHandler(item)}
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
            <CustomModal
                title="Add Category"
                open={addCategoryModalOpen}
                onClose={() => setaddCategoryModalOpen(false)}
                children={<AddNewCategory setModal={setaddCategoryModalOpen} />}
            />

            <CustomModal
                title="Edit Category"
                open={editCategoryModalOpen}
                onClose={() => setEditCategoryModalOpen(false)}
                children={
                    <EditCategory
                        setModal={setEditCategoryModalOpen}
                        data={selectedCategory || {}}
                    />
                }
            />

            <CustomModal
                title="Delete Category"
                open={deleteCategoryModalOpen}
                onClose={() => setDeleteCategoryModalOpen(false)}
                children={
                    <DeleteCategory
                        setModal={setDeleteCategoryModalOpen}
                        data={selectedCategory || {}}
                    />
                }
            />
        </div>
    )
}

export default ManageCategories
