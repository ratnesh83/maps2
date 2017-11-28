import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response, URLSearchParams } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { environment } from '../../environment/environment';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { ApiService } from '../api-service/api.service';

@Injectable()
export class SubscriptionService {
    authRequired;
    utcOffset;
    constructor(public http: Http, private apiService: ApiService) {
    }

    getAllSubscriptions(payload) {
        let url;
        let skip = payload.hasOwnProperty('skip') ? payload.skip : ((payload.currentPage - 1) * payload.limit);
        let applicableFor = payload.applicableFor;

        url = environment.APP.API_URL + environment.APP.GET_ALL_SUBSCRIPTIONS + '?limit=' + payload.limit + '&skip=' + skip + '&applicableFor=' + applicableFor;

        if (payload && payload.filter) {
            for (let i = 0; i < payload.filter.length; i++) {
                if (payload.filter[i].id == 'isDeleted') {
                    url += '&isDeleted=' + payload.filter[i].value;
                }
            }
        }

        if (payload.subscription && payload.subscription != null) {
            url += '&subscriptionName=' + payload.subscription;
        }
        
        this.authRequired = true;
        this.utcOffset = false;
        return this.apiService.getApi(url, this.authRequired, this.utcOffset);
    }

    getSubscriptionDetail(payload) {
        let url;
        url = environment.APP.API_URL + environment.APP.GET_SUBSCRIPTION;
        url += '?subscriptionId=' + payload.subscriptionId;
        this.authRequired = true;
        this.utcOffset = false;
        return this.apiService.getApi(url, this.authRequired, this.utcOffset);
    };

    blockSubscription(payload) {
        this.authRequired = true;
        this.utcOffset = false;
        let params = new FormData();
        params.append('subscriptionId', payload.subscriptionId);
        params.append('isDeleted', payload.isDeleted);
        let url = environment.APP.API_URL + environment.APP.BLOCK_SUBSCRIPTION + '?subscriptionId=' + payload.subscriptionId + '&isDeleted=' + payload.isDeleted;
        return this.apiService.deleteApi(url, payload, this.authRequired, this.utcOffset);
    }

    updateSubscription(payload) {
        this.authRequired = true;
        this.utcOffset = false;
        let url = environment.APP.API_URL + environment.APP.UPDATE_SUBSCRIPTION;
        return this.apiService.postFileApi(url, payload, this.authRequired, this.utcOffset);
    }

    addSubscription(payload) {
        this.authRequired = true;
        this.utcOffset = false;
        let url = environment.APP.API_URL + environment.APP.ADD_SUBSCRIPTION;
        return this.apiService.postFileApi(url, payload, this.authRequired, this.utcOffset);
    }
    getPlans(){
        console.log("3");
        let url = environment.APP.API_URL + environment.APP.GET_PLAN;
        this.authRequired = true;
        this.utcOffset = false;        
        return this.apiService.getApi(url, this.authRequired, this.utcOffset);
    }
    buyPlan(payload){
        console.log("plan");
        let url = environment.APP.API_URL + environment.APP.BUY_PLAN;
        this.authRequired = true;
        this.utcOffset = false;        
        return this.apiService.postFileApi(url,payload,this.authRequired, this.utcOffset);
    }

}



