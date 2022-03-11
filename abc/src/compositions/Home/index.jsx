import PropTypes from 'prop-types';
import React from 'react';
import connect from './connect';

export class Home extends React.Component {
  // TODO: Redirect to savedURL if there's one
  componentDidMount() {
    const { redirectUrl } = this.props.user;
    if (redirectUrl) {
      setTimeout(() => {
        window.location.href = redirectUrl;
      }, 3000);
    }
  }

  logout = async () => {
    await this.props.logOut();
    this.props.history.push('/login');
  };

  render() {
    const { profile, redirectUrl } = this.props.user;
    return (
      <div>
        <h2>Hello {profile.first_name}</h2>
        {redirectUrl ? (
          <h3>You are being redirected to {redirectUrl}...</h3>
        ) : (
          <button onClick={this.logout}>Log Out</button>
        )}
      </div>
    );
  }
}

// TODO: Default Props

Home.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired
  }).isRequired,
  logOut: PropTypes.func.isRequired,
  user: PropTypes.shape({
    profile: PropTypes.shape({
      first_name: PropTypes.string.isRequired
    })
  })
};
export default connect(Home);
