import { useState, useEffect } from "react"
import { getNextWeather } from "../services/api.mjs"

export const useNextWeather = ({ params }) => {
    const { city } = params || {}
    const [ coords, setCoordinates ] = useState({
        latitude: '',
        longitude: ''
    })
    const [isLoading, setIsLoading] = useState(false)
    const [nextWeatherData, setNexWeatherData] = useState([])
    const [nextWeatherHasError, setNextWeatherHasError] = useState(false)

    useEffect(() => {
        if ((coords.latitude && coords.longitude) || city) {
            const fetchData = async () => {
                setNextWeatherHasError(false)
                setIsLoading(true)
                try {
                    const data = await getNextWeather(coords.latitude, coords.longitude, city)
                    setNexWeatherData(data)
                } catch (error) {
                    console.error("Error fetching next weather:", error)
                    setNextWeatherHasError(true)
                } finally {
                    setIsLoading(false)
                }
            }
            fetchData()
            const intervalId = setInterval(fetchData, 600000)
            return () => clearInterval(intervalId)
        }
    }, [coords.latitude, coords.longitude, city])

    return { nextWeatherData, isLoading, nextWeatherHasError, setCoordinates }
}