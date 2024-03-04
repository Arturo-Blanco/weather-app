import { useWeather } from "../../hooks/useWeather"
import { Spinner } from "react-bootstrap"
import { CurrentWeatherBox } from "../WeatherBox/CurrentWeatherBox"

export const Layout = () => {

    const { cityName } = useWeather()

    return (
        cityName ? <>
            <div className='home-text-container'>
                <p className='home-text'> Current weather in: {<span className="city-name">{cityName}</span>}</p>
            </div>
            <CurrentWeatherBox />
        </>
            :
            <Spinner animation="border" variant="light" />
    )
}