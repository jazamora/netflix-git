import React from 'react';
import { shallow, mount } from 'enzyme';

import Repo from './Repo';

describe('<Repo />', () => {
  it('renders without crashing', () => {
    shallow(<Repo />);
  });

  it('renders correctly', () => {
      const wrapper = mount(<Repo full_name="rick" pushed_at="2018-10-01T22:00:00Z"/>);
      const name = wrapper.find('button').text();
      expect(name).toEqual('rick');
  });
});