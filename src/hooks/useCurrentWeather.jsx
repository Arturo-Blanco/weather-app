import { useState, useEffect, useContext } from "react"
import { getCurrentWeather } from "../services/api.mjs"
import { CityContext } from "../context/cityContext"

export const useCurrentWeather = () => {
    const { coords, cityName } = useContext(CityContext)
    const [currentWeather, setCurrentWeather] = useState('')
    const [isLoading, setIsLoading] = useState(false)
    const [currentWeatherHasError, setcurrentWeatherHasError] = useState(false)
    const [currentCityName, setCurrentCityName] = useState('')

    useEffect(() => {
        if ((coords.latitude && coords.longitude) || cityName) {
            const fetchData = async () => {
                setcurrentWeatherHasError(false)
                setIsLoading(true)
                try {
                    const { name, ...data } = await getCurrentWeather(coords.latitude, coords.longitude, cityName)
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
    }, [coords.latitude, coords.longitude, cityName, currentCityName])

    return { isLoading, currentWeather, currentCityName, cityName, currentWeatherHasError }
}