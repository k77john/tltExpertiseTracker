import { FC } from 'react'

interface SwitchtabsProps {
    tabValues: { left: string; right: string }
    setSelectedTab: (value: boolean) => void
    label: string
    selectedTab: boolean
}

const Switchtabs: FC<SwitchtabsProps> = ({
    tabValues,
    label,
    setSelectedTab,
    selectedTab,
}) => {
    const handleTabClick = (value: boolean) => {
        setSelectedTab(value)
    }

    return (
        <div className="flex flex-col gap-2 w-fit">
            <p className="text-sm">{label}</p>
            <div className="flex items-center  bg-gray-100 border border-gray-200 rounded-md w-fit">
                <button
                    className={`py-3 px-3 text-xs cursor-pointer border-none w-28 rounded-md ${
                        selectedTab
                            ? 'bg-primary-color text-white'
                            : 'bg-gray-100 text-gray-600'
                    }`}
                    onClick={() => handleTabClick(true)}
                >
                    {tabValues.left}
                </button>
                <button
                    className={`py-3 px-3 text-xs cursor-pointer border-none w-28 rounded-md ${
                        !selectedTab
                            ? 'bg-primary-color text-white'
                            : 'bg-gray-100 text-gray-600'
                    }`}
                    onClick={() => handleTabClick(false)}
                >
                    {tabValues.right}
                </button>
            </div>
        </div>
    )
}

export default Switchtabs
