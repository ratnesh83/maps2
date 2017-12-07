import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response, URLSearchParams } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { environment } from '../../environment/environment';
import { ApiService } from '../api-service/api.service';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()
export class MyNetworkService {

    authRequired;
    utcOffset;
    
    constructor(public http: Http, private apiService: ApiService) {

    }

    getAllLabors(payload) {
        let query;
        if (payload && payload.data) {
            query = '?latitude=' + payload.data.latitude + '&longitude=' + payload.data.longitude + '&categoryId=' + payload.data.categoryId + '&addressType=' + payload.data.addressType + '&address=' + JSON.stringify(payload.data.address);
        }
        let url = environment.APP.API_URL + environment.APP.GET_ALL_LABORS + query;
        this.authRequired = true;
        this.utcOffset = false;
        return this.apiService.getApi(url, this.authRequired, this.utcOffset);
    }

    getAllLaborList(payload) {
        let query;
        if (payload && payload.data) {
            query = '?latitude=' + payload.data.latitude + '&longitude=' + payload.data.longitude + '&sortBy=' + payload.data.sortBy;;
        }
        let url = environment.APP.API_URL + environment.APP.GET_ALL_LABOR_LIST + query;
        this.authRequired = true;
        this.utcOffset = false;
        return this.apiService.getApi(url, this.authRequired, this.utcOffset);
    }

    getAllEmployerList(payload) {
        let url = environment.APP.API_URL + environment.APP.GET_EMPLOYERS;
        this.authRequired = true;
        this.utcOffset = false;
        return this.apiService.getApi(url, this.authRequired, this.utcOffset);
    }

    getAllFriendList(payload) {
        let url = environment.APP.API_URL + environment.APP.GET_FRIENDS;
        this.authRequired = true;
        this.utcOffset = false;
        return this.apiService.getApi(url, this.authRequired, this.utcOffset);
    }

    getAllCompaniesList(payload) {
        let url = environment.APP.API_URL + environment.APP.GET_COMPANIES;
        this.authRequired = true;
        this.utcOffset = false;
        return this.apiService.getApi(url, this.authRequired, this.utcOffset);
    }

    getAllCategories(payload) {
        this.authRequired = false;
        this.utcOffset = false;
        let url = environment.APP.API_URL + environment.APP.GET_ALL_CATEGORIES;
        return this.apiService.getApi(url, this.authRequired, this.utcOffset);
    }

    getLaborDetail(payload) {
        let url = environment.APP.API_URL + environment.APP.GET_USER;
        url += '?userID=' + payload.userId;
        this.authRequired = true;
        this.utcOffset = false;
        return this.apiService.getApi(url, this.authRequired, this.utcOffset);
    }

    getTopList(payload) {
        this.authRequired = true;
        this.utcOffset = false;
        let url = environment.APP.API_URL + environment.APP.GET_TOP_LIST;
        return this.apiService.getApi(url, this.authRequired, this.utcOffset);
    }

    sendInvite(payload) {
        let url = environment.APP.API_URL + environment.APP.SEND_INVITE;
        this.authRequired = true;
        this.utcOffset = false;
        return this.apiService.postFileApi(url, payload.form, this.authRequired, this.utcOffset);
    }

}
