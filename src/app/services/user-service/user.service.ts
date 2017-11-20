import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response, URLSearchParams } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { environment } from '../../environment/environment';
import { ApiService } from '../api-service/api.service';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()
export class UserService {
    authRequired;
    utcOffset;
    constructor(public http: Http, private apiService: ApiService) {

    }

    addThisCustomer(payload) {
        this.authRequired = true;
        this.utcOffset = true;
        // URL
        let url = environment.APP.API_URL + environment.APP.ADD_CUSTOMER;
        return this.apiService.postApi(url, payload, this.authRequired, this.utcOffset);
    }

    getAllCustomers(payload) {
        let url;
        let skip = payload.hasOwnProperty('skip') ? payload.skip : ((payload.currentPage - 1) * payload.limit);

        url = environment.APP.API_URL + environment.APP.GET_ALL_USER + '?role=' + payload.role + '&limit=' + payload.limit + '&skip=' + skip;

        for (let i = 0; i < payload.filter.length; i++) {
            //if (payload.filter[i]  && payload.filter[i] != null ){
            if (payload.filter[i].id == 'isAdminVerified') {
                url += '&isAdminVerified=' + payload.filter[i].value;
            }
            if (payload.filter[i].id == 'isDeleted') {
                url += '&isDeleted=' + payload.filter[i].value;
            }

            if (payload.filter[i].id == 'isBlocked') {
                url += '&isBlocked=' + payload.filter[i].value;
            }
        }
        if (payload.customer && payload.customer != null) {
            //console.log("===============",payload.customer)
            url += '&searchUser=' + payload.customer;
        }

        this.authRequired = true;
        this.utcOffset = false;
        return this.apiService.getApi(url, this.authRequired, this.utcOffset);
    };


    updateCustomer(payload) {
        this.authRequired = true;
        this.utcOffset = false;
        // URL
        let url = environment.APP.API_URL + environment.APP.EDIT_USER_BY_ID_SUCCESS;
        return this.apiService.putApi(url, payload, this.authRequired, this.utcOffset);
    };

    deleteCustomerRecord(payload) {
        this.authRequired = true;
        this.utcOffset = false;
        // PARAMS
        let params = new FormData();
        params.append('userID', payload.userID);
        let url = environment.APP.API_URL + environment.APP.DELETE_USER_BY_ID;
        return this.apiService.deleteApi(url, payload, this.authRequired, this.utcOffset);
    };

    blockThisCustomer(payload) {
        this.authRequired = true;
        this.utcOffset = false;
        let url = environment.APP.API_URL + environment.APP.BLOCK_USER_BY_ID;
        return this.apiService.putApi(url, payload, this.authRequired, this.utcOffset);
    };

    getAllWorkers(payload) {
        let url;
        let skip = payload.hasOwnProperty('skip') ? payload.skip : ((payload.currentPage - 1) * payload.limit);

        url = environment.APP.API_URL + environment.APP.GET_ALL_USER + '?role=' + payload.role + '&limit=' + payload.limit + '&skip=' + skip;

        if (payload && payload.filter) {
            for (let i = 0; i < payload.filter.length; i++) {
                //if (payload.filter[i]  && payload.filter[i] != null ){
                if (payload.filter[i].id == 'isAdminVerified') {
                    url += '&isAdminVerified=' + payload.filter[i].value;
                }
                if (payload.filter[i].id == 'isDeleted') {
                    url += '&isDeleted=' + payload.filter[i].value;
                }
                if (payload.filter[i].id == 'isBlocked') {
                    url += '&isBlocked=' + payload.filter[i].value;
                }
                if (payload.filter[i].id == 'hasCompletedRegistration') {
                    url += '&hasCompletedRegistration=' + payload.filter[i].value;
                }
            }
        }

        //url += '&hasCompletedRegistration=' + 'all';

        if (payload.worker && payload.worker != null) {
            //console.log("===============",payload.customer)
            url += '&searchUser=' + payload.worker;
        }

        this.authRequired = true;
        this.utcOffset = false;
        return this.apiService.getApi(url, this.authRequired, this.utcOffset);
    };

