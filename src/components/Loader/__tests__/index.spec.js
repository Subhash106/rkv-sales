import React from 'react';
import { shallow } from 'enzyme';

import Loader from '..';

describe('Loader test suite', () => {
  it('Should match snapshot', () => {
    const wrapper = shallow(<Loader />);
    expect(wrapper).toMatchSnapshot();
  });
});
