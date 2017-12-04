import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response, URLSearchParams } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { environment } from '../../environment/environment';
import { ApiService } from '../api-service/api.service';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()
export class RequestService {
    authRequired;
    utcOffset;
    constructor(public http: Http, private apiService: ApiService) {

    }

    getAllCategories(payload) {
        let url;
        this.authRequired = false;
        this.utcOffset = false;
        url = environment.APP.API_URL + environment.APP.GET_ALL_CATEGORIES;
        return this.apiService.getApi(url, this.authRequired, this.utcOffset);
    }

    getAllRequests(payload) {
        let url;
        // let skip = payload.hasOwnProperty('skip') ? payload.skip : ((payload.currentPage - 1) * payload.limit);
        this.authRequired = true;
        this.utcOffset = false;
        // url = environment.APP.API_URL + environment.APP.GET_ALL_POSTS + '?type=' + payload.type + '&limit=' + payload.limit + '&skip=' + skip;;
        url = environment.APP.API_URL + environment.APP.GET_ALL_REQUESTS + '?type=' + payload.type;
        return this.apiService.getApi(url, this.authRequired, this.utcOffset);
    }

    getRequest(payload) {
        let url;
        this.authRequired = true;
        this.utcOffset = false;
        url = environment.APP.API_URL + environment.APP.GET_POST + '?jobId=' + payload.requestId;
        return this.apiService.getApi(url, this.authRequired, this.utcOffset);
    }

    getLabors(payload) {
        let url;
        this.authRequired = true;
        this.utcOffset = false;
        url = environment.APP.API_URL + environment.APP.GET_LABORS + '?jobId=' + payload.jobId;
        return this.apiService.getApi(url, this.authRequired, this.utcOffset);
    }

    getAllSubCategories(payload) {
        let url;
        this.authRequired = false;
        this.utcOffset = false;
        url = environment.APP.API_URL + environment.APP.GET_ALL_SUB_CATEGORIES + '?categoryId=' + payload.id;
        return this.apiService.getApi(url, this.authRequired, this.utcOffset);
    }

    requestJob(data) {
        let url = environment.APP.API_URL + environment.APP.POST_JOB;
        this.authRequired = true;
        this.utcOffset = false;
        return this.apiService.postApi(url, data, this.authRequired, this.utcOffset);
    }

    cancelJob(payload) {
        this.authRequired = true;
        this.utcOffset = false;
        let url = environment.APP.API_URL + environment.APP.ACCEPT_JOB_BY_LABOR;
        return this.apiService.putApi(url, payload, this.authRequired, this.utcOffset);
    }

    checkApply(payload) {
        let url;
        this.authRequired = true;
        this.utcOffset = false;
        url = environment.APP.API_URL + environment.APP.CHECK_APPLY + '?jobId=' + payload.jobId + '&labourId=' + payload.laborId;
        return this.apiService.getApi(url, this.authRequired, this.utcOffset);
    }

    acceptJob(payload) {
        this.authRequired = true;
        this.utcOffset = false;
        let url = environment.APP.API_URL + environment.APP.ACCEPT_JOB_BY_LABOR;
        return this.apiService.putApi(url, payload, this.authRequired, this.utcOffset);
    }

    postFeedback(payload) {
        this.authRequired = true;
        this.utcOffset = false;
        let formData = new FormData();
        formData.append('userId', payload.userId);
        formData.append('to', payload.to);
        formData.append('rating', payload.rating);
        if (payload && payload.feedback) {
            formData.append('feedback', payload.feedback);
        }
        let url = environment.APP.API_URL + environment.APP.POST_FEEDBACK + payload.jobId;
        return this.apiService.putFileApi(url, formData, this.authRequired, this.utcOffset);
    }

}
