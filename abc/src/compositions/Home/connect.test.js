import state from '../../../__mock__/state';
import * as actions from '../../ducks/user';
import { mapStateToProps, mergeProps } from './connect';

const mockState = state();
describe('mapStateToProps', () => {
  it('generates the correct props', () => {
    const result = mapStateToProps(mockState);
    expect(result).toEqual({ user: mockState.user });
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
      ...stateProps,
      logOut: expect.any(Function),
      ...ownProps
    });
  });
});