    getWorkerDetail(payload) {
        let url;
        url = environment.APP.API_URL + environment.APP.GET_USER;
        url += '?userID=' + payload.userId;
        this.authRequired = true;
        this.utcOffset = false;
        return this.apiService.getApi(url, this.authRequired, this.utcOffset);
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

    deleteWorkerRecord(payload) {
        this.authRequired = true;
        this.utcOffset = false;
        let params = new FormData();
        params.append('userID', payload.userID);
        let url = environment.APP.API_URL + environment.APP.DELETE_USER_BY_ID;
        return this.apiService.deleteApi(url, payload, this.authRequired, this.utcOffset);
    };

    blockThisWorker(payload) {
        this.authRequired = true;
        this.utcOffset = false;
        let url = environment.APP.API_URL + environment.APP.BLOCK_USER_BY_ID;
        return this.apiService.putApi(url, payload, this.authRequired, this.utcOffset);
    };

    createWorker(payload) {
        this.authRequired = true;
        this.utcOffset = false;
        let url = environment.APP.API_URL + environment.APP.ADD_WORKER;
        return this.apiService.postFileApi(url, payload, this.authRequired, this.utcOffset);
    }

    updateWorker(payload) {
        this.authRequired = true;
        this.utcOffset = false;
        let url = environment.APP.API_URL + environment.APP.EDIT_WORKER_BY_ID_SUCCESS;
        return this.apiService.putApi(url, payload, this.authRequired, this.utcOffset);
    };

    approveWorker(payload) {
        this.authRequired = true;
        this.utcOffset = false;
        let url = environment.APP.API_URL + environment.APP.APPROVE_USER_BY_ID;
        return this.apiService.putApi(url, payload, this.authRequired, this.utcOffset);
    };

    rejectWorker(payload) {
        this.authRequired = true;
        this.utcOffset = false;
        let url = environment.APP.API_URL + environment.APP.REJECT_USER_BY_ID;
        return this.apiService.putApi(url, payload, this.authRequired, this.utcOffset);
    };

    changeWorkerDocumentApproval(payload) {
        this.authRequired = true;
        this.utcOffset = false;
        let url = environment.APP.API_URL + environment.APP.CHANGE_WORKER_DOCUMENT_APPROVAL;
        return this.apiService.putApi(url, payload, this.authRequired, this.utcOffset);
    };

    getAllEmployers(payload) {
        let url;
        let skip = payload.hasOwnProperty('skip') ? payload.skip : ((payload.currentPage - 1) * payload.limit);

        url = environment.APP.API_URL + environment.APP.GET_ALL_USER + '?role=' + payload.role + '&limit=' + payload.limit + '&skip=' + skip;

        if (payload && payload.filter) {
            for (let i = 0; i < payload.filter.length; i++) {

                if (payload.filter[i].id == 'isAdminVerified') {
                    url += '&isAdminVerified=' + payload.filter[i].value;
                }
                if (payload.filter[i].id == 'isDeleted') {
                    url += '&isDeleted=' + payload.filter[i].value;
                }
                if (payload.filter[i].id == 'isBlocked') {
                    url += '&isBlocked=' + payload.filter[i].value;
                }
                if (payload.filter[i].id == 'hasCompletedRegistration') {
                    url += '&hasCompletedRegistration=' + payload.filter[i].value;
                }
            }
        }

        if (payload.employer && payload.employer != null) {
            url += '&searchUser=' + payload.employer;
        }

        this.authRequired = true;
        this.utcOffset = false;
        return this.apiService.getApi(url, this.authRequired, this.utcOffset);
    };

    getEmployerDetail(payload) {
        let url;
        url = environment.APP.API_URL + environment.APP.GET_USER;
        url += '?userID=' + payload.userId;
        this.authRequired = true;
        this.utcOffset = false;
        return this.apiService.getApi(url, this.authRequired, this.utcOffset);
    };

    deleteEmployerRecord(payload) {
        this.authRequired = true;
        this.utcOffset = false;
        let params = new FormData();
        params.append('userID', payload.userID);
        let url = environment.APP.API_URL + environment.APP.DELETE_USER_BY_ID;
        return this.apiService.deleteApi(url, payload, this.authRequired, this.utcOffset);
    };

    blockThisEmployer(payload) {
        this.authRequired = true;
        this.utcOffset = false;
        let url = environment.APP.API_URL + environment.APP.BLOCK_USER_BY_ID;
        return this.apiService.putApi(url, payload, this.authRequired, this.utcOffset);
    };

    createEmployer(payload) {
        this.authRequired = true;
        this.utcOffset = false;
        let url = environment.APP.API_URL + environment.APP.ADD_EMPLOYER;
        return this.apiService.postFileApi(url, payload, this.authRequired, this.utcOffset);
    }
    
    updateEmployer(payload) {
        this.authRequired = true;
        this.utcOffset = false;
        let url = environment.APP.API_URL + environment.APP.EDIT_EMPLOYER_BY_ID_SUCCESS;
        return this.apiService.putApi(url, payload, this.authRequired, this.utcOffset);
    };

    approveEmployer(payload) {
        this.authRequired = true;
        this.utcOffset = false;
        let url = environment.APP.API_URL + environment.APP.APPROVE_USER_BY_ID;
        return this.apiService.putApi(url, payload, this.authRequired, this.utcOffset);
    };

    rejectEmployer(payload) {
        this.authRequired = true;
        this.utcOffset = false;
        let url = environment.APP.API_URL + environment.APP.REJECT_USER_BY_ID;
        return this.apiService.putApi(url, payload, this.authRequired, this.utcOffset);
    };

    changeEmployerDocumentApproval(payload) {
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
