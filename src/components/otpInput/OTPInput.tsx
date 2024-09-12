import React, { useRef } from 'react'

const OTPInput: React.FC = () => {
    const inputs = useRef<(HTMLInputElement | null)[]>([])

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement>,
        index: number
    ) => {
        const value = e.target.value

        if (!/^\d?$/.test(value)) {
            e.target.value = ''
            return
        }

        if (value && inputs.current[index + 1]) {
            inputs.current[index + 1]?.focus()
        }
    }

    const handleKeyDown = (
        e: React.KeyboardEvent<HTMLInputElement>,
        index: number
    ) => {
        if (e.key === 'Backspace') {
            if (inputs.current[index]?.value === '') {
                if (index > 0) {
                    inputs.current[index - 1]?.focus()
                }
            }
        }
    }

    return (
        <div className="flex w-full gap-2 justify-between items-center">
            {[0, 1, 2, 3].map((index) => (
                <input
                    key={index}
                    type="text"
                    maxLength={1}
                    ref={(el) => (inputs.current[index] = el)}
                    onChange={(e) => handleChange(e, index)}
                    onKeyDown={(e) => handleKeyDown(e, index)}
                    className="w-16 h-16 text-center text-2xl border border-gray-300 rounded-md focus:outline-none focus:border-primary-color transition duration-150 ease-in-out"
                />
            ))}
        </div>
    )
}

export default OTPInput
