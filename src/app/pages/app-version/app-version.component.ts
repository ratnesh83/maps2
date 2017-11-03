import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { CanActivate, Router, ActivatedRouteSnapshot } from '@angular/router';
import { Effect, Actions } from '@ngrx/effects';

@Component({
    selector: 'appversion',
    template: `
        <div>
            <ba-content-top></ba-content-top>       
            <version></version>
        </div>
    `
})
export class AppVersion {

    constructor() {
    }

    ngOnInit() {
    }

}
