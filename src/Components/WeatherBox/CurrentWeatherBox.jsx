import { useState } from 'react'
import {
    assignWeatherIcon,
    capitalizeFirstLetter,
    degToCardinal,
    changeTempUnit,
    getLocalHour,
} from '../../services/functions.mjs'
import { useWeather } from '../../hooks/useWeather'
import { PropTypes } from 'prop-types'
import './weatherBox.css'

export const CurrentWeatherBox = ({ weatherData }) => {

    const [fahrenheitTemp, setFahrenheitTemp] = useState(false)
    const { currentWeather, isLoading } = useWeather()
    const displayWeather = weatherData ? weatherData : currentWeather

    return (
        (displayWeather && !isLoading) ?
            <section className='weather-box'>
                <div className='main-div'>
                    <div className='img-div'>
                        <img className="weather-img" src={assignWeatherIcon(displayWeather.weather, displayWeather.description, getLocalHour(displayWeather.datetime, displayWeather.timezone))} alt="" />
                    </div>
                    <div className='main-temp'>
                        <span className='temp'>{!fahrenheitTemp ? displayWeather.temp : changeTempUnit(displayWeather.temp)}</span>
                        <div className='units-container'>
                            <span className={`celsius-unit ${!fahrenheitTemp ? 'active' : null}`} onClick={() => setFahrenheitTemp(null)}>°C </span>
                            <span className='separator'></span>
                            <span className={`fahrenheit-unit ${fahrenheitTemp ? 'active' : null}`} onClick={() => setFahrenheitTemp(true)}>°F</span>
                        </div>
                    </div>
                    <div className='temp-group'>
                        <span>Feels like: {!fahrenheitTemp ? displayWeather.feels_like + '°C' : changeTempUnit(displayWeather.feels_like) + '°F'}</span>
                        <span>Max: {!fahrenheitTemp ? displayWeather.temp_max + '°C' : changeTempUnit(displayWeather.temp_max) + '°F'}</span>
                        <span>Min: {!fahrenheitTemp ? displayWeather.temp_min + '°C' : changeTempUnit(displayWeather.temp_min) + '°F'}</span>
                        <span>Humidity: {displayWeather.humidity}%</span>
                    </div>
                </div>
                <div className='description-group'>
                    <span className='hour'>{getLocalHour(displayWeather.datetime, displayWeather.timezone)}</span>
                    <span>Pressure: {displayWeather.pressure}</span>
                    <span>{capitalizeFirstLetter(displayWeather.description)}</span>
                    <span>Wind at: {displayWeather.wind.speed}km/h</span>
                    <span>Direction: {degToCardinal(displayWeather.wind.deg)}</span>
                </div>
            </section>
            : null
    )
}

CurrentWeatherBox.propTypes = {
    weatherData : PropTypes.object
}