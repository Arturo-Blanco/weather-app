import { HeadProvider, Title, Meta } from 'react-head'
import { Route, Switch } from 'wouter'
import { NotFound } from './Components/NotFound/NotFound'
import { Layout } from './Components/Layout/Layout'
import { Home } from './Components/Home/Home'
import { Navbar } from './Components/NavBar/Navbar'
import './App.css'



function App() {

  return (
    <HeadProvider>
      <Title>{'Weather app'}</Title>
      <Meta name="description" content={`Explore real-time weather conditions. Your go-to application for up-to-date weather information.`} />
      <Navbar/>
        <Switch>
          <Route component={Home} exact path='/' />
          <Route component={Layout} path='/search/:city' />
          <Route component={NotFound} />
        </Switch>
    </HeadProvider>
  )
}

export default App
