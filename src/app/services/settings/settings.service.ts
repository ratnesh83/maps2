import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response, URLSearchParams } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { environment } from '../../environment/environment';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { ApiService } from '../api-service/api.service';

@Injectable()
export class SettingsService {
    authRequired;
    utcOffset;
    contentTypeRequired;
    constructor(public http: Http, private apiService: ApiService) {
    }

    addThisKey(payload) {

        let token = localStorage.getItem('token');
        let headerToken = 'Bearer ' + token;
        let headers = new Headers({
            'content-language': 'en',

        });
        headers.append('Authorization', headerToken);
        let options = new RequestOptions({
            'headers': headers,
        });
       
        let url = environment.APP.API_URL + environment.APP.SETTINGS_KEY_MESSAGE;

        return this.http.post(url, payload, options)
            .map((res: Response) => res.json())
            .catch((error: any) => {
                try {
                    return (Observable.throw(error.json()));
                } catch (jsonError) {
                    let minimumViableError = {
                        success: false
                    };
                    return (Observable.throw(minimumViableError));
                }
            });
    };

    getServiceRadii(payload) {
        let url;
        url = environment.APP.API_URL + environment.APP.GET_SERVICE_RADII;
        this.authRequired = true;
        this.utcOffset = false;
        return this.apiService.getApi(url, this.authRequired, this.utcOffset);
    };

    getQualification(payload) {
        let url;
        url = environment.APP.API_URL + environment.APP.GET_QUALIFICATION;
        url += '?isDeleted=' + payload.isDeleted;
        this.authRequired = true;
        this.utcOffset = false;
        return this.apiService.getApi(url, this.authRequired, this.utcOffset);
    };

    getExpertise(payload) {
        let url;
        url = environment.APP.API_URL + environment.APP.GET_EXPERTISE;
        url += '?isDeleted=' + payload.isDeleted;
        this.authRequired = true;
        this.utcOffset = false;
        return this.apiService.getApi(url, this.authRequired, this.utcOffset);
    };

    getEquipments(payload) {
        let url;
        url = environment.APP.API_URL + environment.APP.GET_EQUIPMENTS;
        //url += '?isDeleted=' + payload.isDeleted;
        this.authRequired = true;
        this.utcOffset = false;
        return this.apiService.getApi(url, this.authRequired, this.utcOffset);
    };

    setServiceRadii(payload) {
        this.authRequired = true;
        this.utcOffset = false;
        let url = environment.APP.API_URL + environment.APP.SET_SERVICE_RADII;
        return this.apiService.postApi(url, payload, this.authRequired, this.utcOffset);
    };

    setQualification(payload) {
        this.authRequired = true;
        this.utcOffset = false;
        let url = environment.APP.API_URL + environment.APP.SET_QUALIFICATION;
        return this.apiService.postApi(url, payload, this.authRequired, this.utcOffset);
    };

    setExpertise(payload) {
        this.authRequired = true;
        this.utcOffset = false;
        let url = environment.APP.API_URL + environment.APP.SET_EXPERTISE;
        return this.apiService.postApi(url, payload, this.authRequired, this.utcOffset);
    };

    addMachine(payload) {
        this.authRequired = true;
        this.utcOffset = false;
        let url = environment.APP.API_URL + environment.APP.ADD_MACHINE;
        return this.apiService.postApi(url, payload, this.authRequired, this.utcOffset);
    };

    updateQualification(payload) {
        this.authRequired = true;
        this.utcOffset = false;
        let url = environment.APP.API_URL + environment.APP.UPDATE_QUALIFICATION;
        return this.apiService.putApi(url, payload, this.authRequired, this.utcOffset);
    };

    updateExpertise(payload) {
        this.authRequired = true;
        this.utcOffset = false;
        let url = environment.APP.API_URL + environment.APP.UPDATE_EXPERTISE;
        return this.apiService.putApi(url, payload, this.authRequired, this.utcOffset);
    };

    updateEquipments(payload) {
        this.authRequired = true;
        this.utcOffset = false;
        let url = environment.APP.API_URL + environment.APP.UPDATE_MACHINE;
        return this.apiService.putApi(url, payload, this.authRequired, this.utcOffset);
    };

    uploadFile(payload) {
        this.authRequired = false;
        this.utcOffset = false;
        let url = environment.APP.API_URL + environment.APP.UPLOAD_FILE;
        return this.apiService.postFileApi(url, payload, this.authRequired, this.utcOffset);
    }
    getProfileInfo(payload) {
        // let skip = (payload.currentPage - 1) * payload.limit;
        let url = environment.APP.API_URL + environment.APP.GET_PROFILE_INFO+"?userId="+payload;
        this.authRequired = true;
        this.utcOffset = false;
        return this.apiService.getApi(url, this.authRequired, this.utcOffset);
      }

      updateProfileInfo(payload) {
        // let skip = (payload.currentPage - 1) * payload.limit;
        let url = environment.APP.API_URL + environment.APP.UPDATE_PROFILE_INFO;
        this.authRequired = true;
        this.utcOffset = false;        
        return this.apiService.putFileApi(url,payload,this.authRequired, this.utcOffset);
      }
      addCard(payload){
        let url = environment.APP.API_URL + environment.APP.ADD_CARD;
        this.authRequired = true;
        this.utcOffset = false;        
        return this.apiService.postFileApi(url,payload,this.authRequired, this.utcOffset);
      }
      getCards(payload){
        let url = environment.APP.API_URL + environment.APP.GET_CARDS;
        this.authRequired = true;
        this.utcOffset = false;        
        return this.apiService.getApi(url, this.authRequired, this.utcOffset);
      }
}



