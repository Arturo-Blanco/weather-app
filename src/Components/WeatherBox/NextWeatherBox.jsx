/* eslint-disable react/prop-types */
import { asignIconWeather } from '../CurrentCity/services/functions.mjs';
import { getHour } from '../CurrentCity/services/functions.mjs';
import { convertDate } from '../CurrentCity/services/functions.mjs';

import './weatherBox.css';

const NextWeatherBox = ({ weatherData , changeWeatherData}) => {

    return (
        <section className='next-weather-card-container'>
            <div className='div-articles'>
                {weatherData.map((value, index) => (
                    <article className="next-weather-card" key={index} onClick={() => changeWeatherData(value)}>
                        <p className='hour-text'>{getHour(value.date)}</p>
                        <p className='date-text'>{convertDate(value.date)}</p>
                        <div className='next-weather-div-img'>
                            <img className='next-weather-img' src={asignIconWeather(value.weather, value.description, getHour(value.date))} alt="" />
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
export default NextWeatherBox