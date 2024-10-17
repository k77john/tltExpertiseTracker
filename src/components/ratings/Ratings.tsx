import { FC } from 'react'
import Rating from '@mui/material/Rating'

interface RatingsProps {
    width?: string
    label?: string
    rating?: number
    setRating?: (e: number) => void
    readOnly?: boolean
}

const Ratings: FC<RatingsProps> = ({
    width = '100%',
    label = '',
    rating,
    setRating = () => {},
    readOnly = false,
}) => {
    return (
        <div className="flex flex-col gap-2" style={{ width }}>
            {label && <p className="text-sm text-black-color">{label}</p>}

            <div className="flex flex-row">
                <Rating
                    name="customized-10"
                    value={rating}
                    onChange={(_, newValue) => {
                        setRating(newValue || 0)
                    }}
                    readOnly={readOnly}
                    max={10}
                    size={'large'}
                />
            </div>
        </div>
    )
}

export default Ratings
