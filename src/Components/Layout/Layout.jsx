import { Spinner } from "react-bootstrap"
import { CurrentWeatherBox } from "../WeatherBox/CurrentWeatherBox"
import { useCurrentWeather } from "../../hooks/useCurrentWeather"
import { NextWeatherBox } from "../WeatherBox/NextWeatherBox"
import { WeatherProvider } from "../../context/weatherContext"

export const Layout = () => {
    const { currentWeather, currentCityName, currentWeatherHasError } = useCurrentWeather()

    if (currentWeatherHasError) return <p style={{ fontSize: 24, color: '#32e5' }}> An error occurred. Try again. </p>

    return (
        <>
            < div className='home-text-container' >
                <p className='home-text'> Current weather in: {<span className="city-name">{currentCityName}</span>}</p>
            </div >
            {(currentWeather && !currentWeatherHasError) ?
                <WeatherProvider>
                    <CurrentWeatherBox />
                    <NextWeatherBox />
                </WeatherProvider>
                :
                <Spinner animation="border" variant="light" />}
        </>
    )
}