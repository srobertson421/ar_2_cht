import React, { Suspense, lazy, useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Grid, Spinner } from 'beautiful-react-ui';
import Nav from './components/Nav';
import AuthState from './state/AuthState';

const Home = lazy(() => import('./views/Home'));
const Login = lazy(() => import('./views/Login'));
const Signup = lazy(() => import('./views/Signup'));
const Converter = lazy(() => import('./views/Converter'));
const Tutorial = lazy(() => import('./views/Tutorial'));
const Profile = lazy(() => import('./views/Profile'));
const Cheats = lazy(() => import('./views/Cheats'));
const GameView = lazy(() => import('./views/GameView'));
const CheatView = lazy(() => import('./views/CheatView'));
const OriginalCheats = lazy(() => import('./views/OriginalCheats'));
const OriginalCheatView = lazy(() => import('./views/OriginalCheatView'));
const NotFound = lazy(() => import('./views/NotFound'));

const injectUserToRoute = (user, routeProps, Component) => {
  return <Component {...routeProps} user={user} />
}

const Routes = () => {
  const { user, isAuthenticating, authError, initAuthListener } = AuthState.useContainer();

  useEffect(() => {
    initAuthListener();
  }, []);

  return (
    <>
      { isAuthenticating && (
        <Spinner type="pulse" color="primary" size="large" />
      ) }

      { !isAuthenticating && authError && (
        <div>Auth Error: { authError.message }</div>
      ) }

      { !isAuthenticating && !authError && (
        <Router>
          <Grid>
            <Grid.Column md="2" lg="2" xl="2" sm="12">
              <Nav user={user} />
            </Grid.Column>
            <Grid.Column md="10" lg="10" xl="10" sm="12">
              <Suspense fallback={<Spinner type="pulse" color="primary" size="large" />}>
                <Switch>
                  <Route path="/" exact render={routeProps => injectUserToRoute(user, routeProps, Home)} />
                  <Route path="/converter" render={routeProps => injectUserToRoute(user, routeProps, Converter)} />
                  <Route path="/tutorial" render={routeProps => injectUserToRoute(user, routeProps, Tutorial)} />
                  <Route path="/cheats/:id/:gameName" render={routeProps => injectUserToRoute(user, routeProps, GameView)} />
                  <Route path="/cheats" render={routeProps => injectUserToRoute(user, routeProps, Cheats)} />
                  <Route path="/ez-flash-cheats/:id/:gameName" render={routeProps => injectUserToRoute(user, routeProps, OriginalCheatView)} />
                  <Route path="/ez-flash-cheats" render={routeProps => injectUserToRoute(user, routeProps, OriginalCheats)} />
                  { user && (
                    <>
                      <Route path="/profile" render={routeProps => injectUserToRoute(user, routeProps, Profile)} />
                    </>
                  ) }
                  { !user && (
                    <>
                      <Route path="/login" render={routeProps => injectUserToRoute(user, routeProps, Login)} />
                      <Route path="/signup" render={routeProps => injectUserToRoute(user, routeProps, Signup)} />
                    </>
                  ) }
                  <Route path="/*" component={NotFound} />
                </Switch>
              </Suspense>
            </Grid.Column>
          </Grid>
        </Router>
      ) }
    </>
  );
}

export default Routes;