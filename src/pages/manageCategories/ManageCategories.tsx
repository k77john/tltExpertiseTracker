import { useState } from 'react'
import {
    Button,
    DropdownInputField,
    Header,
    InputField,
    Switchtabs,
} from '../../components'

interface CategoryTabs {
    new: string
    edit: string
    delete: string
}

interface StatusTabs {
    left: string
    right: string
}

const ManageSubCategories = () => {
    const cateogryTabs: CategoryTabs = {
        new: 'New Category',
        edit: 'Edit Category',
        delete: 'Delete Category',
    }

    const statusTabs: StatusTabs = {
        left: 'Active',
        right: 'In Active',
    }

    const [currentCategoryTab, setCurrentCategoryTab] = useState<string>(
        cateogryTabs.new
    )
    const [status, setStatus] = useState<string>(statusTabs.left)

    const handleCategoryTabs = (value: string) => {
        setCurrentCategoryTab(value)
    }

    return (
        <div>
            <Header title="Manage Sub Categories" />
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
                            <div className="flex flex-col gap-4">
                                <div className="flex flex-col gap-4 md:flex-row">
                                    <InputField
                                        label="Category"
                                        placeholder="Enter value"
                                        width="65%"
                                    />
                                    <Switchtabs
                                        label="Status"
                                        onClick={(value) => setStatus(value)}
                                        tabValues={statusTabs}
                                        value={status}
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
                        {currentCategoryTab === cateogryTabs.edit && (
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
                                        height="10%"
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
                        {currentCategoryTab === cateogryTabs.delete && (
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
