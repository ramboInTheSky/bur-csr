import { connect } from 'react-redux';
import { updatePassword } from '../../api';
export const mapStateToProps = function(state) {
  return state;
};

export const mergeProps = (stateProps, { dispatch }, ownProps) => ({
  updatePassword: (username, password) => dispatch(updatePassword(password)),
  ...stateProps,
  ...ownProps
});

export default connect(
  mapStateToProps,
  null,
  mergeProps
);
