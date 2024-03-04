import { useCurrentWeather } from '../../hooks/useCurrentWeather'
import { CurrentWeatherCard } from '../Card/CurrentWeather'
import './weatherBox.css'


export const CurrentWeatherBox = () => {
    const { currentWeather, currentWeatherHasError } = useCurrentWeather()

    if (currentWeatherHasError) {
        return <h2 style={{ fontSize: 24, color: '#32e5' }}>Ocurrió un error. Intente nuevamente...</h2>
    }

    return (
        currentWeather &&
        <CurrentWeatherCard weatherData={currentWeather} />

    )
}
