import React from 'react';
import { shallow, mount } from 'enzyme';

import Commit from './Commit';

describe('<Commit />', () => {
    it('renders without crashing', () => {
        shallow(<Commit />);
    });

    it('renders correctly', () => {
        const wrapper = mount(<Commit message="this is a commit" date="2018-10-01T22:00:00Z" email="amigosteradmin@gmail.com" />);
        const message = wrapper.find('h5').children().first().text();
        expect(message).toEqual('this is a commit');
    });
});