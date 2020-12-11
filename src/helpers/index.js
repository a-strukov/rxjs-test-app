import { DEFAULT_TIMEOUT } from '../constants';

export function setObservableLoop(
  observable,
  callback,
  interval = () => getRandomInt(100, 2000),
  timeoutMs = DEFAULT_TIMEOUT,
) {
  if (!observable) {
    throw Error('Observable object should be provided');
  }

  if (!callback) {
    throw Error('Callback parameter should be provided');
  }

  const timeout = setTimeout(() => observable.next('N/A'), timeoutMs);

  setTimeout(() => {
    clearTimeout(timeout);
    observable.next(callback());
    setObservableLoop(observable, callback, interval, timeoutMs);
  }, interval());
}

export function getRandomInt(min, max) {
  if (!min) {
    throw Error('Min parameter should be provided');
  }

  if (!max) {
    return min;
  }

  const ceiledMin = Math.ceil(min);
  const flooredMax = Math.floor(max);

  return Math.floor(Math.random() * (flooredMax - ceiledMin + 1)) + ceiledMin;
}
