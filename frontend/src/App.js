import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
// import pages
import Home from './pages/Home'
import About from './pages/About'
import Error from './pages/Error'
// import components
import Navbar from './components/Navbar'

function App() {
  return (
    <Router>
      <Navbar />
      <Switch>
        <Route exact path="/">
          <Home />
        </Route>
        <Route path="/about">
          <About />
        </Route>
        <Route path="*">
          <Error />
        </Route>
      </Switch>
    </Router>
  )
}

export default App

/*const getData = () => {
    fetch('http://127.0.0.1:8000/api')
    .then((response) => response.json())
    .then((json) => setData(json))
  }
  return (
    <div className="App">
      {getData()}
      {JSON.stringify(data)}
    </div>
  );*/