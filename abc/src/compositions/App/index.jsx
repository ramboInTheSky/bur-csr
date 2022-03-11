import PropTypes from 'prop-types';
import { parse } from 'qs';
import { Component, default as React } from 'react';
import { Route, Switch, withRouter } from 'react-router-dom';
import Loading from '../../components/loadingComponent';
import PrivateRoute from '../../components/privateRoute';
import Home from '../Home';
import Login from '../Login';
import Register from '../Register';
import RegisterSuccess from '../RegisterSuccess';
import connect from './connect';
import './index.css';

export class AppComposition extends Component {
  setRedirectUrl = () => {
    const qs =
      parse(this.props.history.location.search, { ignoreQueryPrefix: true }) ||
      {};
    if (qs.redirect) {
      this.props.setRedirectUrl(qs.redirect);
    }
  };

  redirectIfLoggedIn = () => {
    const { user } = this.props;
    if ((user || {}).loggedIn) {
      this.props.history.push('/');
    }
  };

  componentDidMount() {
    this.props.getUserProfile();
  }

  componentDidUpdate(prevProps) {
    if (prevProps.user.loggedIn !== this.props.user.loggedIn) {
      this.redirectIfLoggedIn();
    }
  }

  render() {
    //TODO; I'm sure there must be a better way of storing the redirectURL.
    this.setRedirectUrl();

    const { user } = this.props;
    const routeProps = {
      exact: true,
      user
    };

    return (
      <React.Fragment>
        <Loading isLoading={(this.props.user || {}).loading} />
        <Switch>
          <Route component={Login} path={`/login`} />
          <Route component={Register} path={`/register`} />
          <PrivateRoute component={Home} path={`/`} {...routeProps} />
          <PrivateRoute
            component={RegisterSuccess}
            path={`/registerSuccess`}
            {...routeProps}
          />
        </Switch>
      </React.Fragment>
    );
  }
}

// TODO: Default Props
AppComposition.propTypes = {
  history: PropTypes.shape({
    location: PropTypes.shape({
      search: PropTypes.string.isRequired
    }).isRequired
  }).isRequired,
  setRedirectUrl: PropTypes.func.isRequired,
  setProfile: PropTypes.func.isRequired,
  user: PropTypes.shape({
    loggedIn: PropTypes.bool
  })
};

export default withRouter(connect(AppComposition));
