import { get } from 'js-cookie';
import React, { Component } from 'react';
import './App.css';

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: undefined
    };
  }

  componentDidMount() {
    const authCode = get('bur_auth_cookie');
    if (authCode && authCode !== 'undefined') {
      this.setState({
        authCode
      });
    }
  }

  render = () => {
    const { authCode } = this.state;

    const login = authCode ? (
      <React.Fragment>You are logged in.</React.Fragment>
    ) : (
      <a
        href="http://localhost:3001?redirect=http://localhost:3005/"
        style={{ color: 'white' }}
      >
        Login
      </a>
    );

    return (
      <div className="App">
        <header className="App-header">
          Burberry dummy page
          <br />
          <br />
          {login}
        </header>
      </div>
    );
  };
}
