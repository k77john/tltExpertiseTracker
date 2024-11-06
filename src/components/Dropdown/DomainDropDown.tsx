import { ChangeEvent, useEffect, useRef, useState } from 'react'
import { Category } from '../../constants/types'
import { getCategories } from '../../services/category.services'
import { ITEMS_LIMIT } from '../../constants/constents'

interface DropdownInputFieldProps {
    height?: string
    width?: string
    label: string
    placeholder?: string
    disabled?: boolean
    backgroundColor?: string
    onSelect?: (option: Category) => void
    selectedOption?: string
}

const DomainDropDown: React.FC<DropdownInputFieldProps> = ({
    height = '2.5rem',
    width = '100%',
    label = '',
    placeholder = '',
    disabled = false,
    backgroundColor = 'white',
    onSelect = () => {},
    selectedOption,
}) => {
    const [category, setCategory] = useState<Category[]>([])
    const [filteredOptions, setFilteredOptions] = useState<Category[]>(category)
    const [inputValue, setInputValue] = useState<string>('')
    const [isDropdownOpen, setIsDropdownOpen] = useState<boolean>(false)
    const [dropdownDirection, setDropdownDirection] = useState<'down' | 'up'>(
        'down'
    )
    const dropdownRef = useRef<HTMLDivElement>(null)

    const [currentPage, setCurrentPage] = useState<number>(1)
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [isNextPage, setIsNextPage] = useState<boolean>(true)

    useEffect(() => {
        if (selectedOption) {
            setInputValue(selectedOption)
        }
    }, [selectedOption])

    const getCategoriesHandler = async (page: number) => {
        setIsLoading(true)
        const resp = await getCategories({
            limit: ITEMS_LIMIT.toString(),
            page: String(page),
        })
        if (resp.isSuccessful) {
            if (resp.data.length > 0) {
                setCategory((prev) => [...prev, ...resp.data])
                setFilteredOptions((prev) => [...prev, ...resp.data])
            } else {
                setIsNextPage(false)
            }
        }
        setIsLoading(false)
    }

    useEffect(() => {
        getCategoriesHandler(currentPage)
    }, [currentPage])

    const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value
        setInputValue(value)
        const filteredCat =
            category.filter((option) =>
                option.categoryName?.toLowerCase().includes(value.toLowerCase())
            ) || []
        setFilteredOptions(filteredCat)
    }

    const handleInputClick = () => {
        setIsDropdownOpen(true)
        const dropdownRect = dropdownRef.current?.getBoundingClientRect()
        const viewportHeight = window.innerHeight
        setFilteredOptions(category)
        if (dropdownRect) {
            if (dropdownRect.bottom + 200 > viewportHeight) {
                setDropdownDirection('up')
            } else {
                setDropdownDirection('down')
            }
        }
    }

    const handleOptionClick = (option: Category) => {
        setInputValue(option.categoryName || '')
        setFilteredOptions(category)
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
            <p className="text-sm text-black-color">{label}</p>
            <input
                className="w-full p-3 sm:p-4 border border-light-gray-color rounded-md text-sm outline-primary-color"
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
                    // onScroll={handleScroll}
                    className={`absolute w-full bg-white-color border border-light-gray-color rounded-md max-h-40 sm:max-h-52 overflow-y-auto z-10 shadow-md ${
                        dropdownDirection === 'down'
                            ? 'top-full mt-2'
                            : 'bottom-full mb-2'
                    }`}
                >
                    {filteredOptions.map((option, index) => (
                        <li
                            key={`${option.categoryName}-${index}`}
                            className={`p-2 text-xs sm:text-sm cursor-pointer hover:bg-gray-100 ${option.categoryName === inputValue ? 'bg-gray-100' : 'bg-white-color'}`}
                            onClick={() => handleOptionClick(option)}
                        >
                            {option.categoryName}
                        </li>
                    ))}
                    <li>
                        <div className="flex gap-3">
                            {isNextPage && (
                                <button
                                    className="text-sm w-full p-2 text-primary-color text-center bg-gray-50 mt-2"
                                    onClick={() =>
                                        setCurrentPage((prev) => prev + 1)
                                    }
                                >
                                    {isLoading ? 'Loading...' : 'Load More'}
                                </button>
                            )}
                            {!isNextPage && !isLoading && (
                                <p className="text-sm w-full p-2 text-gray-500 text-center bg-gray-50 mt-2">
                                    No More Items
                                </p>
                            )}
                        </div>
                    </li>
                </ul>
            )}
        </div>
    )
}

export default DomainDropDown
