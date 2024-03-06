import { useContext, useState } from 'react'
import {
    assignWeatherIcon,
    capitalizeFirstLetter,
    degToCardinal,
    changeTempUnit,
    getLocalHour,
} from '../../services/functions.mjs'
import { PropTypes } from 'prop-types'
import { WeatherContext } from '../../context/weatherContext'
import './currentWeather.css'

export const CurrentWeatherCard = ({ weatherData }) => {

    const { selectedWeather, setWeather } = useContext(WeatherContext)
    const [fahrenheitTemp, setFahrenheitTemp] = useState(false)
    const weatherToShow = selectedWeather ? selectedWeather : weatherData
    const getDate = weatherToShow && getLocalHour(weatherToShow.datetime, weatherToShow.timezone)

    const showCurrentWeather = () => {
        setWeather(null)
    }

    return (
        weatherToShow &&
        <section className='current-weather-box'>
            <div className='show-current-weather-div'>
                {selectedWeather &&
                    <button className='show-current-weather-btn' onClick={showCurrentWeather}>Now</button>
                }
            </div>
            <section className='current-weather-information'>
                <article className='current-weather-div'>
                    <div className='current-weather-img-div'>
                        <img className="current-weather-img" src={assignWeatherIcon(weatherToShow.weather, weatherToShow.description, getDate.hour)} alt="" />
                    </div>
                    <div className='current-weather-temp-div'>
                        <span className='current-weather-temp-unit'>{!fahrenheitTemp ? weatherToShow.temp : changeTempUnit(weatherToShow.temp)}</span>
                        <div className='units-container'>
                            <span className={`celsius-unit ${!fahrenheitTemp ? 'active' : null}`} onClick={() => setFahrenheitTemp(null)}>°C </span>
                            <span className='units-separator'></span>
                            <span className={`fahrenheit-unit ${fahrenheitTemp ? 'active' : null}`} onClick={() => setFahrenheitTemp(true)}>°F</span>
                        </div>
                    </div>
                    <div className='current-weather-temp-group'>
                        <span>Feels like: {!fahrenheitTemp ? weatherToShow.feels_like + '°C' : changeTempUnit(weatherToShow.feels_like) + '°F'}</span>
                        <span>Max: {!fahrenheitTemp ? weatherToShow.temp_max + '°C' : changeTempUnit(weatherToShow.temp_max) + '°F'}</span>
                        <span>Min: {!fahrenheitTemp ? weatherToShow.temp_min + '°C' : changeTempUnit(weatherToShow.temp_min) + '°F'}</span>
                        <span>Humidity: {weatherToShow.humidity}%</span>
                    </div>
                </article>
                <article className='current-weather-description'>
                    <span className='day'> {getDate.day}</span>
                    <span className='hour'>{getDate.hour}</span>
                    <span>Pressure: {weatherToShow.pressure}</span>
                    <span>{capitalizeFirstLetter(weatherToShow.description)}</span>
                    <span>Wind at: {weatherToShow.wind.speed}km/h</span>
                    <span>Direction: {degToCardinal(weatherToShow.wind.deg)}</span>
                </article>
            </section>
        </section>
    )
}

CurrentWeatherCard.propTypes = {
    weatherData: PropTypes.object
}