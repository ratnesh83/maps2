import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { CanActivate, Router, ActivatedRouteSnapshot } from '@angular/router';
import { Effect, Actions } from '@ngrx/effects';
import * as payment from './state/payment.actions';

@Component({
    selector: 'payments',
    template: `
        <div>
            <ba-content-top></ba-content-top>
            <all-payments></all-payments>
        </div
    `
})
export class Payments {

    constructor(private router: Router, private store: Store<any>) {
    }
    
    ngOnInit() {
    }

}
