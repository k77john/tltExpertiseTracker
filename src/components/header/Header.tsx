import { ChangeEvent, useState } from 'react'
import Button from '../button/Button'
import NavBar from '../NavBar/NavBar'

interface HeaderProps<T> {
    title: string
    buttonTitle?: string
    onClick?: () => void
    searchBar?: boolean
    getOptionLabel?: (option: T) => string
    getOptionDescription?: (option: T) => string
    getOptionsOnOther?: (option: T) => string
    options?: T[]
    setFilteredOptions?: (value: T[]) => void
    apiSearch?: boolean
    searchInput?: string
    setSearchInput?: (value: string) => void
}

const Header = <T extends object>({
    title,
    buttonTitle = '',
    onClick = () => {},
    searchBar,
    options,
    setFilteredOptions = () => {},
    getOptionLabel = () => '',
    getOptionDescription = () => '',
    getOptionsOnOther = () => '',
    apiSearch = false,
    setSearchInput = () => {},
}: HeaderProps<T>) => {
    const [isFocused, setIsFocused] = useState<boolean>(false)
    const [inputValue, setInputValue] = useState<string>('')

    const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value
        setInputValue(value)
    }

    const handleSearch = (value: string) => {
        setFilteredOptions(
            options?.filter(
                (option) =>
                    getOptionLabel(option)
                        .toLowerCase()
                        .includes(value.toLowerCase()) ||
                    getOptionDescription(option)
                        .toLowerCase()
                        .includes(value.toLowerCase()) ||
                    getOptionsOnOther(option)
                        .toLowerCase()
                        .includes(value.toLowerCase())
            ) || []
        )
    }

    const handleSearchForAPI = (value: string) => {
        setSearchInput(value)
    }

    const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') {
            if (!apiSearch) {
                handleSearch(inputValue)
            } else {
                handleSearchForAPI(inputValue)
            }
        }
    }

    const handleClearInput = () => {
        setInputValue('')
        setSearchInput('')
        setFilteredOptions(options || [])
    }

    return (
        <div className="sticky top-0 flex flex-col gap-4 md:h-32 bg-white z-40">
            <NavBar />
            <header
                className={
                    'px-4 flex flex-col sm:flex-row justify-between sm:items-center pb-4 gap-4'
                }
            >
                <h3 className="text-xl font-semibold text-black-color">
                    {title}
                </h3>

                <div className="flex gap-4 h-full justify-end w-full sm:w-[60%]">
                    {searchBar && (
                        <>
                            {!apiSearch && (
                                <div
                                    className={`sm:w-2/3 w-[90%] flex items-center justify-between border overflow-hidden relative rounded-md text-xs ${isFocused ? 'border-primary-color' : 'border-light-gray-color'}`}
                                >
                                    <input
                                        className="p-1 sm:p-2 outline-none w-[80%] h-full"
                                        placeholder={'Search...'}
                                        value={inputValue}
                                        onFocus={() => setIsFocused(true)}
                                        onBlur={() => setIsFocused(false)}
                                        onChange={handleInputChange}
                                        onKeyDown={handleKeyDown}
                                    />
                                    {inputValue && (
                                        <button
                                            className="h-full w-[10%] flex items-center justify-center"
                                            onClick={handleClearInput}
                                        >
                                            <svg
                                                aria-hidden="true"
                                                className="w-4 h-4"
                                                fill="currentColor"
                                                viewBox="0 0 20 20"
                                                xmlns="http://www.w3.org/2000/svg"
                                            >
                                                <path
                                                    fillRule="evenodd"
                                                    d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                                                    clipRule="evenodd"
                                                ></path>
                                            </svg>
                                        </button>
                                    )}
                                    <button
                                        onClick={() => handleSearch(inputValue)}
                                        className="h-full w-[10%] flex items-center justify-center border border-white-color border-l-gray-200"
                                    >
                                        <svg
                                            className="w-4 h-4"
                                            xmlns="http://www.w3.org/2000/svg"
                                            viewBox="0 0 512 512"
                                        >
                                            <path
                                                fillRule="evenodd"
                                                clipRule="evenodd"
                                                d="M416 208c0 45.9-14.9 88.3-40 122.7L502.6 457.4c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L330.7 376c-34.4 25.2-76.8 40-122.7 40C93.1 416 0 322.9 0 208S93.1 0 208 0S416 93.1 416 208zM208 352a144 144 0 1 0 0-288 144 144 0 1 0 0 288z"
                                            />
                                        </svg>
                                    </button>
                                </div>
                            )}
                            {apiSearch && (
                                <div
                                    className={`sm:w-2/3 w-[90%] flex items-center justify-between border overflow-hidden relative rounded-md text-xs ${isFocused ? 'border-primary-color' : 'border-light-gray-color'}`}
                                >
                                    <input
                                        className="p-1 sm:p-2 outline-none w-[80%] h-full"
                                        placeholder={'Search...'}
                                        value={inputValue}
                                        onFocus={() => setIsFocused(true)}
                                        onBlur={() => setIsFocused(false)}
                                        onChange={handleInputChange}
                                        onKeyDown={handleKeyDown}
                                    />
                                    {inputValue && (
                                        <button
                                            className="h-full w-[10%] flex items-center justify-center"
                                            onClick={handleClearInput}
                                        >
                                            <svg
                                                aria-hidden="true"
                                                className="w-4 h-4"
                                                fill="currentColor"
                                                viewBox="0 0 20 20"
                                                xmlns="http://www.w3.org/2000/svg"
                                            >
                                                <path
                                                    fillRule="evenodd"
                                                    d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                                                    clipRule="evenodd"
                                                ></path>
                                            </svg>
                                        </button>
                                    )}
                                    <button
                                        onClick={() =>
                                            handleSearchForAPI(inputValue)
                                        }
                                        className="h-full w-[10%] flex items-center justify-center border border-white-color border-l-gray-200"
                                    >
                                        <svg
                                            className="w-4 h-4"
                                            xmlns="http://www.w3.org/2000/svg"
                                            viewBox="0 0 512 512"
                                        >
                                            <path
                                                fillRule="evenodd"
                                                clipRule="evenodd"
                                                d="M416 208c0 45.9-14.9 88.3-40 122.7L502.6 457.4c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L330.7 376c-34.4 25.2-76.8 40-122.7 40C93.1 416 0 322.9 0 208S93.1 0 208 0S416 93.1 416 208zM208 352a144 144 0 1 0 0-288 144 144 0 1 0 0 288z"
                                            />
                                        </svg>
                                    </button>
                                </div>
                            )}
                        </>
                    )}
                    {buttonTitle && (
                        <Button
                            onClick={onClick}
                            title={buttonTitle}
                            className="w-[45%] md:w-44"
                        />
                    )}
                </div>
            </header>
        </div>
    )
}

export default Header
