import { ChangeEvent, FC, useEffect, useRef, useState } from 'react'

interface DropdownInputFieldProps {
    height?: string
    width?: string
    label: string
    placeholder?: string
    disabled?: boolean
    backgroundColor?: string
    onSelect?: (option: string) => void
    options: string[]
}

const DropdownInputField: FC<DropdownInputFieldProps> = ({
    height = '2.5rem',
    width = '100%',
    label = '',
    placeholder = '',
    disabled = false,
    backgroundColor = 'white',
    onSelect = () => {},
    options,
}) => {
    const [filteredOptions, setFilteredOptions] = useState<string[]>(options)
    const [inputValue, setInputValue] = useState<string>('')
    const [isDropdownOpen, setIsDropdownOpen] = useState<boolean>(false)
    const [dropdownDirection, setDropdownDirection] = useState<'down' | 'up'>(
        'down'
    )
    const dropdownRef = useRef<HTMLDivElement>(null)

    const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value
        setInputValue(value)
        setFilteredOptions(
            options.filter((option) =>
                option.toLowerCase().includes(value.toLowerCase())
            )
        )
    }

    const handleInputClick = () => {
        setIsDropdownOpen(true)
        const dropdownRect = dropdownRef.current?.getBoundingClientRect()
        const viewportHeight = window.innerHeight

        if (dropdownRect) {
            if (dropdownRect.bottom + 200 > viewportHeight) {
                setDropdownDirection('up')
            } else {
                setDropdownDirection('down')
            }
        }
    }

    const handleOptionClick = (option: string) => {
        setInputValue(option)
        setFilteredOptions([])
        setIsDropdownOpen(false)
        onSelect(option)
    }

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (
                dropdownRef.current &&
                !dropdownRef.current.contains(event.target as Node)
            ) {
                setIsDropdownOpen(false)
            }
        }
        document.addEventListener('click', handleClickOutside)

        return () => {
            document.removeEventListener('click', handleClickOutside)
        }
    }, [dropdownRef])

    return (
        <div
            className="relative flex flex-col gap-2"
            style={{ width }}
            ref={dropdownRef}
        >
            <p className="text-xs sm:text-sm text-black-color">{label}</p>
            <input
                className="w-full p-3 sm:p-4 border border-light-gray-color rounded-md text-sm"
                style={{ height, backgroundColor }}
                type="text"
                title={label}
                placeholder={placeholder}
                disabled={disabled}
                value={inputValue}
                onChange={handleInputChange}
                onClick={handleInputClick}
            />
            {isDropdownOpen && filteredOptions.length > 0 && (
                <ul
                    className={`absolute w-full bg-white-color border border-light-gray-color rounded-md max-h-40 sm:max-h-52 overflow-y-auto z-10 shadow-md ${
                        dropdownDirection === 'down'
                            ? 'top-full mt-2'
                            : 'bottom-full mb-2'
                    }`}
                >
                    {filteredOptions.map((option) => (
                        <li
                            key={option}
                            className="p-2 text-xs sm:text-sm cursor-pointer hover:bg-gray-100"
                            onClick={() => handleOptionClick(option)}
                        >
                            {option}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    )
}

export default DropdownInputField
