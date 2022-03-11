import state from '../../../__mock__/state';
import { mapStateToProps } from './connect';

const mockState = state();
describe('mapStateToProps', () => {
  it('generates the correct props', () => {
    const result = mapStateToProps(mockState);
    expect(result).toEqual({ user: mockState.user });
  });
});
