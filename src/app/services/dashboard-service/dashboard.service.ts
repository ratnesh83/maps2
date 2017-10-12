import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response, URLSearchParams } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { environment } from '../../environment/environment';
import { ApiService } from '../api-service/api.service';
import 'rxjs/add/operator/map';


@Injectable()
export class DashboardService {
    authRequired;
    utcOffset;
    constructor(public http: Http, private apiService: ApiService) {

    }

    getDashBoardData() {
        this.authRequired = true;
        this.utcOffset = false;
        let url = environment.APP.API_URL + environment.APP.GET_DASHBOARD_COUNT;
        return this.apiService.getApi(url, this.authRequired, this.utcOffset);
    }

}
