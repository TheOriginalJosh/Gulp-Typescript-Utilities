declare const global: any;
declare const Promise:any;

import {Observable, Scheduler} from 'rxjs/Rx';
import {ObservableInput} from 'rxjs/Observable';
import {root} from 'rxjs/util/root';
import {$$iterator} from 'rxjs/symbol/iterator';
import $$symbolObservable from 'symbol-observable';

export function lowerCaseO<T>(...args): Observable<T> {
  const values = [].slice.apply(arguments);

  const o = {
    subscribe: function (observer) {
      values.forEach(function (v) {
        observer.next(v);
      });
      observer.complete();
    }
  };

  o[$$symbolObservable] = function () {
    return this;
  };

  return <any>o;
};

export const createObservableInputs = <T>(value: T) => Observable.of<ObservableInput<T>>(
  Observable.of<T>(value),
  Observable.of<T>(value, Scheduler.async),
  [value],
  Promise.resolve(value),
  <any>({ [$$iterator]: () => {
      const iteratorResults = [
        {value, done: false},
        {done: true}
      ];
      return {
        next: () => {
          return iteratorResults.shift();
        }
      };
    }}),
  <any>({ [$$symbolObservable]: () => Observable.of(value) })
);

global.__root__ = root;