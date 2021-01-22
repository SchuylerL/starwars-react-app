import React from 'react';
import { render } from '@testing-library/react';
import App from './App';

test('renders learn react link', () => {
  const { getByText } = render(<App />);
  // const linkElement = getByText(/learn react/i);
  const linkElement = getByText(/Star Wars/);
  expect(linkElement).toBeInTheDocument();
});
// test('renders react link', () => {
//   const { getByText } = render(<App />);
//   const linkElement = getByText(/1/i);
//   // const linkElement = getByText(/Star Wars/);
//   expect(linkElement).toBeInTheDocument();
// });
