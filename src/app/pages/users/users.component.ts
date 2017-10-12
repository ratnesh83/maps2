import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { CanActivate, Router, ActivatedRouteSnapshot } from '@angular/router';
import { Effect, Actions } from '@ngrx/effects';
import * as customer from './state/user.actions';

@Component({
    selector: 'Users',
    template: `
        <ba-content-top></ba-content-top>
        <router-outlet></router-outlet>

    `
})
export class Users {

    constructor(private store: Store<any>, private router: Router) {
    }

    ngOnInit() {
    }

}
