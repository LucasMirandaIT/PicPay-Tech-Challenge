import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

test('renders learn react link', () => {
  render(<App />);
  const linkElement = screen.getByText(/Seja muito bem vindos ao nosso teste./i);
  expect(linkElement).toBeInTheDocument();
});
