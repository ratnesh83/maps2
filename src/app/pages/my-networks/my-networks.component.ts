import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { CanActivate, Router, ActivatedRouteSnapshot } from '@angular/router';
import { Effect, Actions } from '@ngrx/effects';
import * as labor from './state/labor.actions';

@Component({
    selector: 'my-networks',
    template: `
        <div>
            <ba-content-top></ba-content-top>
            <router-outlet></router-outlet>
        </div>
    `
})
export class MyNetworks {

    constructor(private store: Store<any>, private router: Router) {
    }

    ngOnInit() { }

}
