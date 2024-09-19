import React, { useRef, useState } from 'react'

interface OTPInputType {
    setOtp: (value: string) => void
    onSubmit?: () => void
}

const OTPInput: React.FC<OTPInputType> = ({ setOtp, onSubmit = () => {} }) => {
    const inputs = useRef<(HTMLInputElement | null)[]>([])
    const [otp, setOtpState] = useState<string>('')

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement>,
        index: number
    ) => {
        const value = e.target.value

        if (!/^\d?$/.test(value)) {
            e.target.value = ''
            return
        }

        const newOtp = otp.slice(0, index) + value + otp.slice(index + 1)
        setOtpState(newOtp)

        setOtp(newOtp)

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

        if (index === 3) {
            if (e.key === 'Enter') {
                onSubmit()
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
