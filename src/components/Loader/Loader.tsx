import { Loading } from '../../assets/images'

const Loader = () => {
    return (
        <div className="h-screen w-screen flex items-center justify-center fixed top-0 left-0 z-10 bg-[#00000082]">
            <div className="h-20 w-20 rounded-lg bg-white-color flex items-center justify-center p-2">
                <img src={Loading} className="h-full w-full" />
            </div>
        </div>
    )
}

export default Loader
