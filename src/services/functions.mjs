import { iconWeathersDay, iconWeathersNight } from "./iconWeathersPaths.mjs"
import { DateTime } from "luxon"

/**
 *  function to convert degrees to a cardinal direction
 * @param {number} degress 
 * @returns {string} a cardinal direction
 */
export const degToCardinal = degress => {
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
export const capitalizeFirstLetter = string => {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

/** 
 * function that returns the local time of the last weather measurement
 * @param {number } datetime - timestamp in Unix 
 * @param {number} timezone - time offset in seconds
 * @returns {string} local hour time of the last measurement in HH:mm
*/
export const getLocalHour = (datetime, timezone) => {
    const timestampInMiliseconds = datetime * 1000
    const date = DateTime.fromMillis(timestampInMiliseconds).setZone(timezone / 60).setLocale('en')
    const hour = date.toLocaleString({
        hour: 'numeric',
        minute: 'numeric',
        hourCycle: 'h12'
    })
    const day = date.toLocaleString({
        weekday: 'short'
    })
    return { hour, day }
}

/** function to convert °C to °F 
 * @param {number} centigrades - value in centigrades
 * @returns {number} conversion to °F
*/
export const changeTempUnit = value => {
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
export const assignWeatherIcon = (weather, description, hour) => {
    const formattedWeather = weather.toLowerCase()
    const formattedHour = parseHour(hour)
    const formattedDescription = description.replace(/\s+/g, '_')
    return formattedHour ? iconWeathersDay[formattedWeather][formattedDescription] :
        iconWeathersNight[formattedWeather][formattedDescription]
}

/**
 * function to convert the format from 12h to 24h and check if it is night
 * @param {string} date date in am/pm format
 * @returns {boolean} true if it is nigth and false if it is not
 */
const parseHour = (date) => {
    const parseDate = DateTime.fromFormat(date, 'h:mm a', { locale: 'en-US' })
    const hour24 = parseDate.toFormat('HH:mm')
    return hour24 >= '06:00' && hour24 < '18:00'
}