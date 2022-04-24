import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

test('renders app without user logged in sessionStorage', () => {
  render(<App />);
  const linkElement = screen.getByTestId("welcome-text");
  expect(linkElement).toBeInTheDocument();
});
