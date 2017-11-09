import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response, URLSearchParams } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { environment } from '../../environment/environment';
import { ApiService } from '../api-service/api.service';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()
export class FeedbackService {

    authRequired;
    utcOffset;

    constructor(public http: Http, private apiService: ApiService) {
    }

    getAllFeedbacks(payload) {
        let url;
        let skip = payload.hasOwnProperty('skip') ? payload.skip : ((payload.currentPage - 1) * payload.limit);
        url = environment.APP.API_URL + environment.APP.GET_ALL_JOBS + '?limit=' + payload.limit + '&skip=' + skip;
        for (let i = 0; i < payload.filter.length; i++) {
        
        }
        if (payload.feedback && payload.feedback != null) {
            url += '&searchFeedback=' + payload.job;
        }
        this.authRequired = true;
        this.utcOffset = false;
        return this.apiService.getApi(url, this.authRequired, this.utcOffset);
    };
    
}