import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response, URLSearchParams } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { environment } from '../../environment/environment';
import { Effect, Actions } from '@ngrx/effects';
import { Action, Store } from '@ngrx/store';
import { Router } from '@angular/router';
import { ToastrService, ToastrConfig } from 'ngx-toastr';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()
export class ChangePasswordService {

    constructor(
        // private actions$: Actions,
        // private store: Store<any>,
        // private router: Router,
        // private ChangePasswordService: ChangePasswordService,
        // private toastrService: ToastrService,
        public http: Http
    ) {
    }


    changePassword(payload) {

        // HEADERS
        let token = localStorage.getItem('token');
        let headerToken = 'Bearer ' + token;
        let headers = new Headers({
            'content-language': 'en',

        });
        headers.append('Authorization', headerToken);
        let options = new RequestOptions({
            'headers': headers,
        });
        // URL
        let url = environment.APP.API_URL + environment.APP.CHANGE_PASSWORD;

        return this.http.put(url, payload, options)
            .map((res: Response) => res.json())
            .catch((error: any) => {
                try {
                    return (Observable.throw(error.json()));
                } catch (jsonError) {
                    let minimumViableError = {
                        success: false
                    };
                    return (Observable.throw(minimumViableError));
                }
            });
    };
}



