import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import FloatingLabel from 'react-bootstrap/FloatingLabel'
import { useContext, useState } from 'react'
import { CityContext } from '../../context/cityContext'
import './searchCity.css'


export const SearchCity = () => {

    const [city, setCity] = useState('')
    const { setCityName } = useContext(CityContext)

    const handleInputChange = (event) => {
        setCity(event.target.value)
    }

    const handleClick = () => {
        setCityName(city)
        setCity('')
    }

    return (
        <>
            <FloatingLabel
                controlId="floatingInput"
                label="Search location"
                className="mb-3"
            >
                <Form.Control type="text" aria-label="Input to write your city" value={city} onChange={handleInputChange} />
            </FloatingLabel>
            <Button variant="primary" type="button" onClick={handleClick}>
                Buscar
            </Button>
        </>
    )
}