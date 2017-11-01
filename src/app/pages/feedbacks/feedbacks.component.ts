import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { CanActivate, Router, ActivatedRouteSnapshot } from '@angular/router';
import { Effect, Actions } from '@ngrx/effects';

@Component({
    selector: 'feedbacks',
    template: `
        <div>
            <ba-content-top></ba-content-top>       
            <feeds></feeds>
        </div>
    `
})
export class Feedbacks {

    constructor() {
    }

    ngOnInit() {
    }

}
