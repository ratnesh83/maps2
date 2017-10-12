import { Component } from '@angular/core';

@Component({
    selector: 'Notifications',
    template: `
        <ba-content-top></ba-content-top>
        <router-outlet></router-outlet>
    `
})
export class Notifications {

    constructor() {
    }

}
