import { useState, useEffect, useCallback } from "react"
import { getCurrentWeather, getNextWeather } from "../services/api.mjs";

export const useWeather = () => {
    const [isLoading, setIsLoading] = useState(null)
    const [cityName, setCityName] = useState(null)
    const [hasError, setHasError] = useState(null)
    const [currentWeather, setCurrentWeather] = useState(null)
    const [nextWeatherData, setNexWeatherData] = useState([])

    const getCurrentWeatherData = useCallback(async () => {
        setIsLoading(true)
        try {
            const { name, ...currentWeather } = await getCurrentWeather(cityName)
            const netWeather = await getNextWeather(cityName)
            setCityName(name)
            setCurrentWeather(currentWeather)
            setNexWeatherData(netWeather)
            setIsLoading(false)
        }
        catch (error) {
            setIsLoading(false)
            setHasError(true)
        }
    }, [cityName])

    useEffect(() => {
        getCurrentWeatherData()
        const intervalId = setInterval(getCurrentWeatherData, 600000)
        return () => {
            clearInterval(intervalId)
        }
    }, [getCurrentWeatherData])

    return {
        isLoading,
        cityName,
        setCityName,
        hasError,
        currentWeather,
        nextWeatherData,
    }
}