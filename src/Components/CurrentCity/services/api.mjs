const base_url = 'https://api.openweathermap.org/data/2.5/'
const api_key = import.meta.env.VITE_API_KEY

/**
 * function that returns the current weather of the current city or the one being consulted
 * @param {string} api_key key to consume the weather api
 * @param {string} city    city to search weather information
 * @returns {array} array of object containing current weather
 */
export const getCurrentWeather = async city => {
    let url = ''
    try {
        if (!city) {
            const position = await getPosition();
            url = `${base_url}weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${api_key}&units=metric`
        } else {
            url = `${base_url}weather?q=${city}&appid=${api_key}&units=metric`
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
 * @param {string} api_key key to consume the weather api
 * @param {string} city    city to search weather information
 * @returns {array} array of objects containing upcoming weather predictions
 */
export const getNextWeather = async city => {
    let url = ''
    try {
        if (!city) {
            const position = await getPosition()
            url = `${base_url}forecast?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${api_key}&units=metric`
        } else {
            url = `${base_url}forecast?q=${city}&appid=${api_key}&units=metric`
        }

        const response = await fetch(url)
        const data = await handleResponse(response)
       
        const weatherForecast = data.list.slice(0,8).map(element => {
            return getWeatherData(data.city , element)
        })
        
        return weatherForecast
    } catch (error) {
        throw new Error('Error fetching weather data', error)
    }
}

const getPosition = async () => {
    try {
        return await new Promise((resolve, reject) => {
            navigator.geolocation.getCurrentPosition(resolve, reject)
        });
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

const getWeatherData =  (city, data) => {
    
    return {
        name : city ? city.name : data.name,
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