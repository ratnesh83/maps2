import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response, URLSearchParams } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { environment } from '../../environment/environment';
import { ApiService } from '../api-service/api.service';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()
export class JobService {
    authRequired;
    utcOffset;
    constructor(public http: Http, private apiService: ApiService) {

    }

    getAllJobs(payload) {
        let url;
        let query;
        if (payload && payload.data) {
            query = '?latitude=' + payload.data.latitude + '&longitude=' + payload.data.longitude + '&categoryId=' + payload.data.categoryId + '&addressType=' + payload.data.addressType + '&address=' + JSON.stringify(payload.data.address);
        }
        url = environment.APP.API_URL + environment.APP.GET_ALL_JOBS_POSTS + query;
        this.authRequired = true;
        this.utcOffset = false;
        return this.apiService.getApi(url, this.authRequired, this.utcOffset);
    }

    getAllCategories(payload) {
        let url;
        this.authRequired = false;
        this.utcOffset = false;
        url = environment.APP.API_URL + environment.APP.GET_ALL_CATEGORIES;
        return this.apiService.getApi(url, this.authRequired, this.utcOffset);
    }

    getJob(payload) {
        let url;
        this.authRequired = true;
        this.utcOffset = false;
        url = environment.APP.API_URL + environment.APP.GET_POST + '?jobId=' + payload.jobId;
        return this.apiService.getApi(url, this.authRequired, this.utcOffset);
    }

    acceptJob(payload) {
        this.authRequired = true;
        this.utcOffset = false;
        let url = environment.APP.API_URL + environment.APP.ACCEPT_JOB_BY_LABOR;
        return this.apiService.putApi(url, payload, this.authRequired, this.utcOffset);
    }

    getLabors(payload) {
        let url;
        this.authRequired = true;
        this.utcOffset = false;
        url = environment.APP.API_URL + environment.APP.GET_LABORS + '?jobId=' + payload.jobId;
        return this.apiService.getApi(url, this.authRequired, this.utcOffset);
    }

    getJobDetail(payload) {
        let url;
        url = environment.APP.API_URL + environment.APP.GET_USER;
        url += '?userID=' + payload.userId;
        this.authRequired = true;
        this.utcOffset = false;
        return this.apiService.getApi(url, this.authRequired, this.utcOffset);
    }

}
