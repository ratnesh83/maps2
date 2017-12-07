import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/delay';
import { JwtHelper } from 'angular2-jwt';
import { environment } from '../../../environment/environment';
import * as io from 'socket.io-client';

@Injectable()
export class AuthService {

    private url = environment.APP.API_URL;
    public isLoggedIn: boolean = false;
    public user = null;
    public redirectUrl: '/pages';
    public jwtHelper: JwtHelper = new JwtHelper();
    public socket;

    login() {

        let token = localStorage.getItem('tokenSession');

        if (token && !this.jwtHelper.isTokenExpired(token)) {
            this.user = this.jwtHelper.decodeToken(token);
            token = localStorage.getItem('token');
            this.user = this.jwtHelper.decodeToken(token);
            let userType;
            if (this.user) {
                userType = this.user.userType;
            }
            let headerToken = token;
            this.socket = io(this.url + '?accessToken=' + token + '&userType=' + userType, {
                extraHeaders: {
                    Authorization: headerToken
                }
            });

            this.isLoggedIn = true;
            return this.isLoggedIn;

        } else {
            this.isLoggedIn = false;
            return this.isLoggedIn;
        }
    }

    getSocketConnection() {
        if (!this.socket) {
            this.login();
        }
        if (this.socket) {
            return this.socket;
        } else {
            return null;
        }
    }

    logout(): void {
        localStorage.removeItem('token');
        localStorage.removeItem('tokenSession');
        localStorage.removeItem('userRegisterationId');
    }

}
