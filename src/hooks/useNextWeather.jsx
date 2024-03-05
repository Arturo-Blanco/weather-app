import { useState, useEffect, useContext } from "react"
import { getNextWeather } from "../services/api.mjs"
import { CityContext } from "../context/cityContext"
import { useCurrentWeather } from "./useCurrentWeather"

export const useNextWeather = () => {
    const { coords, cityName } = useContext(CityContext)
    const [isLoading, setIsLoading] = useState(false)
    const [nextWeatherData, setNexWeatherData] = useState([])
    const { currentCityName } = useCurrentWeather()
    const [nextWeatherHasError, setNextWeatherHasError] = useState(false)

    useEffect(() => {
        if ((coords.latitude && coords.longitude) || cityName) {
            const fetchData = async () => {
                setNextWeatherHasError(false)
                setIsLoading(true)
                try {
                    const data = await getNextWeather(coords.latitude, coords.longitude, cityName)
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
    }, [coords.latitude, coords.longitude, cityName, currentCityName])


    return { nextWeatherData, isLoading, nextWeatherHasError }
}