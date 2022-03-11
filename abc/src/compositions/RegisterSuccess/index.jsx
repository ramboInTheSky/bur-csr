import React, { Component } from 'react';
import connect from './connect';

class RegisterSuccess extends Component {
  componentDidMount() {
    setTimeout(() => {
      this.props.history.push('/login');
    }, 3000);
  }

  render() {
    return (
      <React.Fragment>
        <h1>Registration Successful</h1>
        <h2>You will be redirected to login</h2>
      </React.Fragment>
    );
  }
}

export default connect(RegisterSuccess);
