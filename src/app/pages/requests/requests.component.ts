import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { CanActivate, Router, ActivatedRouteSnapshot } from '@angular/router';
import { Effect, Actions } from '@ngrx/effects';
import * as request from './state/request.actions';

@Component({
    selector: 'Requests',
    template: `
        <div>
            <ba-content-top></ba-content-top>
            <router-outlet></router-outlet>
        </div>
    `
})
export class Requests {

    constructor(private store: Store<any>, private router: Router) {
    }

    ngOnInit() {
    }

}
