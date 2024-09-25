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
}: HeaderProps<T>) => {
    const [isFocused, setIsFocused] = useState<boolean>(false)
    const [inputValue, setInputValue] = useState<string>('')

    const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value
        setInputValue(value)
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

    const handleClearInput = () => {
        setInputValue('')
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
                        <div
                            className={`sm:w-2/3 w-[90%] flex justify-between border overflow-hidden relative rounded-md text-xs ${isFocused ? 'border-primary-color' : 'border-light-gray-color'}`}
                        >
                            <input
                                className="p-1 sm:p-2 outline-none w-[90%]"
                                placeholder={'Search...'}
                                value={inputValue}
                                onFocus={() => setIsFocused(true)}
                                onBlur={() => setIsFocused(false)}
                                onChange={handleInputChange}
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
                        </div>
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
