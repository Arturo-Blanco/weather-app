import { useCallback, useEffect, useState } from "react";
import CurrentWeatherBox from "../WeatherBox/CurrentWeatherBox";
import NextWeatherBox from "../WeatherBox/NextWeatherBox"
import { getCurrentWeather } from "./services/api.mjs";
import { PropTypes } from "prop-types";

const CurrentCity = ({ updateCityName, city }) => {

    const [isLoad, setIsLoad] = useState(false);
    const [currentWeather, setCurrentWeather] = useState({
        name: '',
        temp: '',
        temp_max: '',
        temp_min: '',
        feels_like: '',
        humidity: '',
        pressure: '',
        weather: '',
        datetime: '',
        timezone: '',
        description: '',
        wind: {
            deg: '',
            speed: '',
        }
    })

    const getCurrentWeatherData = useCallback(() => {
        getCurrentWeather(city)
            .then((data) => {
                setCurrentWeather(data)
                setIsLoad(true)
                updateCityName(data.name)
            })
            .catch((error) => {
                setIsLoad(true)
                console.error('Error getting weather data', + error)
            })
    }, [city, updateCityName])

    useEffect(() => {
        getCurrentWeatherData()
        const intervalId = setInterval(getCurrentWeatherData, 600000)
        return () => {
            clearInterval(intervalId)
        }
    }, [getCurrentWeatherData])

    const handleDataChange = (weatherData) => {
        setCurrentWeather(weatherData)
    }

    return (
        isLoad &&
        <>
            <CurrentWeatherBox weatherData={currentWeather} />
            <NextWeatherBox city={city} changeWeatherData={handleDataChange} />
        </>
    )
}

CurrentCity.propTypes = {
    api_key: PropTypes.string,
    updateCityName: PropTypes.func,
    city: PropTypes.string
}

export default CurrentCity;