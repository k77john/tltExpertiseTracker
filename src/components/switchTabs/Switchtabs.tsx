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
            <p className="text-xs">{label}</p>
            <div className="flex items-center p-1 bg-gray-300 rounded-md w-fit">
                <button
                    className={`py-2 px-3 text-xs cursor-pointer border-none w-28 rounded-md ${
                        selectedTab
                            ? 'bg-white text-black'
                            : 'bg-gray-300 text-gray-600'
                    }`}
                    onClick={() => handleTabClick(true)}
                >
                    {tabValues.left}
                </button>
                <button
                    className={`py-2 px-3 text-xs cursor-pointer border-none w-28 rounded-md ${
                        !selectedTab
                            ? 'bg-white text-black'
                            : 'bg-gray-300 text-gray-600'
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
