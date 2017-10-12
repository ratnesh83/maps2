import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';
import { Store } from '@ngrx/store';
import * as io from 'socket.io-client';
import * as auth from '../auth/state/auth.actions';
import { environment } from '../environment/environment';

@Injectable()
export class CommonService {
    private url = environment.APP.API_URL;
    public socket;

    constructor(private store: Store<any>) {
        this.store
            .select('auth')
            .subscribe((res: any) => {
                if (res.loggedIn === true) {

                }
            });
    }

    getSocketConnection() {
        return this.socket;
    }
}
