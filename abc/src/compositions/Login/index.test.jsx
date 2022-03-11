import { shallow } from 'enzyme';
import React from 'react';
import { Login } from './index';

const props = {
  history: {
    push: jest.fn()
  },
  logIn: jest.fn()
};

it('renders without crashing', () => {
  const app = shallow(<Login {...props} />);
  app.unmount();
});
