import CurrentWeatherBox from "../WeatherBox/CurrentWeatherBox";
import NextWeatherBox from "../WeatherBox/NextWeatherBox"
import { useCallback, useEffect, useState } from "react";
import { getCurrentWeather, getNextWeather } from "./services/api.mjs";
import { PropTypes } from "prop-types";

const CurrentCity = ({ api_key, updateCityName, city }) => {

    const [isLoad, setIsLoad] = useState(false);
    const [nextWeather, setNextWeather] = useState([]);
    const [currentWeather, setCurrentWeather] = useState({
        name: '',
        temp: '',
        temp_max: '',
        temp_min: '',
        feels_like: '',
        humidity: '',
        pressure: '',
        weather: '',
        description: '',
        wind: {
            deg: '',
            speed: '',
        },
    });
    
    const fetchCurrentWeatherData = useCallback(() => {
        getCurrentWeather(api_key, city)
            .then((data) => {
                setCurrentWeather(data);
                setIsLoad(true);
                updateCityName(data.name);
            })
            .catch((error) => {
                console.error('Error getting weather data', + error);
            });
    }, [api_key, city, updateCityName])


    const fetchNextWeatherData = useCallback(() => {
        getNextWeather(api_key, city)
            .then((data) => {
                setNextWeather(data)
            })
            .catch((error) => {
                console.error('Error getting weather data', + error);
            });
    }, [api_key, city])

    useEffect(() => {
        fetchCurrentWeatherData();
        fetchNextWeatherData();
        const intervalId = setInterval(fetchCurrentWeatherData, 600000);
        return () => {
            clearInterval(intervalId)
        }
    }, [fetchCurrentWeatherData, fetchNextWeatherData])

    const handleDataChange = (weatherData) => {
        setCurrentWeather(weatherData)
    }

    return (
        isLoad &&
        <>
            <CurrentWeatherBox weatherData={currentWeather} />
            <NextWeatherBox weatherData={nextWeather} changeWeatherData={handleDataChange} />
        </>

    )
}

CurrentCity.propTypes = {
    api_key : PropTypes.string,
    updateCityName : PropTypes.func,
    city : PropTypes.object
}
export default CurrentCity;