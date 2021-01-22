import React from 'react';
import { render } from '@testing-library/react';
import App from './App';
import axios from 'axios';

test('renders star wars', () => {
  const { getByText } = render(<App />);
  // const linkElement = getByText(/Hide Details/i);
  const linkElement = getByText(/Star Wars/);
  expect(linkElement).toBeInTheDocument();
});

describe('/GET /api/people', () => {
  it('serves up all people', async () => {
    const domain = 'https://swapi.dev/api/people/?page=1';
    const response = await axios.get(domain);
    expect(response.status).toEqual(200);
  });
});

