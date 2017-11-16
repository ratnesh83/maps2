import { Injectable } from '@angular/core';
import { environment } from '../../environment/environment';

@Injectable()
export class DataService {

    private data: {};
    private userRegisterationId;
    private userRegisterationAccessToken;
    private stepNumber;

    constructor() {
        this.data = {};
        this.stepNumber = 1;
    }

    setUserRegisterationAccessToken(token) {
        localStorage.setItem('userRegisterationAccessToken', token);
        this.userRegisterationAccessToken = token;
    }

    getUserRegisterationAccessToken() {
        this.userRegisterationAccessToken = localStorage.getItem('userRegisterationAccessToken');
        return this.userRegisterationAccessToken;
    }

    removeUserRegisterationAccessToken() {
        localStorage.removeItem('userRegisterationAccessToken');
        this.userRegisterationAccessToken = null;
    }

    setUserRegisterationId(id) {
        localStorage.setItem('userRegisterationId', id);
        this.userRegisterationId = id;
    }

    getUserRegisterationId() {
        this.userRegisterationId = localStorage.getItem('userRegisterationId');
        return this.userRegisterationId;
    }

    removeUserRegisterationId() {
        localStorage.removeItem('userRegisterationId');
        this.userRegisterationId = null;
    }

    setStepNumber(stepNumber) {
        this.stepNumber = stepNumber;
    }

    getStepNumber() {
        return this.stepNumber;
    }

    setData(key, data) {
        localStorage.setItem(key, data);
    }

    getData(key) {
        return localStorage.getItem(key);
    }

    removeData(key) {
        localStorage.removeItem(key);
    }

}
