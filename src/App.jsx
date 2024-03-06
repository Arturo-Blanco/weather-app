import { Layout } from './Components/Layout/Layout'
import { CityProvider } from './context/cityContext'
import { HeadProvider, Title, Meta } from 'react-head'
import { Route, Switch } from 'wouter'
import { NotFound } from './Components/NotFound/NotFound'
import './App.css'


function App() {

  return (
    <HeadProvider>
      <Title>{'Weather Now'}</Title>
      <Meta name="description" content={`Explore real-time weather conditions. Your go-to application for up-to-date weather information.`} />
      <CityProvider>
        <Switch>
          <Route path={'/location'} component={Layout} >{(params) => console.log(params.city)} </Route>
          <Route component={NotFound} />
        </Switch>
      </CityProvider>
    </HeadProvider>
  )
}

export default App
