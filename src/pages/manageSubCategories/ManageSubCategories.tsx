import { useEffect, useState } from 'react'
import { Header, Loader } from '../../components'
import { useAppDispatch, useAppSelector } from '../../store'
import { getSubCategoriesAction } from '../../store/reducersAndActions/subCategory/subCategory.actions'
import {
    AddSubCategory,
    DeleteSubCategory,
    EditSubCategory,
} from './components'

interface CategoryTabs {
    new: string
    edit: string
    delete: string
}

const ManageSubCategories = () => {
    const dispatch = useAppDispatch()
    const loading = useAppSelector((state) => state.subCategory.loading)

    const subCateogryTabs: CategoryTabs = {
        new: 'New Sub Category',
        edit: 'Edit Sub Category',
        delete: 'Delete Sub Category',
    }

    const [currentSubCategoryTab, setSubCurrentCategoryTab] = useState<string>(
        subCateogryTabs.new
    )

    const handleSubCategoryTabs = (value: string) => {
        setSubCurrentCategoryTab(value)
    }

    const getSubCategories = async () => {
        dispatch(getSubCategoriesAction())
    }

    useEffect(() => {
        getSubCategories()
    }, [])

    return (
        <div>
            {loading && <Loader />}
            <Header title="Manage Sub Categories" />
            <div className="bg-white-color rounded-lg border border-light-gray-color">
                <div className="flex flex-col">
                    <div className="flex items-center gap-4 border-b border-light-gray-color p-4">
                        {Object.values(subCateogryTabs).map((tab) => (
                            <button
                                key={tab}
                                className={`py-2 px-4 text-xs font-medium rounded-md ${
                                    currentSubCategoryTab === tab
                                        ? 'bg-primary-color text-white-color'
                                        : 'bg-white-color text-body-text-color'
                                }`}
                                onClick={() => handleSubCategoryTabs(tab)}
                            >
                                {tab}
                            </button>
                        ))}
                    </div>
                    <div className="flex flex-col gap-4 p-4">
                        <h4 className="text-base text-black-color font-semibold">
                            {currentSubCategoryTab}
                        </h4>
                        {currentSubCategoryTab === subCateogryTabs.new && (
                            <AddSubCategory />
                        )}
                        {currentSubCategoryTab === subCateogryTabs.edit && (
                            <EditSubCategory />
                        )}
                        {currentSubCategoryTab === subCateogryTabs.delete && (
                            <DeleteSubCategory />
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ManageSubCategories
