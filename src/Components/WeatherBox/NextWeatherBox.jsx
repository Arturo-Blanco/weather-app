import { useNextWeather } from '../../hooks/useNextWeather'
import { NextWeatherCard } from '../Card/NextWeather'
import './weatherBox.css'

export const NextWeatherBox = () => {

    const { nextWeatherData, isLoading, nextWeatherHasError } = useNextWeather()

    return (
        <section className='next-weather-card-container'>
            <div className='div-articles'>

                {(nextWeatherData && !isLoading) && nextWeatherData.map((value, index) => (
                    < NextWeatherCard key={index} weatherData={value} />
                )
                )}
            </div>
            {isLoading && <h2 style={{ color: '#fff43' }}>Cargando pronostico extendido...</h2>}
        </section>
    )
}