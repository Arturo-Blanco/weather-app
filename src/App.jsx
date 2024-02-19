import SearchCity from './Components/SearchCity/SearchCity';
import CurrentCity from './Components/CurrentCity/CurrentCity';
import { useState } from 'react';
import './App.css'

const api_key = '171bc2dd50730a8c755075f662756bfb';


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
      <SearchCity api_key={api_key} onCityChange={handleCityChange} />
      <div className='home-text-container'>
      <p className='home-text'> Clima actual en: {<span className="city-name">{cityName}</span>}</p>
      </div>
      <CurrentCity api_key={api_key} updateCityName={updateCityName} city={city}/>
    </main>

  )
}

export default App
