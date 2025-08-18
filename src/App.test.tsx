
import { render, screen } from '@testing-library/react';
import App from './App';
jest.mock('axios');

test('renders Stress News header', () => {
  render(<App />);
  const headerElement = screen.getByText(/Stress/i);
  expect(headerElement).toBeInTheDocument();
});
