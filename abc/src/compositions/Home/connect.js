import { connect } from 'react-redux';
import { logout } from '../../Ducks/user';

export const mapStateToProps = function(state) {
  return state;
};

export const mergeProps = (stateProps, { dispatch }, ownProps) => ({
  ...stateProps,
  logOut: () => dispatch(logout()),
  ...ownProps
});

export default connect(
  mapStateToProps,
  null,
  mergeProps
);
