import {iconWeathersDay, iconWeathersNight } from "./iconWeathersPaths.mjs"

/**
 *  function to convert degrees to a cardinal direction
 * @param {number} degress 
 * @returns {string} a cardinal direction
 */
export const degToCardinal = (degress) => {
    let direction = ""
    if (0 <= degress < 22.5 || degress >= 337.5)
        direction = "N"
    else if (22.5 <= degress < 67.5)
        direction = "E"
    else if (112.5 <= degress < 157.5)
        direction = "SE"
    else if (157.5 <= degress < 202.5)
        direction = "S"
    else if (202.5 <= degress < 247.5)
        direction = "SO"
    else if (247.5 <= degress < 292.5)
        direction = "O"
    else if (292.5 <= degress < 337.5)
        direction = "NO"
    return direction
}
/**
 * function to convert first letter of string to uppercase
 * @param {string} string 
 * @returns {string} string with the first letter to uppercase
 */
export const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

/** 
 * function that returns the local time of the last weather measurement
 * @param {number } datetime - timestamp in Unix 
 * @param {number} timezone - time offset in seconds
 * @returns {string} local hour time of the last measurement in HH:mm
*/
export const getLocalHour = (datetime, timezone) => {
    const date = new Date(datetime * 1000 + timezone * 1000);
    const hours = date.getHours() + 3;
    const minutes = date.getMinutes();
    const formattedMinutes = minutes < 10 ? `0${minutes}` : `${minutes}`
    return `${hours}:${formattedMinutes}`
}


/** function to convert °C to °F 
 * @param {number} centigrades - value in centigrades
 * @returns {number} conversion to °F
*/
export const changeTempUnit = (value) => {
    const celsiusToFahrenheit = Math.round((value * 9 / 5) + 32)
    return celsiusToFahrenheit
}

/**
 * function to search for the corresponding icon according to the weather 
 * @param {string} weather weather type
 * @param {string} description weather description 
 * @param {string} hour to verify if day or night
 * @returns {string} string with the corresponding image address according weather, description and hour
 */
export const asignIconWeather = (weather, description, hour) => {
    const formattedWeather = weather.toLowerCase();
    const formattedDescription = description.replace(/\s+/g, '_');
    if (hour > '19:00' || hour < '06:00'){
        return iconWeathersNight[formattedWeather][formattedDescription]
    }
    return iconWeathersDay[formattedWeather][formattedDescription];
}

/**
 * function to convert full date to short string weekday 
 * @param {string} newDate date in full format
 * @returns {string} day of the week in short string in Spanish conversion
 */
export const convertDate = (newDate) => {
    const date = new Date(newDate).toLocaleDateString('es-ES', { weekday: 'short' })
    return date
}

/**
 * function to splice hour to full date
 * @param {string} newDate date in full format 
 * @returns {string} hour in HH:mm format
 */
export const getHour = (newDate) => {
    const hour = newDate.split(' ')
    return hour[1].slice(0, -3)
}