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

    register(data) {
        let url = environment.APP.API_URL + environment.APP.REGISTER_API;
        this.authRequired = false;
        this.utcOffset = true;
        return this.apiService.postApi(url, data, this.authRequired, this.utcOffset);
    }

    registerAddress(data) {
        let url = environment.APP.API_URL + environment.APP.REGISTER_ADDRESS_API;
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
        let formData = new FormData();
        formData.append('emailOrPhone', data);
        let url = environment.APP.API_URL + environment.APP.FORGOT_API;
        return this.apiService.putFileApi(url, formData, this.authRequired, this.utcOffset);
    }

    forgotPasswordOtp(data) {
        this.authRequired = false;
        this.utcOffset = false;
        let formData = new FormData();
        formData.append('phoneOtp', data.otp);
        formData.append('phoneNumber', data.phoneNumber);
        let url = environment.APP.API_URL + environment.APP.FORGOT_OTP_API;
        return this.apiService.putFileApi(url, formData, this.authRequired, this.utcOffset);
    }

    resetPassword(data) {
        this.authRequired = false;
        this.utcOffset = false;
        let formData = new FormData();
        if(data && data.resetToken) {
            formData.append('resetToken', data.resetToken);
        } else {
            formData.append('resetOtp', data.resetOtp);
        }
        formData.append('password', data.password);
        let url = environment.APP.API_URL + environment.APP.RESET_PASSWORD_API;
        return this.apiService.putFileApi(url, formData, this.authRequired, this.utcOffset);
    }

    getCountryCodes(payload) {
        let url;
        url = 'assets/json/country.json';
        this.authRequired = false;
        this.utcOffset = false;
        return this.apiService.getApi(url, this.authRequired, this.utcOffset);
    }
}
