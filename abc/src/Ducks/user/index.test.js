import reducer, { initialState } from './index';
describe('user reducer', () => {
  it('uses default initial state if no state passed', () => {
    const result = reducer(undefined, {});
    expect(result).toEqual(initialState);
  });
});
