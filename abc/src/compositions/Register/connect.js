import { connect } from 'react-redux';
import { register } from '../../Ducks/user';

export const mapStateToProps = function(state) {
  return { profile: state.user.profile };
};

export const mergeProps = (stateProps, { dispatch }, ownProps) => ({
  registerUser: values => dispatch(register(values)),
  ...stateProps,
  ...ownProps
});

export default connect(
  mapStateToProps,
  null,
  mergeProps
);
