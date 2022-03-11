import { shallow } from 'enzyme';
import React from 'react';
import state from '../../../__mock__/state';
import { Home } from './index';

const mockState = state();
const props = {
  history: {
    push: jest.fn()
  },
  logOut: jest.fn(),
  user: {
    profile: { ...mockState.user.profile }
  }
};

it('renders without crashing', () => {
  const app = shallow(<Home {...props} />);
  app.unmount();
});
