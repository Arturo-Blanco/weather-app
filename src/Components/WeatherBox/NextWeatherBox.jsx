import { useParams } from 'wouter'
import { useNextWeather } from '../../hooks/useNextWeather'
import { NextWeatherCard } from '../Card/NextWeather'
import './nextWeatherBox.css'

export const NextWeatherBox = () => {
    const params = useParams()
    const { nextWeatherData, isLoading, nextWeatherHasError } = useNextWeather({ params })

    if (nextWeatherHasError) return <p className='extended-forecast-error'> Error getting data</p>

    return (
        <section className='next-weather-card-container'>
            <div className='div-articles'>
                {(nextWeatherData && !isLoading) &&
                    nextWeatherData.map((value, index) => (
                        < NextWeatherCard key={index} weatherData={value} />)
                    )}
            </div>
            {isLoading
                && <p className='extended-forecast'>
                    Loading extended forecast...</p>}
        </section>
    )
}