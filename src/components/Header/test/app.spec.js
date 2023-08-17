import React from 'react';
import Header from '..';
import { shallow } from 'enzyme';
import { NavLink } from 'react-router-dom';

describe('Header test suite', () => {
  it('Should match snapshot', () => {
    const wrapper = shallow(<Header />);
    expect(wrapper).toMatchSnapshot();
  });

  it('It should have Home navigation', () => {
    const wrapper = shallow(<Header />);
    expect(wrapper.find(NavLink).at(1).text()).toEqual('Home');
  });

  it('It should have Orders navigation', () => {
    const wrapper = shallow(<Header />);
    expect(wrapper.find(NavLink).at(2).text()).toEqual('Orders');
  });
});
