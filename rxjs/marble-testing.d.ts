import { Observable } from 'rxjs/Rx';
import { SubscriptionLog } from 'rxjs/testing/SubscriptionLog';
import { ColdObservable } from 'rxjs/testing/ColdObservable';
import { HotObservable } from 'rxjs/testing/HotObservable';
import { observableToBeFn, subscriptionLogsToBeFn } from 'rxjs/testing/TestScheduler';
export declare function hot(marbles: string, values?: any, error?: any): HotObservable<any>;
export declare function cold(marbles: string, values?: any, error?: any): ColdObservable<any>;
export declare function expectObservable(observable: Observable<any>, unsubscriptionMarbles?: string): ({
    toBe: observableToBeFn;
});
export declare function expectSubscriptions(actualSubscriptionLogs: SubscriptionLog[]): ({
    toBe: subscriptionLogsToBeFn;
});
export declare function time(marbles: string): number;
