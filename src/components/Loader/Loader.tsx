import { Loading } from '../../assets/images'

interface LoaderProps {
    type?: 'fixed' | 'fit'
}

const Loader: React.FC<LoaderProps> = ({ type = 'fixed' }) => {
    return (
        <div
            className={`${type === 'fixed' ? 'h-screen w-screen fixed ' : 'h-full w-full absolute'} top-0 left-0 flex items-center justify-center  bg-transparent`}
            style={{ zIndex: 99999 }}
        >
            <div className="h-16 w-16 shadow-md rounded-lg bg-white-color flex items-center justify-center p-2">
                <img src={Loading} className="h-full w-full" />
            </div>
        </div>
    )
}

export default Loader
