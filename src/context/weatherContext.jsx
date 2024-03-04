import { createContext, useState } from "react"
import { PropTypes } from "prop-types"

export const WeatherContext = createContext()

export const WeatherProvider = ({ children }) => {
    const [selectedWeather, setSelectedWeather] = useState(null)

    const setWeather = (weatherData) => {
        setSelectedWeather(weatherData)
    }

    return <WeatherContext.Provider value={{ selectedWeather, setWeather }}>
        {children}
    </WeatherContext.Provider>
}

WeatherProvider.propTypes = {
    children: PropTypes.node
}