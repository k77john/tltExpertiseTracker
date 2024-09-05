import { FC } from 'react'
import Button from '../button/Button'
interface HeaderProps {
    title: string
    buttonTitle?: string
    onClick?: () => void
}

const Header: FC<HeaderProps> = ({
    title,
    buttonTitle = '',
    onClick = () => {},
}) => {
    return (
        <header
            className={
                'mb-4 flex justify-between items-center  border-b border-gray-300 pb-4'
            }
        >
            <h3 className="text-xl font-semibold text-black-color">{title}</h3>
            {buttonTitle && <Button onClick={onClick} title="+ Add Category" />}
        </header>
    )
}

export default Header
