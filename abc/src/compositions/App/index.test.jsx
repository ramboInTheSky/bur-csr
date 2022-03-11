import { shallow } from 'enzyme';
import React from 'react';
import { AppComposition } from './index';

const props = {
  history: {
    location: {
      search: '?redirect=http://localhost:3005/'
    }
  },
  setRedirectUrl: jest.fn(),
  setProfile: jest.fn(),
  getUserProfile: jest.fn()
};
it('renders without crashing', () => {
  const app = shallow(<AppComposition {...props} />);
  app.unmount();
});
