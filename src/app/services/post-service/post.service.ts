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
    };

    getAllStaticPosts(payload) {
        let url;
        url = 'assets/json/jobs.json';
        this.authRequired = false;
        this.utcOffset = false;
        return this.apiService.getApi(url, this.authRequired, this.utcOffset);
    };

    getPostDetail(payload) {
        let url;
        url = environment.APP.API_URL + environment.APP.GET_USER;
        url += '?userID=' + payload.userId;
        this.authRequired = true;
        this.utcOffset = false;
        return this.apiService.getApi(url, this.authRequired, this.utcOffset);
    };

    blockThisPost(payload) {
        this.authRequired = true;
        this.utcOffset = false;
        let url = environment.APP.API_URL + environment.APP.BLOCK_USER_BY_ID;
        return this.apiService.putApi(url, payload, this.authRequired, this.utcOffset);
    };

    createPost(payload) {
        this.authRequired = true;
        this.utcOffset = false;
        let url = environment.APP.API_URL + environment.APP.ADD_EMPLOYER;
        return this.apiService.postFileApi(url, payload, this.authRequired, this.utcOffset);
    }
    
    updatePost(payload) {
        this.authRequired = true;
        this.utcOffset = false;
        let url = environment.APP.API_URL + environment.APP.EDIT_EMPLOYER_BY_ID_SUCCESS;
        return this.apiService.putApi(url, payload, this.authRequired, this.utcOffset);
    };

    approvePost(payload) {
        this.authRequired = true;
        this.utcOffset = false;
        let url = environment.APP.API_URL + environment.APP.APPROVE_USER_BY_ID;
        return this.apiService.putApi(url, payload, this.authRequired, this.utcOffset);
    };

    rejectPost(payload) {
        this.authRequired = true;
        this.utcOffset = false;
        let url = environment.APP.API_URL + environment.APP.REJECT_USER_BY_ID;
        return this.apiService.putApi(url, payload, this.authRequired, this.utcOffset);
    };

    changePostDocumentApproval(payload) {
        this.authRequired = true;
        this.utcOffset = false;
        let url = environment.APP.API_URL + environment.APP.CHANGE_EMPLOYER_DOCUMENT_APPROVAL;
        return this.apiService.putApi(url, payload, this.authRequired, this.utcOffset);
    };

    uploadFile(payload) {
        this.authRequired = false;
        this.utcOffset = false;
        let url = environment.APP.API_URL + environment.APP.UPLOAD_FILE;
        return this.apiService.postFileApi(url, payload, this.authRequired, this.utcOffset);
    }

    uploadMultipleFile(payload) {
        this.authRequired = false;
        this.utcOffset = false;
        let url = environment.APP.API_URL + environment.APP.UPLOAD_MULTIPLE_FILES;
        return this.apiService.postFileApi(url, payload, this.authRequired, this.utcOffset);
    }

    getCountryCodes(payload) {
        let url;
        url = 'assets/json/country.json';
        this.authRequired = false;
        this.utcOffset = false;
        return this.apiService.getApi(url, this.authRequired, this.utcOffset);
    };

}
