import React, { useState, useRef, useEffect, ReactNode } from 'react'

interface CustomDropDownProps {
    children: ReactNode
    dropdownComponent: ReactNode
}

const CustomDropDown: React.FC<CustomDropDownProps> = ({
    children,
    dropdownComponent,
}) => {
    const dropdownRef = useRef<HTMLDivElement | null>(null)
    const [isChecked, setIsChecked] = useState<boolean>(false)

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (
                dropdownRef.current &&
                !dropdownRef.current.contains(event.target as Node)
            ) {
                setIsChecked(false)
            }
        }
        document.addEventListener('click', handleClickOutside)

        return () => {
            document.removeEventListener('click', handleClickOutside)
        }
    }, [dropdownRef])

    return (
        <div
            className={`relative ${isChecked ? 'open' : ''}`}
            ref={dropdownRef}
        >
            <div className="relative ">
                <div
                    className="cursor-pointer"
                    onClick={() => setIsChecked(!isChecked)}
                >
                    {children}
                </div>
                <div
                    className={`absolute top-full border border-gray-100 left-0 w-full rounded-md bg-white shadow-lg transition-opacity duration-200 ${isChecked ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}
                >
                    <div className="max-h-[13vw] overflow-auto">
                        <div className="flex justify-between items-center w-full text-sm bg-secondary_color rounded-lg p-2 mt-2">
                            {dropdownComponent}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CustomDropDown
