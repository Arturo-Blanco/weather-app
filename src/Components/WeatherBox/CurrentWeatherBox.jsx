import { useCurrentWeather } from '../../hooks/useCurrentWeather'
import { CurrentWeatherCard } from '../Card/CurrentWeather'
import './weatherBox.css'


export const CurrentWeatherBox = () => {
    const { currentWeather } = useCurrentWeather()

    return (
        <>
            {currentWeather &&
                <CurrentWeatherCard weatherData={currentWeather} />
            }
        </>
    )
}
