import { FC } from 'react'
interface HeaderProps {
    title: string
}

const Header: FC<HeaderProps> = ({title}) => {
  return (
    <header className={"mb-4"}>
       <h3 className="text-xl font-semibold text-black-color">{title}</h3>
    </header>
  )
}

export default Header
