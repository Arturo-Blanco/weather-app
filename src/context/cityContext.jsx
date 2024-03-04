import { createContext, useState } from "react"
import { PropTypes } from "prop-types"
import { useLocation } from "../hooks/useLocation"

export const CityContext = createContext()

export const CityProvider = ({ children }) => {
    const [ cityName, setCityName ] = useState('')
    const coords = useLocation()
    
    return <CityContext.Provider value={{ coords, cityName, setCityName }}>
        {children}
    </CityContext.Provider>
}

CityProvider.propTypes = {
    children: PropTypes.node
}