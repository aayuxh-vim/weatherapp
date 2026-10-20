import { render, screen } from '@testing-library/react';
import App from './App';

test('renders weather dashboard', () => {
  render(<App />);

  expect(
    screen.getByRole('heading', { name: /Weather Dashboard/i })
  ).toBeInTheDocument();

  expect(
    screen.getByPlaceholderText(/Enter city/i)
  ).toBeInTheDocument();

  expect(
    screen.getByRole('button', { name: /Search/i })
  ).toBeInTheDocument();
});
