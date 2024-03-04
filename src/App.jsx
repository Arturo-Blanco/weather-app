import { Layout } from './Components/Layout/Layout'
import { SearchCity } from './Components/SearchCity/SearchCity'
import { CityProvider } from './context/cityContext'
import './App.css'


function App() {

  return (
    <CityProvider>
      <main className='container'>
        <SearchCity />
        <Layout />
      </main>
    </CityProvider>
  )
}

export default App
