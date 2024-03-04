import { useState, useEffect } from "react"
import { getNextWeather } from "../services/api.mjs";

export const useNextWeather = cityName => {
    const [isLoading, setIsLoading] = useState(false)
    const [nextWeatherData, setNexWeatherData] = useState([])

    useEffect(() => {
        const fetchData = async () => {
            setIsLoading(true)
            try {
                const data = await getNextWeather(cityName)
                setNexWeatherData(data)
            } catch (error) {
                console.error("Error fetching next weather:", error)
            } finally {
                setIsLoading(false)
            }
        }

        fetchData()
        const intervalId = setInterval(fetchData, 600000)
        return () => clearInterval(intervalId)
    }, [cityName])

    return { nextWeatherData, isLoading }
}