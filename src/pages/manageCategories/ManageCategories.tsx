import { useState } from 'react'
import { Header, Loader } from '../../components'
import { AddNewCategory, DeleteCategory, EditCategory } from './components'
import { useAppSelector } from '../../store'

interface CategoryTabs {
    new: string
    edit: string
    delete: string
}

const ManageCategories = () => {
    const cateogryTabs: CategoryTabs = {
        new: 'New Category',
        edit: 'Edit Category',
        delete: 'Delete Category',
    }

    const loading = useAppSelector((state) => state.category.loading)

    const [currentCategoryTab, setCurrentCategoryTab] = useState<string>(
        cateogryTabs.new
    )

    const handleCategoryTabs = (value: string) => {
        setCurrentCategoryTab(value)
    }

    return (
        <div>
            {loading && <Loader />}
            <Header title="Manage Categories" />
            <div className="bg-white-color rounded-lg border border-secondary-color">
                <div className="flex flex-col">
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
                </div>
            </div>
        </div>
    )
}

export default ManageCategories
