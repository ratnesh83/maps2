import { Component } from '@angular/core';
import { Store } from '@ngrx/store';

import * as auth from '../../../auth/state/auth.actions';

@Component({
    template: ``,
})
export class LogoutComponent {

    constructor(
        private store: Store<any>
    ) {
        this.store.dispatch(new auth.AuthLogoutAction());
    }
}
