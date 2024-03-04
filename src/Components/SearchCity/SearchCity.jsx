import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import FloatingLabel from 'react-bootstrap/FloatingLabel'
import { useContext, useState } from 'react'
import { useCurrentWeather } from '../../hooks/useCurrentWeather'
import './searchCity.css'
import { CityContext } from '../../context/cityContext'

export const SearchCity = () => {

    const [city, setCity] = useState('')
    const { setCityName } = useContext(CityContext)

    const handleClick = () => {
        setCityName(city)
    }

    return (
        <>
            <FloatingLabel
                controlId="floatingInput"
                label="Search location"
                className="mb-3"
            >
                <Form.Control type="text" placeholder="Type city" onChange={event => setCity(event.target.value)} />
            </FloatingLabel>
            <Button variant="primary" type="button" onClick={handleClick}>
                Buscar
            </Button>
        </>
    )
}