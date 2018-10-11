import React from 'react';
import { shallow, mount } from 'enzyme';

import SideBar from './SideBar';

describe('<SideBar />', () => {
  it('renders without crashing', () => {
      shallow(<SideBar />);
  });

  it('renders correctly', () => {
      const wrapper = mount(<SideBar repo="rick"/>);
      const message = wrapper.find('h3').text();
      expect(message).toEqual('rick commits');
  });
});