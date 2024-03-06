import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import { InputGroup } from 'react-bootstrap'
import { useState } from 'react'
import { useLocation } from 'wouter'
import './searchCity.css'

export const SearchCity = () => {
    const [, setLocation] = useLocation()
    const [city, setCity] = useState('')

    const handleInputChange = (event) => {
        setCity(event.target.value)
    }

    const handleClick = () => {
        setLocation(`/search/${city}`)
        setCity('')
    }

    return (
        <>
            <InputGroup className="mb-3">
                <Form.Control
                    placeholder="Search city"
                    aria-label="Input to enter the city name"
                    aria-describedby="basic-addon2"
                    onChange={handleInputChange}
                />
                <Button  id="button-addon2" onClick={handleClick}>
                    Search
                </Button>
            </InputGroup>
        </>
    )
}