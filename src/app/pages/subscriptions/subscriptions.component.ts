import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { CanActivate, Router, ActivatedRouteSnapshot } from '@angular/router';
import { Effect, Actions } from '@ngrx/effects';
import * as subscription from './state/subscription.actions';

@Component({
    selector: 'Subscriptions',
    template: `
        <ba-content-top></ba-content-top>
        <all-subscriptions></all-subscriptions>
    `
})
export class Subscriptions {

    constructor(private store: Store<any>, private router: Router) {

    }

    ngOnInit() {

    }

}
