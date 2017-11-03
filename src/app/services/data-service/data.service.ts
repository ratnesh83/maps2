import { Injectable } from '@angular/core';
import { environment } from '../../environment/environment';

@Injectable()
export class DataService {

    private data: {};
    private userRegisterationId;
    private stepNumber;

    constructor() {
        this.data = {};
        this.stepNumber = 1;
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
        this.data[key] = data;
    }

    getData() {
        return this.data;
    }

    removeData(key) {
        delete this.data[key];
    }

}
