import React from 'react'

interface ButtonProps {
    title: string
    onClick: () => void
    width?: number | string
    height?: number | string
    state?: 'primary' | 'secondary' | 'disabled'
}

const Button: React.FC<ButtonProps> = ({
    title,
    onClick,
    state = 'primary',
}) => {
    let buttonClass = 'bg-primary-color text-white'
    switch (state) {
        case 'secondary':
            buttonClass =
                'bg-white text-primary-color border border-primary-color'
            break
        case 'disabled':
            buttonClass =
                'bg-dark-gray-color text-body-text-color cursor-not-allowed'
            break
        default:
            buttonClass = 'bg-primary-color text-white'
            break
    }

    // const buttonStyles: React.CSSProperties = {
    //     height: typeof height === 'number' ? `${height}rem` : height,
    // }

    return (
        <button
            className={`px-4 py-3 h-fit w-full sm:w-52 md:w-40 lg:w-52 sm:px-4 sm:py-2 md:px-6 md:py-3 lg:px-3 lg:py-3 cursor-pointer text-xs sm:text-sm md:text-sm lg:text-sm rounded ${buttonClass}`}
            onClick={onClick}
            disabled={state === 'disabled'}
        >
            {title}
        </button>
    )
}

export default Button
