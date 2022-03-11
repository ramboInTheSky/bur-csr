import { connect } from 'react-redux';

export const mapStateToProps = function(state) {
  return state;
};

export const mergeProps = (stateProps, { dispatch }, ownProps) => ({
  ...stateProps,
  ...ownProps
});

export default connect(
  mapStateToProps,
  null,
  mergeProps
);
