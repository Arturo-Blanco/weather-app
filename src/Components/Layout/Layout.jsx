import { CurrentCity } from "../CurrentCity/CurrentCity"
import { useWeather } from "../../hooks/useWeather"

export const Layout = () => {

    const { cityName } = useWeather()

    return (
        <>
            <div className='home-text-container'>
                <p className='home-text'> Current weather in: {<span className="city-name">{cityName}</span>}</p>
            </div>
            <CurrentCity />
        </>
    )
}