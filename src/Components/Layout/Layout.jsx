import { Spinner } from "react-bootstrap"
import { CurrentWeatherBox } from "../WeatherBox/CurrentWeatherBox"
import { useCurrentWeather } from "../../hooks/useCurrentWeather"
import { NextWeatherBox } from "../WeatherBox/NextWeatherBox"
import { WeatherProvider } from "../../context/weatherContext"
import { SearchCity } from "../SearchCity/SearchCity"
import './layout.css'
import { useLocation } from "wouter"
import { useEffect } from "react"

export const Layout = () => {
    const { currentWeather, currentCityName, currentWeatherHasError } = useCurrentWeather()
    const [, setLocation] = useLocation()

    useEffect(() => {
        setLocation(`/location?city=${encodeURIComponent(currentCityName)}`);
    }, [currentCityName, setLocation])

    if (currentWeatherHasError) return <p className="error-location"> Oops! It seems there was a problem searching for information for the city. Please try again later or verify that the city entered is correct.. </p>

    return (
        <>
            <main className='container'>
                <SearchCity />
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
            </main>
        </>
    )
}