import { assignWeatherIcon, getLocalHour } from '../../services/functions.mjs'
import { PropTypes } from 'prop-types'
import { WeatherContext } from '../../context/weatherContext'
import { useContext } from 'react'

export const NextWeatherCard = ({ weatherData }) => {

    const { setWeather } = useContext(WeatherContext)
    const getDate = weatherData && getLocalHour(weatherData.datetime, weatherData.timezone)

    const handleClick = (data) => {
        setWeather(data)
    }

    return (
        <article className="next-weather-card" onClick={() => handleClick(weatherData)}>
            <span className='hour-text'>{getDate.hour}</span>
            <span className='day-text'>{getDate.day}</span>
            <div className='next-weather-div-img'>
                <img className='next-weather-img' src={assignWeatherIcon(weatherData.weather, weatherData.description, getDate.hour)} alt="" />
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