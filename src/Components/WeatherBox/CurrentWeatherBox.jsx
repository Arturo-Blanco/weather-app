import { Meta, Title } from 'react-head'
import { useCurrentWeather } from '../../hooks/useCurrentWeather'
import { CurrentWeatherCard } from '../Card/CurrentWeather'
import './weatherBox.css'



export const CurrentWeatherBox = () => {
    const { currentWeather, currentCityName } = useCurrentWeather()

    return (
        (currentWeather && currentCityName) &&
        <>
            <Title>{`Weather Now in ${currentCityName || ''}`}</Title>
            <Meta name="description" content={`Explore real-time weather conditions in ${currentCityName || ''}. Your go-to application for up-to-date weather information.`} />
            <CurrentWeatherCard weatherData={currentWeather} />
        </>
    )
}
