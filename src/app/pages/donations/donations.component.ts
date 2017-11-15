import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { CanActivate, Router, ActivatedRouteSnapshot } from '@angular/router';
import { Effect, Actions } from '@ngrx/effects';

@Component({
    selector: 'donations',
    template: `
        <div>
            <ba-content-top></ba-content-top>       
            <donation></donation>
        </div>
    `
})
export class Donations {

    constructor() {
    }

    ngOnInit() {
    }

}
