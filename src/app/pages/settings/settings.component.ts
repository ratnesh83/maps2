import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { CanActivate, Router, ActivatedRouteSnapshot } from '@angular/router';
import { Effect, Actions } from '@ngrx/effects';
import * as setting from './state/setting.actions';

@Component({
    selector: 'settings',
    template: `
            <div>
                <ba-content-top></ba-content-top>
                <router-outlet></router-outlet>
            </div>
            `
})
export class Settings {

    constructor(private store: Store<any>, private router: Router) { }

    ngOnInit() { }

}