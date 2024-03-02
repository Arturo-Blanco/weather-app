import PropTypes from 'prop-types';
import { useState } from 'react';
import {
    assignWeatherIcon,
    capitalizeFirstLetter,
    degToCardinal,
    changeTempUnit,
    getLocalHour,
} from '../CurrentCity/services/functions.mjs';
import './weatherBox.css';

const WeatherBox = ({ weatherData }) => {

    const [fahrenheitTemp, setFahrenheitTemp] = useState(false);

    const { temp, temp_max, temp_min, feels_like, humidity, pressure, weather, description, wind, datetime, timezone } = weatherData;

    return (
        <section className='weather-box'>
            <div className='main-div'>
                <div className='img-div'>
                    <img className="weather-img" src={assignWeatherIcon(weather, description, getLocalHour(datetime, timezone))} alt="" />
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
                    <span>Feels like: {!fahrenheitTemp ? feels_like + '°C' : changeTempUnit(feels_like) + '°F'}</span>
                    <span>Max: {!fahrenheitTemp ? temp_max + '°C' : changeTempUnit(temp_max) + '°F'}</span>
                    <span>Min: {!fahrenheitTemp ? temp_min + '°C' : changeTempUnit(temp_min) + '°F'}</span>
                    <span>Humidity: {humidity}%</span>
                </div>
            </div>
            <div className='description-group'>
                <span className='hour'>{getLocalHour(datetime, timezone)}</span>
                <span>Pressure: {pressure}</span>
                <span>{capitalizeFirstLetter(description)}</span>
                <span>Wind at: {wind.speed}km/h</span>
                <span>Direction: {degToCardinal(wind.deg)}</span>
            </div>
        </section>
    );
};

WeatherBox.propTypes = {
    weatherData: PropTypes.object
};

export default WeatherBox;
