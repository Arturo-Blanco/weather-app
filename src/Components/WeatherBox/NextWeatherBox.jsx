import { assignWeatherIcon, convertDate, getLocalHour } from '../../services/functions.mjs'
import { useWeather } from '../../hooks/useWeather'
import { PropTypes } from 'prop-types'
import './weatherBox.css'

export const NextWeatherBox = ({ handleDataChange }) => {

    const { nextWeatherData } = useWeather()

    return (
        <section className='next-weather-card-container'>
            <div className='div-articles'>
                {nextWeatherData && nextWeatherData.map((value, index) => (
                    <article className="next-weather-card" key={index} onClick={() => handleDataChange(value)}>
                        <p className='date-text'>{convertDate(value.datetime, value.timezone)}</p>
                        <p className='hour-text'>{getLocalHour(value.datetime, value.timezone)}</p>
                        <div className='next-weather-div-img'>
                            <img className='next-weather-img' src={assignWeatherIcon(value.weather, value.description, getLocalHour(value.datetime, value.timezone))} alt="" />
                        </div>
                        <div className='temp-container'>
                            <span className='temp-max'>{value.temp_max}°</span>
                            <span className='temp-min'>{value.temp_min}°</span>
                        </div>
                    </article>
                ))}
            </div>
        </section>
    )
}

NextWeatherBox.propTypes = {
    handleDataChange : PropTypes.func
}