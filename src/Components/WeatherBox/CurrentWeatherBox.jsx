import { useWeather } from '../../hooks/useWeather'
import { CurrentWeatherCard } from '../Card/CurrentWeather'
import { NextWeatherBox } from './NextWeatherBox'
import { WeatherProvider } from '../../hooks/weatherContext'
import './weatherBox.css'

export const CurrentWeatherBox = () => {
    const { currentWeather, isLoading, nextWeatherData, hasError } = useWeather()

    if (hasError) {
        return <h2 style={{ fontSize: 24, color: '#32e5' }}>Ocurrió un error. Intente nuevamente...</h2>
    }

    return (
        <WeatherProvider>
            <CurrentWeatherCard displayWeather={currentWeather} />
            {isLoading ? (
                <h2 style={{ fontSize: 24, color: '#ffff' }}>Cargando clima extendido...</h2>
            ) : (
                nextWeatherData && <NextWeatherBox />
            )}
        </WeatherProvider>
    )
}
