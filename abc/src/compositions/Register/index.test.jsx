import { shallow } from 'enzyme';
import React from 'react';
import { Register } from './index';

const props = {
  history: {
    push: jest.fn()
  },
  registerUser: jest.fn()
};

it('renders without crashing', () => {
  const app = shallow(<Register {...props} />);
  app.unmount();
});
