import state from '../../../__mock__/state';
import * as actions from '../../ducks/user';
import { mapStateToProps, mergeProps } from './connect';

const mockState = state();
describe('mapStateToProps', () => {
  it('generates the correct props', () => {
    const result = mapStateToProps(mockState);
    expect(result).toEqual({ profile: mockState.user.profile });
  });
});

describe('mergeProps', () => {
  let dispatchProps;
  let ownProps;
  let result;

  const stateProps = { ...mockState };

  beforeEach(() => {
    dispatchProps = {
      dispatch: jest.fn()
    };
    ownProps = { prop: 'value' };
    actions.logout = jest.fn();
    result = mergeProps(stateProps, dispatchProps, ownProps);
  });

  it('generates the correct props', () => {
    expect(result).toEqual({
      registerUser: expect.any(Function),
      ...stateProps,
      ...ownProps
    });
  });
});
