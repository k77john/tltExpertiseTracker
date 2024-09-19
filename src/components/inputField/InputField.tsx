import { CSSProperties, FC } from 'react'

interface InputFieldProps {
    height?: string
    width?: string
    type?: 'text' | 'password' | 'email' | 'textarea'
    label: string
    placeholder?: string
    disabled?: boolean
    backgroundColor?: string
    onChange: (e: string) => void
    onSubmit?: () => void
    value?: string
}

const InputField: FC<InputFieldProps> = ({
    height = '2.5rem',
    width = '100%',
    type = 'text',
    label = '',
    placeholder = '',
    disabled = false,
    backgroundColor = 'white',
    onChange,
    value,
    onSubmit = () => {},
}) => {
    const commonStyles: CSSProperties = {
        height,
        backgroundColor,
    }

    const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') {
            onSubmit()
        }
    }

    return type === 'textarea' ? (
        <div className="flex flex-col gap-2" style={{ width }}>
            <p className="text-sm text-black-color">{label}</p>
            <textarea
                style={{ ...commonStyles, resize: 'none' }}
                title={label}
                placeholder={placeholder}
                disabled={disabled}
                value={value}
                onChange={(e) => onChange(e.target.value)}
                className="p-4 rounded border border-light-gray-color w-full text-sm outline-primary-color"
            />
        </div>
    ) : (
        <div className="flex flex-col gap-2" style={{ width }}>
            <p className="text-sm text-black-color">{label}</p>
            <input
                className="p-4 rounded border border-light-gray-color w-full text-sm outline-primary-color"
                style={commonStyles}
                type={type}
                value={value}
                onKeyDown={handleKeyDown}
                title={label}
                placeholder={placeholder}
                disabled={disabled}
                onChange={(e) => onChange(e.target.value)}
            />
        </div>
    )
}

export default InputField
