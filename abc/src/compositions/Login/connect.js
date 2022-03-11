import { connect } from 'react-redux';
import { login } from '../../Ducks/user';

export const mapStateToProps = function(state) {
  return state;
};

export const mergeProps = (stateProps, { dispatch }, ownProps) => ({
  logIn: (username, password) => dispatch(login(username, password)),
  ...stateProps,
  ...ownProps
});

export default connect(
  mapStateToProps,
  null,
  mergeProps
);
