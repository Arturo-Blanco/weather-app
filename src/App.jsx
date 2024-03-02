import SearchCity from './Components/SearchCity/SearchCity';
import CurrentCity from './Components/CurrentCity/CurrentCity';
import { useState } from 'react';
import './App.css'

function App() {

  const [cityName, setCityName] = useState(null);
  const [city, setCity] = useState(null);

  const updateCityName = (newCityName) => {
    setCityName(newCityName)
  }

  const handleCityChange = (newCity) => {
    setCity(newCity)
  }

  return (
    <main className='container'>
      <SearchCity onCityChange={handleCityChange} />
      <div className='home-text-container'>
      <p className='home-text'> Current weather in: {<span className="city-name">{cityName}</span>}</p>
      </div>
      <CurrentCity updateCityName={updateCityName} city={city}/>
    </main>
  )
}

export default App
