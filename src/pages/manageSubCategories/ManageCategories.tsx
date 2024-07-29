import { useState } from 'react'
import {
    Button,
    DropdownInputField,
    Header,
    InputField,
} from '../../components'

interface CategoryTabs {
    new: string
    edit: string
    delete: string
}

const ManageSubCategories = () => {
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

    return (
        <div>
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
                            <div className="flex flex-col gap-4">
                                <div className="flex flex-col gap-4 md:flex-row">
                                    <InputField
                                        label="Category"
                                        placeholder="Enter value"
                                        width="65%"
                                    />
                                </div>
                                <div className="flex flex-col gap-4">
                                    <InputField
                                        label="Description"
                                        placeholder="Enter value"
                                        width="65%"
                                        type="textarea"
                                        height="10rem"
                                    />
                                </div>
                                <div className="flex justify-end">
                                    <Button
                                        width="15%"
                                        title="Submit"
                                        onClick={() => {}}
                                    />
                                </div>
                            </div>
                        )}
                        {currentSubCategoryTab === subCateogryTabs.edit && (
                            <div className="flex flex-col gap-4">
                                <div className="flex flex-col gap-4 md:flex-row">
                                    <DropdownInputField
                                        options={[
                                            'Option 1',
                                            'Option 2',
                                            'Option 3',
                                            'Option 4',
                                        ]}
                                        label="Category"
                                        placeholder="Select value"
                                        width="65%"
                                    />
                                </div>
                                <div className="flex flex-col gap-4">
                                    <InputField
                                        label="Description"
                                        placeholder="Enter value"
                                        width="65%"
                                        type="textarea"
                                        height="10rem"
                                    />
                                </div>
                                <div className="flex justify-end">
                                    <Button
                                        width="15%"
                                        title="Update"
                                        onClick={() => {}}
                                    />
                                </div>
                            </div>
                        )}
                        {currentSubCategoryTab === subCateogryTabs.delete && (
                            <div className="flex flex-col gap-4">
                                <div className="flex flex-col gap-4 md:flex-row">
                                    <DropdownInputField
                                        options={[
                                            'Option 1',
                                            'Option 2',
                                            'Option 3',
                                            'Option 4',
                                        ]}
                                        label="Category"
                                        placeholder="Select value"
                                        width="65%"
                                    />
                                </div>
                                <div className="flex justify-end">
                                    <Button
                                        width="15%"
                                        title="Delete"
                                        onClick={() => {}}
                                    />
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ManageSubCategories
