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

export const CurrentWeatherCard = ({ weatherData }) => {

    const { selectedWeather } = useContext(WeatherContext)
    const [fahrenheitTemp, setFahrenheitTemp] = useState(false)
    const weatherToShow = selectedWeather ? selectedWeather : weatherData

    return (
        weatherToShow && 
        <section className='weather-box'>
            <div className='main-div'>
                <div className='img-div'>
                    <img className="weather-img" src={assignWeatherIcon(weatherToShow.weather, weatherToShow.description, getLocalHour(weatherToShow.datetime, weatherToShow.timezone))} alt="" />
                </div>
                <div className='main-temp'>
                    <span className='temp'>{!fahrenheitTemp ? weatherToShow.temp : changeTempUnit(weatherToShow.temp)}</span>
                    <div className='units-container'>
                        <span className={`celsius-unit ${!fahrenheitTemp ? 'active' : null}`} onClick={() => setFahrenheitTemp(null)}>°C </span>
                        <span className='separator'></span>
                        <span className={`fahrenheit-unit ${fahrenheitTemp ? 'active' : null}`} onClick={() => setFahrenheitTemp(true)}>°F</span>
                    </div>
                </div>
                <div className='temp-group'>
                    <span>Feels like: {!fahrenheitTemp ? weatherToShow.feels_like + '°C' : changeTempUnit(weatherToShow.feels_like) + '°F'}</span>
                    <span>Max: {!fahrenheitTemp ? weatherToShow.temp_max + '°C' : changeTempUnit(weatherToShow.temp_max) + '°F'}</span>
                    <span>Min: {!fahrenheitTemp ? weatherToShow.temp_min + '°C' : changeTempUnit(weatherToShow.temp_min) + '°F'}</span>
                    <span>Humidity: {weatherToShow.humidity}%</span>
                </div>
            </div>
            <div className='description-group'>
                <span className='hour'>{getLocalHour(weatherToShow.datetime, weatherToShow.timezone)}</span>
                <span>Pressure: {weatherToShow.pressure}</span>
                <span>{capitalizeFirstLetter(weatherToShow.description)}</span>
                <span>Wind at: {weatherToShow.wind.speed}km/h</span>
                <span>Direction: {degToCardinal(weatherToShow.wind.deg)}</span>
            </div>
        </section>
    )
}

CurrentWeatherCard.propTypes = {
    weatherData: PropTypes.object
}