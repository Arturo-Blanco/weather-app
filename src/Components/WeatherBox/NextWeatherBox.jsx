import { useWeather } from '../../hooks/useWeather'
import { NextWeatherCard } from '../Card/NextWeather'
import './weatherBox.css'

export const NextWeatherBox = () => {

    const { nextWeatherData } = useWeather()

    return (
        <section className='next-weather-card-container'>
            <div className='div-articles'>
                {nextWeatherData && nextWeatherData.map((value, index) => (
                    < NextWeatherCard key={index} weatherData={value} />)
                )}
            </div>
        </section>
    )
}