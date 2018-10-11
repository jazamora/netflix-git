import React from 'react';
import { shallow, mount } from 'enzyme';

import OrgForm from './OrgForm';

describe('<OrgForm />', () => {
  it('renders without crashing', () => {
    shallow(<OrgForm />);
  });
});