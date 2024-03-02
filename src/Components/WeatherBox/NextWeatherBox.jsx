import  { useState, useCallback, useEffect } from 'react'
import { asignIconWeather, convertDate, getLocalHour } from '../CurrentCity/services/functions.mjs'
import { getNextWeather } from '../CurrentCity/services/api.mjs'
import PropTypes from 'prop-types'
import './weatherBox.css'

const NextWeatherBox = ({ city, changeWeatherData }) => {

    const [nextWeather, setNextWeather] = useState([])
    
    const getNextWeatherData = useCallback(() => {
        getNextWeather(city)
            .then((data) => {
                setNextWeather(data)
            })
            .catch((error) => {
                console.error('Error getting weather data', + error)
            });
    }, [city])

    useEffect(() => {
        getNextWeatherData();
        const intervalId = setInterval(getNextWeatherData, 600000)
        return () => {
            clearInterval(intervalId)
        }
    }, [getNextWeatherData])

    return (
        <section className='next-weather-card-container'>
            <div className='div-articles'>
                {nextWeather.map((value, index) => (
                    <article className="next-weather-card" key={index} onClick={() => changeWeatherData(value)}>
                        <p className='date-text'>{convertDate(value.datetime, value.timezone)}</p>
                        <p className='hour-text'>{getLocalHour(value.datetime, value.timezone)}</p>
                        <div className='next-weather-div-img'>
                            <img className='next-weather-img' src={asignIconWeather(value.weather, value.description, getLocalHour(value.datetime, value.timezone))} alt="" />
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
    city: PropTypes.string
}


export default NextWeatherBox