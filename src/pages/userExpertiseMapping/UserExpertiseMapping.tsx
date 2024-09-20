import { useState } from 'react'
import { DropdownInputField, Header } from '../../components'
import { RatingsAndStatus } from './components'

interface Tabs {
    new: string
    edit: string
    delete: string
}

const UserExpertiseMapping = () => {
    const tabs: Tabs = {
        new: 'New User Expertise Mapping',
        edit: 'Edit User Expertise Mapping',
        delete: 'Delete User Expertise Mapping',
    }

    const [currentTab, setCurrentTab] = useState<string>(tabs.new)
    const [Mapping, setMapping] = useState({ status: false, ratings: 0 })

    console.log('====================================')
    console.log(Mapping)
    console.log('====================================')

    const handleMapping = (ratings: number, status: boolean) => {
        setMapping({
            status,
            ratings,
        })
    }

    const handleSubCategoryTabs = (value: string) => {
        setCurrentTab(value)
    }

    return (
        <div>
            <Header title="Manage Sub Categories" />
            <div className="px-4">
                <div className="bg-white-color  rounded-lg border border-light-gray-color">
                    <div className="flex flex-col">
                        <div className="flex items-center gap-4 border-b border-light-gray-color p-4">
                            {Object.values(tabs).map((tab) => (
                                <button
                                    key={tab}
                                    className={`py-2 px-4 text-xs font-medium rounded-md ${
                                        currentTab === tab
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
                                {currentTab}
                            </h4>
                            {currentTab === tabs.new && (
                                <div className="flex flex-col gap-4">
                                    <div className="flex flex-col gap-4 md:flex-row">
                                        <DropdownInputField
                                            options={[]}
                                            getOptionLabel={() => 'Demo'}
                                            label="Select Category"
                                            placeholder="Select value"
                                            width="65%"
                                        />
                                    </div>
                                    <div className="flex flex-col gap-4">
                                        <DropdownInputField
                                            options={[]}
                                            getOptionLabel={() => 'Demo'}
                                            label="Select User"
                                            placeholder="Select value"
                                            width="65%"
                                        />
                                    </div>
                                    <RatingsAndStatus
                                        buttonTitle="Map"
                                        onClick={({ ratings, status }) =>
                                            handleMapping(ratings, status)
                                        }
                                    />
                                    <RatingsAndStatus
                                        buttonTitle="Map"
                                        onClick={({ ratings, status }) =>
                                            handleMapping(ratings, status)
                                        }
                                    />
                                </div>
                            )}
                            {currentTab === tabs.edit && (
                                <div className="flex flex-col gap-4">
                                    <div className="flex flex-col gap-4 md:flex-row">
                                        <DropdownInputField
                                            options={[]}
                                            getOptionLabel={() => 'Demo'}
                                            label="Select Category"
                                            placeholder="Select value"
                                            width="65%"
                                        />
                                    </div>
                                    <div className="flex flex-col gap-4">
                                        <DropdownInputField
                                            options={[]}
                                            getOptionLabel={() => 'Demo'}
                                            label="Select User"
                                            placeholder="Select value"
                                            width="65%"
                                        />
                                    </div>
                                    <RatingsAndStatus
                                        buttonTitle="Update"
                                        onClick={({ ratings, status }) =>
                                            handleMapping(ratings, status)
                                        }
                                    />
                                    <RatingsAndStatus
                                        buttonTitle="Update"
                                        onClick={({ ratings, status }) =>
                                            handleMapping(ratings, status)
                                        }
                                    />
                                </div>
                            )}
                            {currentTab === tabs.delete && (
                                <div className="flex flex-col gap-4">
                                    <div className="flex flex-col gap-4 md:flex-row">
                                        <DropdownInputField
                                            options={[]}
                                            getOptionLabel={() => 'Demo'}
                                            label="Select Category"
                                            placeholder="Select value"
                                            width="65%"
                                        />
                                    </div>
                                    <div className="flex flex-col gap-4">
                                        <DropdownInputField
                                            options={[]}
                                            getOptionLabel={() => 'Demo'}
                                            label="Select User"
                                            placeholder="Select value"
                                            width="65%"
                                        />
                                    </div>
                                    <RatingsAndStatus
                                        forDelete={true}
                                        buttonTitle="UnMap"
                                        onClick={({ ratings, status }) =>
                                            handleMapping(ratings, status)
                                        }
                                    />
                                    <RatingsAndStatus
                                        forDelete={true}
                                        buttonTitle="UnMap"
                                        onClick={({ ratings, status }) =>
                                            handleMapping(ratings, status)
                                        }
                                    />
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default UserExpertiseMapping
