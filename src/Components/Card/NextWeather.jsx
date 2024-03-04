import { useContext } from 'react'
import { assignWeatherIcon, convertDate, getLocalHour } from '../../services/functions.mjs'
import { PropTypes } from 'prop-types'
import { WeatherContext } from '../../hooks/weatherContext'

export const NextWeatherCard = ({ weatherData }) => {

    const { setWeather } = useContext(WeatherContext)

    const handleClick = (data) => {
        setWeather(data)
    }

    return (
        <article className="next-weather-card" onClick={() => handleClick(weatherData)}>
            <p className='date-text'>{convertDate(weatherData.datetime, weatherData.timezone)}</p>
            <p className='hour-text'>{getLocalHour(weatherData.datetime, weatherData.timezone)}</p>
            <div className='next-weather-div-img'>
                <img className='next-weather-img' src={assignWeatherIcon(weatherData.weather, weatherData.description, getLocalHour(weatherData.datetime, weatherData.timezone))} alt="" />
            </div>
            <div className='temp-container'>
                <span className='temp-max'>{weatherData.temp_max}°</span>
                <span className='temp-min'>{weatherData.temp_min}°</span>
            </div>
        </article>
    )
}

NextWeatherCard.propTypes = {
    weatherData: PropTypes.object.isRequired,
}