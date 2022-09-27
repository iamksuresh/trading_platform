import React from 'react';
import { render, screen } from '@testing-library/react';
import App from '../App';

test('renders OrderBook App', () => {
  const { container } = render(<App />);

  const linkElement = container.getElementsByClassName('App'); //
  // screen.getByText('Order Books');
  expect(linkElement.length).toEqual(1);
});
