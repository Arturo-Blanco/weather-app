import { assignWeatherIcon, convertDate, getLocalHour } from '../CurrentCity/services/functions.mjs'
import PropTypes from 'prop-types'
import './weatherBox.css'

const NextWeatherBox = ({ nextWeatherData, changeWeatherData }) => {

    return (
        <section className='next-weather-card-container'>
            <div className='div-articles'>
                {nextWeatherData.map((value, index) => (
                    <article className="next-weather-card" key={index} onClick={() => changeWeatherData(value)}>
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
    changeWeatherData: PropTypes.func,
    nextWeatherData: PropTypes.array
}


export default NextWeatherBox