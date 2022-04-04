/* eslint-disable prettier/prettier */
import React from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import './scss/style.scss'
import './scss/_custom.scss'
import Tour from './components/Tour'
// lol comment
const loading = (
  <div className="pt-3 text-center">
    <div className="sk-spinner sk-spinner-pulse"></div>
  </div>
)

// Containers
const DefaultLayout = React.lazy(() => import('./layout/DefaultLayout'))

// Pages
const Login = React.lazy(() => import('./views/pages/login/Login'))
const Register = React.lazy(() => import('./views/pages/register/Register'))

const App = () => {
  return (
    <div>
      <Tour/>
    <BrowserRouter basename="/journeys">
      <React.Suspense fallback={loading}>
        <Switch>
          <Route exact path="/login" name="Login Page" render={(props) => <Login {...props} />} />
          <Route
            exact
            path="/register"
            name="Register Page"
            render={(props) => <Register {...props} />}
          />
          <Route path="/" name="Home" render={(props) => <DefaultLayout {...props} />} />
        </Switch>
      </React.Suspense>
    </BrowserRouter>
    </div>
  )
}

export default App
