const LineLoader = () => {
    return (
        <div className="w-[200px] h-[3px] relative overflow-hidden bg-gray-300 mx-auto mt-[100px] rounded-custom">
            <div className="absolute h-[3px] w-[40%] bg-coral animate-lineAnim rounded-custom"></div>
        </div>
    )
}

export default LineLoader
