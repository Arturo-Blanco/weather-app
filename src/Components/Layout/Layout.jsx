import { Spinner } from "react-bootstrap"
import { CurrentWeatherBox } from "../WeatherBox/CurrentWeatherBox"
import { useCurrentWeather } from "../../hooks/useCurrentWeather"
import { NextWeatherBox } from "../WeatherBox/NextWeatherBox"
import { WeatherProvider } from "../../context/weatherContext"

export const Layout = () => {

    const { currentWeather, currentCityName } = useCurrentWeather()

    return (
        (currentCityName && currentWeather) ? <>
            <div className='home-text-container'>
                <p className='home-text'> Current weather in: {<span className="city-name">{currentCityName}</span>}</p>
            </div>
            <WeatherProvider>
                <CurrentWeatherBox />
                <NextWeatherBox />
            </WeatherProvider>
        </> :
            <Spinner animation="border" variant="light" />
    )
}