import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { CanActivate, Router, ActivatedRouteSnapshot } from '@angular/router';
import { Effect, Actions } from '@ngrx/effects';

@Component({
    selector: 'helpcenter',
    template: `
        <ba-content-top></ba-content-top>       
        <help></help>
    `
})
export class HelpCenter {

    constructor() {
    }

    ngOnInit() {
    }

}
