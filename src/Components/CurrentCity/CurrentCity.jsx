import { useCallback, useEffect, useState } from "react";
import CurrentWeatherBox from "../WeatherBox/CurrentWeatherBox";
import NextWeatherBox from "../WeatherBox/NextWeatherBox"
import { getCurrentWeather, getNextWeather } from "./services/api.mjs";
import { PropTypes } from "prop-types";

const CurrentCity = ({ updateCityName, city }) => {

    const [isLoad, setIsLoad] = useState(false);
    const [currentWeather, setCurrentWeather] = useState(null)
    const [nextWeatherData, setNexWeatherData] = useState([])

    const getCurrentWeatherData = useCallback(() => {
        getCurrentWeather(city)
            .then((data) => {
                setCurrentWeather(data)
                setIsLoad(true)
                updateCityName(data.name)
            })
        getNextWeather(city)
            .then((data) => {
                setNexWeatherData(data)
                setIsLoad(true)
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
            <NextWeatherBox nextWeatherData={nextWeatherData} changeWeatherData={handleDataChange} />
        </>
    )
}

CurrentCity.propTypes = {
    api_key: PropTypes.string,
    updateCityName: PropTypes.func,
    city: PropTypes.string
}

export default CurrentCity;