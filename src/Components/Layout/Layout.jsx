import { Spinner } from "react-bootstrap"
import { CurrentWeatherBox } from "../WeatherBox/CurrentWeatherBox"
import { useCurrentWeather } from "../../hooks/useCurrentWeather"
import { NextWeatherBox } from "../WeatherBox/NextWeatherBox"
import { WeatherProvider } from "../../context/weatherContext"
import { useParams } from "wouter"
import './layout.css'

export const Layout = () => {
    const params = useParams()
    const { currentWeather, currentWeatherHasError } = useCurrentWeather({ params })

    if (currentWeatherHasError) return <p className="error-location"> Oops! It seems there was a problem searching for information for the city. Please try again later or verify that the city entered is correct.</p>

    return (
        <>
            <main className='container'>
                <div className='home-text-container' >
                    <p className='home-text'> Current weather in: {<span className="city-name">{params.city}</span>}</p>
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