import { FC } from 'react'
import Rating from '@mui/material/Rating'

interface RatingsProps {
    width?: string
    label: string
    rating?: number
    setRating: (e: number | null) => void
}

const Ratings: FC<RatingsProps> = ({
    width = '100%',
    label = '',
    rating,
    setRating,
}) => {
    return (
        <div className="flex flex-col gap-2" style={{ width }}>
            <p className="text-sm text-black-color">{label}</p>
            <div className="flex flex-row">
                <Rating
                    name="customized-10"
                    value={rating}
                    onChange={(event, newValue) => {
                        setRating(newValue)
                    }}
                    precision={0.5}
                    max={10}
                    size={'large'}
                />
            </div>
        </div>
    )
}

export default Ratings
