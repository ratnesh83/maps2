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
    isLoggedIn: boolean = false;
    public user = null;
    redirectUrl: '/pages';
    jwtHelper: JwtHelper = new JwtHelper();

    private url = environment.APP.API_URL;
    public socket;

    login() {
        let token = localStorage.getItem('tokenSession');

        // token exist and is not expired
        if (token && !this.jwtHelper.isTokenExpired(token)) {
            //console.log("token present")
            this.user = this.jwtHelper.decodeToken(token);
            if (this.socket != null) {
                //let token = localStorage.getItem('token');
                //var headerToken = 'Bearer '+token;
                let headerToken = token;
                this.url += '?token=' + headerToken;
                //console.log('URL Is ' + this.url);
                this.socket = io(this.url);
                this.socket.on('connect', (socket) => {
                    //console.log('Connected Socket Successfully ');
                });

                this.socket.on('disconnect', (socket) => {
                    //console.log('Closed Socket Conection... ');
                });
            }

            //console.log('Loged in user ');
            //console.log(this.user);
            this.isLoggedIn = true;
            //console.log(token)
            return this.isLoggedIn;
        }
        else {
            this.isLoggedIn = false;
            return this.isLoggedIn;
        }
    }

    getSocketConnection() {
        if (this.socket) {
            return this.socket;
        }
        else {
            return null;
        }
    }

    logout(): void {
        localStorage.removeItem('token');
        localStorage.removeItem('tokenSession');
        localStorage.removeItem('userRegisterationId');
    }

}
