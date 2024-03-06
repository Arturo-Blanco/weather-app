import { useState, useEffect } from "react"
import { getCurrentWeather } from "../services/api.mjs"
import { useLocation } from "wouter";

export const useCurrentWeather = ({ params }) => {
    const { city } = params || {};
    const [ coords, setCoords ] = useState({
        latitude: '',
        longitude: ''
    })
    const [currentWeather, setCurrentWeather] = useState('')
    const [isLoading, setIsLoading] = useState(false)
    const [currentWeatherHasError, setcurrentWeatherHasError] = useState(false)
    const [currentCityName, setCurrentCityName] = useState('')
    const [, setLocation ] = useLocation()

    useEffect(() => {
        if ((coords.latitude && coords.longitude) || city) {
            const fetchData = async () => {
                setcurrentWeatherHasError(false)
                setIsLoading(true)
                try {
                    const { name, ...data } = await getCurrentWeather(coords.latitude, coords.longitude, city)
                    city === undefined ? setLocation(`/search/${name}`) : null
                    setCurrentWeather(data)
                    setCurrentCityName(name)
                } catch (error) {
                    console.error("Error fetching current weather:", error)
                    setcurrentWeatherHasError(true)
                } finally {
                    setIsLoading(false)
                }
            }

            fetchData()
            const intervalId = setInterval(fetchData, 600000)
            return () => clearInterval(intervalId)
        }
    }, [coords.latitude, coords.longitude, city, setLocation])
    
    return { isLoading, currentWeather, currentCityName, currentWeatherHasError, setCoords }
}