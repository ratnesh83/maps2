import { Component } from '@angular/core';

@Component({
    selector: 'Notifications',
    template: `
        <div>
            <ba-content-top></ba-content-top>
            <router-outlet></router-outlet>
        </div>
    `
})
export class Notifications {

    constructor() {
    }

}
