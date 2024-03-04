import { useState, useEffect } from "react"
import { getCurrentWeather } from "../services/api.mjs";

export const useCurrentWeather = cityName => {

    const [currentWeather, setCurrentWeather] = useState('')
    const [isLoading, setIsLoading] = useState(false)

    useEffect(() => {
        const fetchData = async () => {
            setIsLoading(true)
            try {
                const data = await getCurrentWeather(cityName)
                setCurrentWeather(data)
            } catch (error) {
                console.error("Error fetching current weather:", error)
            } finally {
                setIsLoading(false)
            }
        }

        fetchData()
        const intervalId = setInterval(fetchData, 600000)
        return () => clearInterval(intervalId)
    }, [cityName])

    return { isLoading, currentWeather }
}