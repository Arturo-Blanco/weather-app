import { CurrentWeatherBox } from "../WeatherBox/CurrentWeatherBox"
import { NextWeatherBox } from "../WeatherBox/NextWeatherBox"
import { Spinner } from "react-bootstrap"
import { useWeather } from "../../hooks/useWeather"
import { useState } from "react"

export const CurrentCity = () => {

    const [weatherData, setWeatherData] = useState(null)
    const { isLoad } = useWeather()

    const handleDataChange = data => {
        setWeatherData(data)
    }

    return (
        <>
            {!isLoad ?
                <>
                    <CurrentWeatherBox weatherData={weatherData} />
                    <NextWeatherBox handleDataChange={handleDataChange} />
                </> : <Spinner animation="border" variant="light" />
            }
        </>
    )
}