import { Observable } from 'rxjs/Rx';
import { ObservableInput } from 'rxjs/Observable';
export declare function lowerCaseO<T>(...args: any[]): Observable<T>;
export declare const createObservableInputs: <T>(value: T) => Observable<ObservableInput<T>>;
