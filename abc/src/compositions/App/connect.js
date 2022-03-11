import { connect } from 'react-redux';
import { getUserProfile, setProfile, setRedirectUrl } from '../../Ducks/user';

export const mapStateToProps = function(state) {
  return { user: state.user };
};

export const mergeProps = (stateProps, { dispatch }, ownProps) => ({
  ...stateProps,
  setRedirectUrl: redirectUrl => dispatch(setRedirectUrl(redirectUrl)),
  setProfile: profile => dispatch(setProfile(profile)),
  getUserProfile: () => dispatch(getUserProfile()),
  ...ownProps
});

export default connect(
  mapStateToProps,
  null,
  mergeProps
);
