const base_url = 'https://api.openweathermap.org/data/2.5/'
const api_key = import.meta.env.VITE_API_KEY

/**
 * function that returns the current weather of the current city or the one being consulted
 * @param {string} currentLocation  current location obtained from navigator.geolocation
 * @param {string} city    city to search weather information
 * @returns {array} array of object containing current weather
 */
export const getCurrentWeather = async (latitude, longitude, cityName) => {

    let url = ''
    try {
        if (cityName) {
            url = `${base_url}weather?q=${cityName}&appid=${api_key}&units=metric`
        }
        else if (!cityName && latitude && longitude) {
            url = `${base_url}weather?lat=${latitude}&lon=${longitude}&appid=${api_key}&units=metric`
        }
        const response = await fetch(url)
        const data = await handleResponse(response)
        const weatherForecast = getWeatherData(null, data)

        return weatherForecast
    } catch (error) {
        throw new Error('Error fetching weather data', error)
    }
}

/**
 * function that returns the city weather in a 3 hour interval 
 * @param {string} city    city to search weather information
 * @returns {array} array of objects containing upcoming weather predictions
 */
export const getNextWeather = async (latitude, longitude, cityName) => {

    let url = ''
    try {
        if (cityName) {
            url = `${base_url}forecast?q=${cityName}&appid=${api_key}&units=metric`
        }
        else if (!cityName && latitude && longitude) {
            url = `${base_url}forecast?lat=${latitude}&lon=${longitude}&appid=${api_key}&units=metric`
        }

        const response = await fetch(url)
        const data = await handleResponse(response)

        const weatherForecast = data.list.slice(0, 8).map(element => {
            return getWeatherData(data.city, element)
        })

        return weatherForecast
    } catch (error) {
        throw new Error('Error fetching weather data', error)
    }
}

export const getPosition = async () => {
    try {
        return await new Promise((resolve, reject) => {
            navigator.geolocation.getCurrentPosition(resolve, reject)
        })
    } catch (error) {
        throw new Error('Error getting geolocation', error)
    }
}

const handleResponse = response => {
    if (!response.ok) {
        throw new Error('Network response was not ok')
    }
    return response.json()
}

const getWeatherData = (city, data) => {

    return {
        name: city ? city.name : data.name,
        temp: Math.round(data.main.temp),
        temp_max: Math.round(data.main.temp_max),
        temp_min: Math.round(data.main.temp_min),
        feels_like: Math.round(data.main.feels_like),
        humidity: data.main.humidity,
        pressure: data.main.pressure,
        weather: data.weather[0].main,
        description: data.weather[0].description,
        datetime: data.dt,
        timezone: city ? city.timezone : data.timezone,
        wind: {
            deg: data.wind.deg,
            speed: data.wind.speed,
        }
    }
}