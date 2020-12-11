import renderer from 'react-test-renderer';
import { render, screen, act } from '@testing-library/react';

import App from './App';

it('renders correctly', () => {
  const tree = renderer.create(<App />).toJSON();
  expect(tree).toMatchSnapshot();
});

it('renders loader on the initial load', async () => {
  render(<App />);

  const loadingText = screen.getByText('Loading...');
  expect(loadingText).toBeTruthy()
});


it('renders state values', async () => {
  jest.useFakeTimers();

  render(<App />);

  act(() => {
    jest.advanceTimersByTime(2000);
  });

  expect(screen.getAllByTestId('value')).toHaveLength(3);
});
