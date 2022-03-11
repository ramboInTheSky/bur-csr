import PropTypes from 'prop-types';
import React, { Component } from 'react';
export default class Loading extends Component {
  render() {
    const { isLoading } = this.props;
    return <div>{isLoading && <h1>LOADING</h1>}</div>;
  }
}

Loading.propTypes = {
  loading: PropTypes.bool
};
