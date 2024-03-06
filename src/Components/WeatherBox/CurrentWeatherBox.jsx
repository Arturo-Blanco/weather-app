import { Meta, Title } from 'react-head'
import { useCurrentWeather } from '../../hooks/useCurrentWeather'
import { CurrentWeatherCard } from '../Card/CurrentWeather'
import { useParams } from 'wouter'

export const CurrentWeatherBox = () => {
    const params = useParams()
    const { currentWeather, currentCityName } = useCurrentWeather({ params })

    return (
        (currentWeather && currentCityName) &&
        <>
            <Title>{`Weather now in ${currentCityName || ''}`}</Title>
            <Meta name="description" content={`Explore real-time weather conditions in ${currentCityName || ''}. Your go-to application for up-to-date weather information.`} />
            <CurrentWeatherCard weatherData={currentWeather} />
        </>
    )
}
