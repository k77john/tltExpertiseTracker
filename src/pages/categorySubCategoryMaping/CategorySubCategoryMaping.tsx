import { useState } from 'react'
import { Header, Loader } from '../../components'
import { useAppSelector } from '../../store'
import {
    AddCategoriesSubCategories,
    DeleteCategoriesSubCategories,
    EditCategoriesSubCategories,
} from './components'

interface CategoryTabs {
    new: string
    edit: string
    delete: string
}

const CategorySubCategoryMaping = () => {
    const CateogrySubCategoryMapingTabs: CategoryTabs = {
        new: 'New Category Sub Category Maping',
        edit: 'Edit Category Sub Category Maping',
        delete: 'Delete Category Sub Category Maping',
    }

    const [currentTab, setCurrentTab] = useState<string>(
        CateogrySubCategoryMapingTabs.new
    )

    const loading = useAppSelector(
        (state) => state.categoriesSubCategories.loading
    )

    const handleTabs = (value: string) => {
        setCurrentTab(value)
    }

    return (
        <div>
            {loading && <Loader />}
            <Header title="Manage Sub Categories" />
            <div className="bg-white-color rounded-lg border border-light-gray-color">
                <div className="flex flex-col">
                    <div className="flex items-center gap-4 border-b border-light-gray-color p-4">
                        {Object.values(CateogrySubCategoryMapingTabs).map(
                            (tab) => (
                                <button
                                    key={tab}
                                    className={`py-2 px-4 text-xs font-medium rounded-md ${
                                        currentTab === tab
                                            ? 'bg-primary-color text-white-color'
                                            : 'bg-white-color text-body-text-color'
                                    }`}
                                    onClick={() => handleTabs(tab)}
                                >
                                    {tab}
                                </button>
                            )
                        )}
                    </div>
                    <div className="flex flex-col gap-4 p-4">
                        <h4 className="text-base text-black-color font-semibold">
                            {currentTab}
                        </h4>
                        {currentTab === CateogrySubCategoryMapingTabs.new && (
                            <AddCategoriesSubCategories />
                        )}
                        {currentTab === CateogrySubCategoryMapingTabs.edit && (
                            <EditCategoriesSubCategories />
                        )}
                        {currentTab ===
                            CateogrySubCategoryMapingTabs.delete && (
                            <DeleteCategoriesSubCategories />
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CategorySubCategoryMaping
