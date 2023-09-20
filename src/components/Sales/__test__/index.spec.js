import React from 'react';
import { shallow } from 'enzyme';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import SalesForm from '../form';
import mock from './__mocks__/sales.mocks';

//const user = userEvent.setup();

describe('Form test', () => {
  const props = mock();
  it('Should match snapshot', () => {
    const wrapper = shallow(<SalesForm {...props} />);
    expect(wrapper).toMatchSnapshot();
  });

  it('Should validate main heading', () => {
    render(<SalesForm {...props} />);

    screen.getByText('sales.title');
  });

  it('Should click on add new item', async () => {
    render(<SalesForm {...props} />);

    await userEvent.click(screen.getByRole('button', { name: 'sales.addItem' }));
  });
});
