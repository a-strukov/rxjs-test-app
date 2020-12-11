import { BehaviorSubject } from 'rxjs';

import { getRandomInt, setObservableLoop } from '.';

import { NOT_AVAILABLE } from '../constants';

test('getRandomInt returns random integer', () => {
  expect(getRandomInt(1, 5)).toBeGreaterThanOrEqual(1);
  expect(getRandomInt(1, 5)).toBeLessThanOrEqual(5);
});

test('getRandomInt with no and one parameter', () => {
  expect(() => getRandomInt()).toThrowError(new Error('Min parameter should be provided'));
  expect(getRandomInt(10)).toBe(10);
});

test('setObservableLoop throws error on incorrect parameters', async () => {
  jest.useFakeTimers();

  const subject$ = new BehaviorSubject(null);
  subject$.subscribe((value) => {
    expect(value).toBe(null);
  });

  jest.advanceTimersByTime(2000);

  expect(() => setObservableLoop()).toThrowError(new Error('Observable object should be provided'));
  expect(() => setObservableLoop(subject$)).toThrowError(new Error('Callback parameter should be provided'));
});

test('setObservableLoop returns correct value', async () => {
  jest.useFakeTimers();

  const subject$ = new BehaviorSubject(null);
  subject$.subscribe((value) => {
    expect(value).toBe(value ? 10 : null);
  });

  setObservableLoop(subject$, () => 10, () => 500);

  jest.advanceTimersByTime(500);
});

test('setObservableLoop returns N/A on timeout', async () => {
  jest.useFakeTimers();

  const subject$ = new BehaviorSubject(null);
  subject$.subscribe((value) => {
    expect(value).toBe(value ? NOT_AVAILABLE : null);
  });

  setObservableLoop(subject$, () => 10, () => 2000);

  jest.advanceTimersByTime(1000);
});
