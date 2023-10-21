/* eslint-disable react/prop-types */
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import { useState } from 'react';
import './searchCity.css'


function SearchCity({ onCityChange }) {

    const [city, setCity] = useState(null);

    const hanledInputChange = (event) => {
        setCity(event.target.value)
    }

    const handleClick = () => {
        onCityChange(city)
    }

    return (
        <>
            <FloatingLabel
                controlId="floatingInput"
                label="Buscar ubicación"
                className="mb-3"
            >
                <Form.Control type="text" placeholder="Ingrese ciudad" onChange={hanledInputChange} />
            </FloatingLabel>
            <Button variant="primary" type="button" onClick={handleClick}>
                Buscar
            </Button>
        </>
    );
}

export default SearchCity;