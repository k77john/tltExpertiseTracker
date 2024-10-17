import React from 'react'

interface ButtonProps {
    title: string
    onClick: () => void
    width?: number | string
    height?: number | string
    state?: 'primary' | 'secondary' | 'disabled' | 'delete'
    className?: string
}

const Button: React.FC<ButtonProps> = ({
    title,
    onClick,
    state = 'primary',
    className = '',
}) => {
    let buttonClass = 'rounded px-4 py-2 text-xs sm:text-sm md:text-sm'

    switch (state) {
        case 'secondary':
            buttonClass +=
                ' bg-white text-primary-color border border-primary-color'
            break
        case 'disabled':
            buttonClass += ' bg-gray-300 text-gray-600 cursor-not-allowed'
            break
        case 'delete':
            buttonClass += ' bg-red-50 text-red-600 '
            break
        default:
            buttonClass += ' bg-primary-color text-white'
            break
    }

    return (
        <button
            className={`${buttonClass} ${className}`}
            onClick={onClick}
            disabled={state === 'disabled'}
        >
            {title}
        </button>
    )
}

export default Button
