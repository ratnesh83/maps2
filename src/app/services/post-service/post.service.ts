import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response, URLSearchParams } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { environment } from '../../environment/environment';
import { ApiService } from '../api-service/api.service';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()
export class PostService {
    authRequired;
    utcOffset;
    constructor(public http: Http, private apiService: ApiService) {

    }

    getAllPosts(payload) {
        let url;
        let skip = payload.hasOwnProperty('skip') ? payload.skip : ((payload.currentPage - 1) * payload.limit);

        url = environment.APP.API_URL + environment.APP.GET_ALL_JOBS + '?limit=' + payload.limit + '&skip=' + skip;

        if (payload.post && payload.post != null) {
            url += '&searchUser=' + payload.post;
        }

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

    getAllJobs(payload) {
        let url;
        // let skip = payload.hasOwnProperty('skip') ? payload.skip : ((payload.currentPage - 1) * payload.limit);
        this.authRequired = true;
        this.utcOffset = false;
        // url = environment.APP.API_URL + environment.APP.GET_ALL_POSTS + '?type=' + payload.type + '&limit=' + payload.limit + '&skip=' + skip;;
        url = environment.APP.API_URL + environment.APP.GET_ALL_POSTS + '?type=' + payload.type;
        return this.apiService.getApi(url, this.authRequired, this.utcOffset);
    }

    getJob(payload) {
        let url;
        this.authRequired = true;
        this.utcOffset = false;
        url = environment.APP.API_URL + environment.APP.GET_POST + '?jobId=' + payload.jobId;
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

    postJob(data) {
        let url = environment.APP.API_URL + environment.APP.POST_JOB;
        this.authRequired = true;
        this.utcOffset = false;
        return this.apiService.postApi(url, data, this.authRequired, this.utcOffset);
    }

    editPost(payload) {
        this.authRequired = true;
        this.utcOffset = false;
        let formData = new FormData();
        formData.append('title', payload.title);
        formData.append('employerAddress', JSON.stringify(payload.employerAddress));
        formData.append('categoryId', payload.categoryId);
        formData.append('subCategoryId', payload.subCategoryId);
        if (payload && payload.jobDetails) {
            formData.append('jobDetails', payload.jobDetails);
        }
        formData.append('startDate', payload.startDate);
        formData.append('endDate', payload.endDate);
        formData.append('rateType', payload.rateType);
        formData.append('rate', payload.rate);
        formData.append('requiredLabourers', payload.requiredLabourers);
        let url = environment.APP.API_URL + environment.APP.EDIT_POST_JOB + payload.jobId;
        return this.apiService.putFileApi(url, formData, this.authRequired, this.utcOffset);
    }

}
