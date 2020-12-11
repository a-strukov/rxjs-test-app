import { useEffect, useState } from 'react';
import { BehaviorSubject, combineLatest, timer } from 'rxjs';
import { debounce } from 'rxjs/operators';

import {
  TEMPERATURE_MIN_VALUE,
  TEMPERATURE_MAX_VALUE,
  AIR_PRESSURE_MIN_VALUE,
  AIR_PRESSURE_MAX_VALUE,
  HUMIDITY_MIN_VALUE,
  HUMIDITY_MAX_VALUE,
} from '../constants';
import { getRandomInt, setObservableLoop } from '../helpers';

const useData = (initialState) => {
  const [state, setState] = useState(initialState);

  useEffect(() => {
    const temperature$ = new BehaviorSubject(initialState.temperature || null);
    const airPressure$ = new BehaviorSubject(initialState.airPressure || null);
    const humidity$ = new BehaviorSubject(initialState.humidity || null);
    const subscription = combineLatest([temperature$, airPressure$, humidity$])
      .pipe(debounce(() => timer(100)))
      .subscribe(([temperature, airPressure, humidity]) => {
        if (temperature && airPressure && humidity) {
          setState({ temperature, airPressure, humidity });
        }
      });

    setObservableLoop(temperature$, () => getRandomInt(TEMPERATURE_MIN_VALUE, TEMPERATURE_MAX_VALUE));
    setObservableLoop(airPressure$, () => getRandomInt(AIR_PRESSURE_MIN_VALUE, AIR_PRESSURE_MAX_VALUE));
    setObservableLoop(humidity$, () => getRandomInt(HUMIDITY_MIN_VALUE, HUMIDITY_MAX_VALUE));

    return () => subscription.unsubscribe();
  }, [initialState.airPressure, initialState.humidity, initialState.temperature]);

  return [state];
};

export default useData;
