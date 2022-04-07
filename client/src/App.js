import './App.css'
import {Route, Switch} from 'react-router-dom'
import LandingPage from './components/LandingPage/LandingPage.jsx'
import Home from './components/Home/Home.jsx'
import Detail from './components/Detail/Detail'
import VideoGameCreate from './components/VideoGameCreate/VideoGameCreate'

function App() {
   return (
      <div className="App">
         <Switch>
            <Route exact path="/" component={LandingPage} />
            <Route path="/home" component={Home} />
            <Route path="/videogames/:id" component={Detail} />
            <Route path="/videogame" component={VideoGameCreate} />
         </Switch>
      </div>
   )
}

export default App
