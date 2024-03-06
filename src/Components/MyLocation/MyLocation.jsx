import { useCurrentLocation } from "../../hooks/useCurrentLocation"
import './myLocation.css'

export const MyLocation = () => {
    const getCurrentLocation = useCurrentLocation()

    const handleLocation = async () => {
        await getCurrentLocation()
    }

    return (
        <div className="my-location-div">
            <button className='my-location-btn' type="button" onClick={handleLocation}>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-crosshair" viewBox="0 0 16 16">
                    <path d="M8.5.5a.5.5 0 0 0-1 0v.518A7 7 0 0 0 1.018 7.5H.5a.5.5 0 0 0 0 1h.518A7 7 0 0 0 7.5 14.982v.518a.5.5 0 0 0 1 0v-.518A7 7 0 0 0 14.982 8.5h.518a.5.5 0 0 0 0-1h-.518A7 7 0 0 0 8.5 1.018zm-6.48 7A6 6 0 0 1 7.5 2.02v.48a.5.5 0 0 0 1 0v-.48a6 6 0 0 1 5.48 5.48h-.48a.5.5 0 0 0 0 1h.48a6 6 0 0 1-5.48 5.48v-.48a.5.5 0 0 0-1 0v.48A6 6 0 0 1 2.02 8.5h.48a.5.5 0 0 0 0-1zM8 10a2 2 0 1 0 0-4 2 2 0 0 0 0 4" />
                </svg>
                <p className="btn-location-text"> My location </p>
            </button>
        </div>
    )
}