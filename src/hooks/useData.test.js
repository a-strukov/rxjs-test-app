import { act, renderHook } from '@testing-library/react-hooks';

import {
  TEMPERATURE_MIN_VALUE,
  TEMPERATURE_MAX_VALUE,
  AIR_PRESSURE_MIN_VALUE,
  AIR_PRESSURE_MAX_VALUE,
  HUMIDITY_MIN_VALUE,
  HUMIDITY_MAX_VALUE,
  NOT_AVAILABLE,
} from '../constants';
import useData from './useData';

expect.extend({
  toBeInRangeOrNA(received, argument) {
    const validValues = Array.isArray(argument) ? argument : [argument];
    const pass = received === NOT_AVAILABLE || (received >= argument[0] && received <= argument[1]);

    if (pass) {
      return {
        message: () => (
          `expected ${received} not to be one of [${validValues.join(', ')}]`
        ),
        pass: true,
      };
    }

    return {
      message: () => (`expected ${received} to be one of [${validValues.join(', ')}]`),
      pass: false,
    };
  },
});

test('useData hook returns initial state', () => {
  jest.useFakeTimers();

  const { result: { current: [initialState] } } = renderHook(() => useData({}));

  expect(initialState).toMatchObject({});
});

test('useData hook returns randomly generated values', () => {
  jest.useFakeTimers();

  const { result } = renderHook(() => useData({}));

  act(() => {
    jest.advanceTimersByTime(2000);
  });

  const [{ temperature, airPressure, humidity }] = result.current;
  expect(temperature).toBeInRangeOrNA([TEMPERATURE_MIN_VALUE, TEMPERATURE_MAX_VALUE]);
  expect(airPressure).toBeInRangeOrNA([AIR_PRESSURE_MIN_VALUE, AIR_PRESSURE_MAX_VALUE]);
  expect(humidity).toBeInRangeOrNA([HUMIDITY_MIN_VALUE, HUMIDITY_MAX_VALUE]);
});
