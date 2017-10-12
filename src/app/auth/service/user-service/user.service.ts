import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { AuthHttp, JwtHelper } from 'angular2-jwt';
import { Observable } from 'rxjs/Rx';
import * as io from 'socket.io-client';
import { environment } from '../../../environment/environment';
import 'rxjs/add/operator/map';
import { ApiService } from '../../../services/api-service/api.service';

@Injectable()
export class UserService {
    authRequired;
    utcOffset;
    constructor(public http: Http, public authHttp: AuthHttp, public jwtHelper: JwtHelper, private apiService: ApiService) {
    }

    login(data) {

        let url = environment.APP.API_URL + environment.APP.LOGIN_API;
        this.authRequired = false;
        this.utcOffset = true;
        return this.apiService.postApi(url, data, this.authRequired, this.utcOffset);

    }

    logoutUser() {
        this.authRequired = true;
        this.utcOffset = false;
        let data = '';
        let url = environment.APP.API_URL + environment.APP.LOGOUT_API;
        return this.apiService.postApi(url, data, this.authRequired, this.utcOffset);
    }

    forgotPassword(data) {
        this.authRequired = false;
        this.utcOffset = false;
        let url = environment.APP.API_URL + environment.APP.FORGOT_API + '?email=' + data.email;
        return this.apiService.getApi(url, this.authRequired, this.utcOffset);

    }
}
