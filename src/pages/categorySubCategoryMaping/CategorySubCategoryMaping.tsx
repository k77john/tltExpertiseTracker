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

const CategorySubCategoryMaping = () => {
    const CateogrySubCategoryMapingTabs: CategoryTabs = {
        new: 'New Category Sub Category Maping',
        edit: 'Edit Category Sub Category Maping',
        delete: 'Delete Category Sub Category Maping',
    }

    const statusTabs: StatusTabs = {
        left: 'Active',
        right: 'In Active',
    }

    const [currentTab, setCurrentTab] = useState<string>(
        CateogrySubCategoryMapingTabs.new
    )

    const [status, setStatus] = useState<boolean>(false)

    const handleTabs = (value: string) => {
        setCurrentTab(value)
    }

    return (
        <div>
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
                            <div className="flex flex-col gap-4">
                                <div className="flex flex-col gap-4 md:flex-row">
                                    <DropdownInputField
                                        options={[]}
                                        getOptionLabel={() => 'Demo'}
                                        label="Select category"
                                        placeholder="Select value"
                                        width="65%"
                                    />
                                    <Switchtabs
                                        label="Status"
                                        setSelectedTab={(value) =>
                                            setStatus(value)
                                        }
                                        tabValues={statusTabs}
                                        selectedTab={status}
                                    />
                                </div>
                                <div className="flex flex-col gap-4">
                                    <DropdownInputField
                                        options={[]}
                                        getOptionLabel={() => 'Demo'}
                                        label="Select sub category"
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
                                        onChange={() => {}}
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
                        {currentTab === CateogrySubCategoryMapingTabs.edit && (
                            <div className="flex flex-col gap-4">
                                <div className="flex flex-col gap-4 md:flex-row">
                                    <DropdownInputField
                                        options={[]}
                                        getOptionLabel={() => 'Demo'}
                                        label="Select category"
                                        placeholder="Select value"
                                        width="65%"
                                    />
                                    <Switchtabs
                                        label="Status"
                                        setSelectedTab={(value) =>
                                            setStatus(value)
                                        }
                                        tabValues={statusTabs}
                                        selectedTab={status}
                                    />
                                </div>
                                <div className="flex flex-col gap-4">
                                    <DropdownInputField
                                        options={[]}
                                        getOptionLabel={() => 'Demo'}
                                        label="Select mapped sub category"
                                        placeholder="Select value"
                                        width="65%"
                                    />
                                </div>
                                <div className="flex flex-col gap-4">
                                    <DropdownInputField
                                        options={[]}
                                        getOptionLabel={() => 'Demo'}
                                        label="Change sub category"
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
                                        onChange={() => {}}
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
                        {currentTab ===
                            CateogrySubCategoryMapingTabs.delete && (
                            <div className="flex flex-col gap-4">
                                <div className="flex flex-col gap-4 md:flex-row">
                                    <DropdownInputField
                                        options={[]}
                                        getOptionLabel={() => 'Demo'}
                                        label="Select category"
                                        placeholder="Select value"
                                        width="65%"
                                    />
                                </div>
                                <div className="flex flex-col gap-4">
                                    <DropdownInputField
                                        options={[]}
                                        getOptionLabel={() => 'Demo'}
                                        label="Select mapped sub category"
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

export default CategorySubCategoryMaping
