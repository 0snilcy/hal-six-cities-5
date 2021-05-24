import React from 'react';
import Main from '../main/main';
import PropTypes from 'prop-types';
import { Router as BrowserRouter, Switch, Route } from 'react-router-dom';
import SignIn from '../sign-in/sign-in';
import PrivateSignIn from '../private-sign-in/sign-in-private';
import Favorites from '../favorites/favorites';
import Room from '../room/room';
import { propsOffers } from '../../props/props';
import { AppRoute, AppClient } from '../../const/const';
import PrivateRoute from 'components/private-route/private-route';
import browserHistory from '../../browser-history';

const App = () => {
  return (
    <BrowserRouter basename="hal-six-cities-5" history={browserHistory}>
      <Switch>
        <PrivateRoute
          exact
          path={AppRoute.FAVORITES}
          render={() => <Favorites />}
        />
        <Route exact path={AppClient.ROOT} render={() => <Main />} />
        <PrivateSignIn exact path={AppClient.LOGIN} render={() => <SignIn />} />
        <Route exact path={AppClient.OFFER_ID}>
          {({ match }) => <Room activeID={+match.params.id} />}
        </Route>
      </Switch>
    </BrowserRouter>
  );
};

App.propTypes = {
  offers: PropTypes.arrayOf(PropTypes.shape(propsOffers)),
};

export default App;
