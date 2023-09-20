import React from 'react';
import Header from '..';
import { screen, render, waitFor } from '@testing-library/react';
import { BrowserRouter, NavLink } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from '../../../store';
import '@testing-library/jest-dom';
import userEvent from '@testing-library/user-event';

describe('Header test suite', () => {
  const arrange = () =>
    render(
      <Provider store={store}>
        <BrowserRouter>
          <Header />
        </BrowserRouter>
      </Provider>
    );

  it('It should have Dashboard navigation', () => {
    arrange();

    screen.findByText('Dashboard');
  });

  it('It should check opening and closing of sidebar', async () => {
    arrange();

    const hamburger = screen.queryByRole('button');
    await userEvent.click(hamburger);
    await screen.findByRole('button');
  });
});
