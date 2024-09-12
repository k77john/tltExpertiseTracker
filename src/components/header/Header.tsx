import { FC } from 'react'
import Button from '../button/Button'
import NavBar from '../navBar/NavBar'
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
        <div className="sticky top-0 flex flex-col gap-4 h-32 overflow-hidden bg-white">
            <NavBar />
            <header className={'px-4 flex justify-between items-center  pb-4'}>
                <h3 className="text-xl font-semibold text-black-color">
                    {title}
                </h3>
                {buttonTitle && (
                    <Button onClick={onClick} title={buttonTitle} />
                )}
            </header>
        </div>
    )
}

export default Header
