import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import FloatingLabel from 'react-bootstrap/FloatingLabel'
import { useState } from 'react'
import { useWeather } from '../../hooks/useWeather'
import './searchCity.css'

export const SearchCity = () =>  {

    const [city, setCity] = useState(null)
    const { setCityName } = useWeather()

    const hanledInputChange = (event) => {
        setCity(event.target.value)
    }

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
                <Form.Control type="text" placeholder="Type city" onChange={hanledInputChange} />
            </FloatingLabel>
            <Button variant="primary" type="button" onClick={handleClick}>
                Buscar
            </Button>
        </>
    )
}