/* eslint-disable prettier/prettier */
import React, { Suspense, useEffect } from 'react'
import { Redirect, Route, Switch } from 'react-router-dom'
import { CContainer, CSpinner } from '@coreui/react'
import Cookies from "js-cookie";
import Tour from './Tour'
import { useHistory } from 'react-router'
// routes config
import routes from '../routes'

const AppContent = () => {
  const history = useHistory();
  let accessToken = Cookies.get("access");
  useEffect(() => {
    if (accessToken==='undefined' || !accessToken) {
      history.push('/login');
    }

  }, [accessToken,history]);
  return (
    <CContainer lg>
      <Suspense fallback={<CSpinner className="spinner" />}>
        <Switch>
          {(!!accessToken || accessToken!=='undefined') ? (<>{routes.map((route, idx) => {
            return (
              route.component && (
                <Route
                  key={idx}
                  path={route.path}
                  exact={route.exact}
                  name={route.name}
                  render={(props) => (
                    <>
                      <route.component {...props} />
                    </>
                  )}
                />
              )
            )
          })}
        
          <Redirect from="/" to="/bookmark" /></>) : (<Redirect to="/login" />)}
          
        </Switch>
      </Suspense>
    </CContainer>
  )
}

export default React.memo(AppContent)
