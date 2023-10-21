const base_url = 'https://api.openweathermap.org/data/2.5/'

/**
 * function that returns the current weather of the current city or the one being consulted
 * @param {string} api_key key to consume the weather api
 * @param {string} city    city to search weather information
 * @returns {array} array of object containing current weather
 */
export const getCurrentWeather = async (api_key, city) => {
    let url;
    if (!city) {
        try {
            const position = await new Promise((resolve, reject) => {
                navigator.geolocation.getCurrentPosition(resolve, reject);
            });
            url = `${base_url}weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${api_key}&units=metric`;
        } catch (error) {
            console.error('Error getting geolocation', error);
        }
    } else {
        url = `${base_url}weather?q=${city}&appid=${api_key}&units=metric`;
    }

    return fetch(url)
        .then((response) => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then((data) => {
            return {
                name: data.name,
                temp: Math.round(data.main.temp),
                temp_max: Math.round(data.main.temp_max),
                temp_min: Math.round(data.main.temp_min),
                feels_like: Math.round(data.main.feels_like),
                humidity: data.main.humidity,
                pressure: data.main.pressure,
                weather: data.weather[0].main,
                description: data.weather[0].description,
                datetime : data.dt,
                timezone : data.timezone,
                wind: {
                    deg: data.wind.deg,
                    speed: data.wind.speed,
                },
            };
        });
}

/**
 * function that returns the city weather in a 3 hour interval 
 * @param {string} api_key key to consume the weather api
 * @param {string} city    city to search weather information
 * @returns {array} array of objects containing upcoming weather predictions
 */
export const getNextWeather = async (api_key, city) => {
    let url;
    if (!city) {
        try {
            const position = await new Promise((resolve, reject) => {
                navigator.geolocation.getCurrentPosition(resolve, reject);
            });
            url = `${base_url}forecast?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${api_key}&units=metric`;
        } catch (error) {
            console.error('Error getting geolocation', error);
        }
    } else {
        url = `${base_url}forecast?q=${city}&appid=${api_key}&units=metric`;
    }

    return fetch(url)
        .then((response) => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then((data) => {
            const weatherDate = data.list.map((element) => ({
                name: data.city.name,
                temp: Math.round(element.main.temp),
                temp_max: Math.round(element.main.temp_max),
                temp_min: Math.round(element.main.temp_min),
                feels_like: Math.round(element.main.feels_like),
                humidity: element.main.humidity,
                pressure: element.main.pressure,
                weather: element.weather[0].main,
                description: element.weather[0].description,
                date: element.dt_txt,
                wind: {
                    deg: element.wind.deg,
                    speed: element.wind.speed,
                },
            }))
            return weatherDate.slice(0,8);
        })
}

