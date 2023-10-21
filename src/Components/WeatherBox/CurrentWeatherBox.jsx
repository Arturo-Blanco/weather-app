/* eslint-disable react/prop-types */
import { useState } from 'react';
import { asignIconWeather, capitalizeFirstLetter, convertDate, degToCardinal, getHour } from '../CurrentCity/services/functions.mjs';
import { getLocalHour } from '../CurrentCity/services/functions.mjs';
import { changeTempUnit } from '../CurrentCity/services/functions.mjs';
import './weatherBox.css'

function WeatherBox({ weatherData }) {

    const [fahrenheitTemp, setFahrenheitTemp] = useState(false)

    const { temp, temp_max, temp_min, feels_like, humidity, pressure, weather, description, wind, datetime, timezone, date } = weatherData

    return (
        <section className='weather-box'>
            <div className='main-div'>
                <div className='img-div'>
                    <img className="weather-img" src={asignIconWeather(weather,description, getLocalHour(datetime,timezone))} alt="" />
                </div>
                <div className='main-temp'>
                    <span className='temp'>{!fahrenheitTemp ? temp : changeTempUnit(temp)}</span>
                    <div className='units-container'>
                        <span className={`celsius-unit ${!fahrenheitTemp ? 'active' : null}`} onClick={() => setFahrenheitTemp(null)}>°C </span>
                        <span className='separator'></span>
                        <span className={`fahrenheit-unit ${fahrenheitTemp ? 'active' : null}`} onClick={() => setFahrenheitTemp(true)}>°F</span>
                    </div>
                </div>
                <div className='temp-group'>
                    <span>Sensación térmica: {!fahrenheitTemp ? feels_like + '°C' : changeTempUnit(feels_like) + '°F'}</span>
                    <span>Max: {!fahrenheitTemp ? temp_max + '°C' : changeTempUnit(temp_max) + '°F'}</span>
                    <span>Min: {!fahrenheitTemp ? temp_min + '°C' : changeTempUnit(temp_min) + '°F'}</span>
                    <span>Humedad: {humidity}%</span>
                </div>
            </div>
            <div className='description-group'>
                <span className='hour'>{!date ? getLocalHour(datetime, timezone) : `${convertDate(date)} ${getHour(date)}` }</span>
                <span>Presión: {pressure}</span>
                <span>{capitalizeFirstLetter(description)}</span>
                <span>Viento a: {wind.speed}km/h</span>
                <span>Dirección: {degToCardinal(wind.deg)}</span>
            </div>
        </section>
    );
}

export default WeatherBox;