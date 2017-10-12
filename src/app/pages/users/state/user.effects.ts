import { Injectable } from '@angular/core';
import { Effect, Actions } from '@ngrx/effects';
import { Action, Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { Router } from '@angular/router';
import { ToastrService, ToastrConfig } from 'ngx-toastr';
const types = ['success', 'error', 'info', 'warning'];
import { cloneDeep, random } from 'lodash';
import { UserService } from '../../../services/user-service/user.service';
import * as customer from './user.actions';
import * as worker from './user.actions';
import * as employer from './user.actions';
import * as app from '../../../state/app.actions';
import { BaImageLoaderService, BaThemePreloader, BaThemeSpinner } from '../../../theme/services';


@Injectable()
export class UserEffects {

    @Effect({ dispatch: false })
    addThisCustomer$ = this.actions$
        .ofType('ADD_THIS_CUSTOMER')
        .withLatestFrom(this.store)
        .do((storeState) => {
            let action = storeState[0];
            let state = storeState[1].customer;
            this.UserService
                .addThisCustomer(action.payload)
                .subscribe((result) => {
                    if (result.message == 'Success') {
                        let message = 'Successfully created customer';
                        let title = 'Authentication';
                        this.toastrService.clear();
                        this.toastrService.success(message, title);
                        /* this.store.dispatch({
                            type: customer.actionTypes.APP_GETALL_CUSTOMER, payload: {
                                currentPage: state.currentPage, limit: state.limit,
                                role: 'customer',   
                                filter: state.filter
                            }
                        }); */
                        this.store.dispatch({
                            type: customer.actionTypes.ADD_THIS_CUSTOMER_SUCCESS,
                            payload: result
                        });

                    }
                }, (error) => {
                    /* this.store.dispatch({
                        type: customer.actionTypes.CUSTOMER_ERROR, payload: error
                    }); */
                });
        });


    @Effect({ dispatch: false })
    ADDCustomerSuccess$ = this.actions$
        .ofType('ADD_THIS_CUSTOMER_SUCCESS')
        .do((action) => {
        });

    @Effect({ dispatch: false })
    singleBooking: Observable<Action> = this.actions$
        .ofType('CHANGE_ALL_CUSTOMER')
        .do((action) => {
            this.router.navigate(['pages/users/customers']);

        });

    @Effect({ dispatch: false })
    NewCustomerData$ = this.actions$
        .ofType('NEW_CUSTOMER_DATA')
        .do((action) => {
        });

    @Effect({ dispatch: false })
    getAllWorkers$ = this.actions$
        .ofType('APP_GETALL_WORKER')
        .do((action) => {
            this._spinner.show();
            this.UserService.getAllWorkers(action.payload).subscribe((result) => {
                this._spinner.hide();
                if (result.message == 'Success') {
                    //console.log(result);
                    let filters = (action.payload.filter) ? action.payload.filter : null;
                    let payload = {
                        workers: result.data.users,
                        count: result.data.count,
                        currentPage: action.payload.currentPage,
                        limit: action.payload.limit,
                        filter: filters
                    };
                    this.store.dispatch(new worker.AppWorkerDetailSuccess(payload));
                }
            }
                , (error) => {
                    this._spinner.hide();
                    if (error.statusCode === 401 || error.statusCode === 403) {
                        this.store.dispatch({
                            type: app.actionTypes.APP_AUTHENTICATION_FAIL, payload: error
                        });
                    } else {
                        this.store.dispatch({
                            type: worker.actionTypes.WORKER_ERROR, payload: error
                        });
                    }
                }
            );
        });

    @Effect({ dispatch: false })
    getWorkerDetail$ = this.actions$
        .ofType('APP_GET_WORKER_DETAIL')
        .do((action) => {
            this._spinner.show();
            this.UserService.getWorkerDetail(action.payload).subscribe((result) => {
                this._spinner.hide();
                if (result.message == 'Success') {
                    let payload = {
                        worker: result.data
                    };
                    this.store.dispatch(new worker.AppGetWorkerDetailSuccess(payload));
                }
            }
                , (error) => {
                    this._spinner.hide();
                    if (error.statusCode === 401 || error.statusCode === 403) {
                        this.store.dispatch({
                            type: app.actionTypes.APP_AUTHENTICATION_FAIL, payload: error
                        });
                    } else {
                        this.store.dispatch({
                            type: worker.actionTypes.WORKER_ERROR, payload: error
                        });
                    }
                }
            );
        });

    @Effect({ dispatch: false })
    getServiceRadii$ = this.actions$
        .ofType('APP_GET_SERVICE_RADII')
        .do((action) => {
            this.UserService.getServiceRadii(action.payload).subscribe((result) => {
                if (result.message == 'Success') {
                    let payload = {
                        settings: result.data
                    };
                    this.store.dispatch(new worker.AppGetServiceRadiiSuccess(payload));
                }
            }
                , (error) => {
                    if (error.statusCode === 401 || error.statusCode === 403) {
                        this.store.dispatch({
                            type: app.actionTypes.APP_AUTHENTICATION_FAIL, payload: error
                        });
                    } else {
                        this.store.dispatch({
                            type: worker.actionTypes.WORKER_ERROR, payload: error
                        });
                    }
                }
            );
        });

    @Effect({ dispatch: false })
    getServiceRadiiSuccess: Observable<Action> = this.actions$
        .ofType('APP_GET_SERVICE_RADII_SUCCESS')
        .do((action) => {
            this.store.dispatch({
                type: worker.actionTypes.APP_GET_QUALIFICATIONS,
                payload: {
                    isDeleted: false
                }
            });

        });

    @Effect({ dispatch: false })
    getQualification$ = this.actions$
        .ofType('APP_GET_QUALIFICATIONS')
        .do((action) => {
            this.UserService.getQualification(action.payload).subscribe((result) => {
                if (result.message == 'Success') {
                    let payload = {
                        qualifications: result.data
                    };
                    this.store.dispatch(new worker.AppGetQualificationSuccess(payload));
                }
            }
                , (error) => {
                    if (error.statusCode === 401 || error.statusCode === 403) {
                        this.store.dispatch({
                            type: app.actionTypes.APP_AUTHENTICATION_FAIL, payload: error
                        });
                    } else {
                        this.store.dispatch({
                            type: worker.actionTypes.WORKER_ERROR, payload: error
                        });
                    }
                }
            );
        });

    @Effect({ dispatch: false })
    getQualificationSuccess: Observable<Action> = this.actions$
        .ofType('APP_GET_QUALIFICATIONS_SUCCESS')
        .do((action) => {
            this.store.dispatch({
                type: worker.actionTypes.APP_GET_THE_EXPERTISE,
                payload: {
                    isDeleted: false
                }
            });
        });

    @Effect({ dispatch: false })
    getExpertise$ = this.actions$
        .ofType('APP_GET_THE_EXPERTISE')
        .do((action) => {
            this.UserService.getExpertise(action.payload).subscribe((result) => {
                if (result.message == 'Success') {
                    let payload = {
                        expertise: result.data
                    };
                    this.store.dispatch(new worker.AppGetExpertiseSuccess(payload));
                }
            }
                , (error) => {
                    if (error.statusCode === 401 || error.statusCode === 403) {
                        this.store.dispatch({
                            type: app.actionTypes.APP_AUTHENTICATION_FAIL, payload: error
                        });
                    } else {
                        this.store.dispatch({
                            type: worker.actionTypes.WORKER_ERROR, payload: error
                        });
                    }
                }
            );
        });

    @Effect({ dispatch: false })
    getExpertiseSuccess: Observable<Action> = this.actions$
        .ofType('APP_GET_THE_EXPERTISE_SUCCESS')
        .do((action) => {
            this.store.dispatch({
                type: worker.actionTypes.APP_GET_MACHINES,
                payload: {
                    isDeleted: false
                }
            });
        });

    @Effect({ dispatch: false })
    getMachines$ = this.actions$
        .ofType('APP_GET_MACHINES')
        .do((action) => {
            this.UserService.getEquipments(action.payload).subscribe((result) => {
                if (result.message == 'Success') {
                    let payload = {
                        equipments: result.data ? result.data.machineData : result.data
                    };
                    this.store.dispatch(new worker.AppGetMachinesSuccess(payload));
                }
            }
                , (error) => {
                    if (error.statusCode === 401 || error.statusCode === 403) {
                        this.store.dispatch({
                            type: app.actionTypes.APP_AUTHENTICATION_FAIL, payload: error
                        });
                    } else {
                        this.store.dispatch({
                            type: worker.actionTypes.WORKER_ERROR, payload: error
                        });
                    }
                }
            );
        });

    @Effect({ dispatch: false })
    getMachinesSuccess: Observable<Action> = this.actions$
        .ofType('APP_GET_MACHINES_SUCCESS')
        .do((action) => {

        });

    @Effect({ dispatch: false })
    SearchWorker$ = this.actions$
        .ofType('SEARCH_WORKER_DETAIL')
        .withLatestFrom(this.store)
        .do((storeState) => {
            let action = storeState[0];
            let state = storeState[1].worker;
            this.UserService
                .getAllWorkers(action.payload)
                .subscribe((result) => {
                    if (result.message == 'Success') {

                        let filters = (action.payload.filter) ? action.payload.filter : null;
                        if (result.data.count == 0) {

                            let payload = {
                                workers: result.data.users,
                                count: result.data.count,
                                currentPage: action.payload.currentPage,
                                limit: action.payload.limit,
                                filter: filters
                            };

                            this.store.dispatch(new worker.AppWorkerDetailSuccess(payload));

                        }
                        let payload = {
                            workers: result.data.users,
                            count: result.data.count,
                            currentPage: action.payload.currentPage,
                            limit: action.payload.limit,
                            filter: filters
                        };
                        this.store.dispatch(new worker.AppWorkerDetailSuccess(payload));

                    }
                }, (error) => {
                    if (error.statusCode === 401 || error.statusCode === 403) {
                        this.store.dispatch({
                            type: app.actionTypes.APP_AUTHENTICATION_FAIL, payload: error
                        });
                    } else {
                        this.store.dispatch({
                            type: worker.actionTypes.WORKER_ERROR, payload: error
                        });
                    }
                });
        });

    @Effect({ dispatch: false })
    workerDetailSuccess: Observable<Action> = this.actions$
        .ofType('APP_GET_WORKER_DETAIL_SUCCESS')
        .do((action) => {
            this.store.dispatch({
                type: worker.actionTypes.APP_GET_SERVICE_RADII,
                payload: {}
            });
        });

    @Effect({ dispatch: false })
    showWorkerDetail: Observable<Action> = this.actions$
        .ofType('SHOW_WORKER_DETAIL')
        .do((action) => {

        });

    @Effect({ dispatch: false })
    deleteWorkerRecordConfirm$ = this.actions$
        .ofType('DELETE_WORKER_RECORD_CONFIRM')
        .do((action) => {

        });

    @Effect({ dispatch: false })
    blockThisWorker$ = this.actions$
        .ofType('BLOCK_THIS_WORKER')
        .withLatestFrom(this.store)
        .do((storeState) => {
            let action = storeState[0];
            let state = storeState[1].worker;
            this._spinner.show();
            this.UserService
                .blockThisWorker(action.payload.blockId)
                .subscribe((result) => {
                    this._spinner.hide();
                    if (result.message == 'Success') {
                        this.store.dispatch({
                            type: worker.actionTypes.APP_GETALL_WORKER, payload: {
                                currentPage: state.currentPage, limit: state.limit,
                                role: action.payload.role,
                                filter: state.filter
                            }
                        });
                        let message;
                        let title = 'Success';
                        if (action.payload.blockId && action.payload.blockId.isBlocked == true) {
                            message = 'Worker Blocked';
                        } else {
                            message = 'Worker Unblocked';
                        }
                        this.toastrService.clear();
                        this.toastrService.success(message, title);

                    }
                }, (error) => {
                    this._spinner.hide();
                    if (error.statusCode === 401 || error.statusCode === 403) {
                        this.store.dispatch({
                            type: app.actionTypes.APP_AUTHENTICATION_FAIL, payload: error
                        });
                    } else {
                        this.store.dispatch({
                            type: worker.actionTypes.WORKER_ERROR, payload: error
                        });
                    }
                });
        });

    @Effect({ dispatch: false })
    deleteWorkerRecord$ = this.actions$
        .ofType('DELETE_WORKER_RECORD')
        .withLatestFrom(this.store)
        .do((storeState) => {
            let action = storeState[0];
            let state = storeState[1].worker;
            this._spinner.show();
            this.UserService
                .deleteWorkerRecord(action.payload.deleteId)
                .subscribe((result) => {
                    this._spinner.hide();
                    if (result.message == 'Success') {
                        this.store.dispatch({
                            type: worker.actionTypes.APP_GETALL_WORKER, payload: {
                                currentPage: state.currentPage, limit: state.limit,
                                role: action.payload.role,
                                filter: state.filter
                            }
                        });
                        let message = 'Worker Deleted';
                        let title = 'Success';
                        this.toastrService.clear();
                        this.toastrService.success(message, title);
                    }
                }
                , (error) => {
                    this._spinner.hide();
                    if (error.statusCode === 401 || error.statusCode === 403) {
                        this.store.dispatch({
                            type: app.actionTypes.APP_AUTHENTICATION_FAIL, payload: error
                        });
                    } else {
                        this.store.dispatch({
                            type: worker.actionTypes.WORKER_ERROR, payload: error
                        });
                    }
                });
        });

    @Effect({ dispatch: false })
    blockWorkerRecordConfirm$ = this.actions$
        .ofType('BLOCK_THIS_WORKER_CONFIRM')
        .do((action) => {

        });

    @Effect({ dispatch: false })
    errorWorker$ = this.actions$
        .ofType('WORKER_ERROR')
        .do((action) => {
            this._spinner.hide();
            let message = action.payload.message;
            let title = 'Error';
            this.toastrService.clear();
            this.toastrService.error(message, title);
        });


    @Effect({ dispatch: false })
    editWorkerRecordConfirm$ = this.actions$
        .ofType('EDIT_THIS_WORKER_CONFIRM')
        .do((action) => {

        });

    @Effect({ dispatch: false })
    editThisWorker$ = this.actions$
        .ofType('EDIT_THIS_WORKER')
        .withLatestFrom(this.store)
        .do((storeState) => {

            let action = storeState[0];
            let state = storeState[1].worker;

            this.UserService
                .updateWorker(action.payload)
                .subscribe((result) => {
                    if (result.message == 'Success') {
                        if (localStorage.getItem('editWorkerId') != undefined) {
                            this.store.dispatch({
                                type: worker.actionTypes.APP_GET_WORKER_DETAIL,
                                payload: {
                                    userId: localStorage.getItem('editWorkerId')
                                }
                            });
                        }
                        this.store.dispatch({
                            type: worker.actionTypes.EDIT_WORKER_SUCCESS,
                            payload: result
                        });
                        let message = 'Worker successfully updated';
                        let title = 'Success';
                        this.toastrService.clear();
                        this.toastrService.success(message, title);
                    }
                }, (error) => {
                    if (error.statusCode === 401 || error.statusCode === 403) {
                        this.store.dispatch({
                            type: app.actionTypes.APP_AUTHENTICATION_FAIL, payload: error
                        });
                    } else {
                        this.store.dispatch({
                            type: worker.actionTypes.WORKER_ERROR, payload: error
                        });
                    }
                });
        });

    @Effect({ dispatch: false })
    createWorker$ = this.actions$
        .ofType('CREATE_WORKER')
        .withLatestFrom(this.store)
        .do((storeState) => {

            let action = storeState[0];
            let state = storeState[1].worker;

            this.UserService
                .createWorker(action.payload.data)
                .subscribe((result) => {
                    if (result.message == 'Success') {

                        this.store.dispatch({
                            type: worker.actionTypes.CREATE_WORKER_SUCCESS,
                            payload: result
                        });
                        this.store.dispatch({
                            type: worker.actionTypes.APP_GETALL_WORKER,
                            payload: {
                                currentPage: state.currentPage,
                                limit: state.limit,
                                role: action.payload.role,
                                filter: state.filter
                            }
                        });
                        let message = 'Worker successfully created';
                        let title = 'Success';
                        this.toastrService.clear();
                        this.toastrService.success(message, title);
                    }
                }, (error) => {
                    if (error.statusCode === 401 || error.statusCode === 403) {
                        this.store.dispatch({
                            type: app.actionTypes.APP_AUTHENTICATION_FAIL, payload: error
                        });
                    } else {
                        this.store.dispatch({
                            type: worker.actionTypes.WORKER_ERROR, payload: error
                        });
                    }
                });
        });

    @Effect({ dispatch: false })
    createWorkerSuccess$ = this.actions$
        .ofType('CREATE_WORKER_SUCCESS')
        .do((action) => {
        });

    @Effect({ dispatch: false })
    approveThisWorker$ = this.actions$
        .ofType('APPROVE_WORKER')
        .withLatestFrom(this.store)
        .do((storeState) => {

            let action = storeState[0];
            let state = storeState[1].worker;
            this._spinner.show();
            this.UserService
                .approveWorker(action.payload)
                .subscribe((result) => {
                    this._spinner.hide();
                    if (result.message == 'Success') {
                        if (localStorage.getItem('editWorkerId') != undefined) {
                            this.store.dispatch({
                                type: worker.actionTypes.APP_GET_WORKER_DETAIL,
                                payload: {
                                    userId: localStorage.getItem('editWorkerId')
                                }
                            });
                        }
                        this.store.dispatch({
                            type: worker.actionTypes.APPROVE_WORKER_SUCCESS,
                            payload: result
                        });
                        let message = 'Worker Approved';
                        let title = 'Success';
                        this.toastrService.clear();
                        this.toastrService.success(message, title);
                    }
                }, (error) => {
                    this._spinner.hide();
                    if (error.statusCode === 401 || error.statusCode === 403) {
                        this.store.dispatch({
                            type: app.actionTypes.APP_AUTHENTICATION_FAIL, payload: error
                        });
                    } else {
                        this.store.dispatch({
                            type: worker.actionTypes.WORKER_ERROR, payload: error
                        });
                    }
                });
        });

    @Effect({ dispatch: false })
    rejectThisWorker$ = this.actions$
        .ofType('REJECT_WORKER')
        .withLatestFrom(this.store)
        .do((storeState) => {

            let action = storeState[0];
            let state = storeState[1].worker;
            this._spinner.show();
            this.UserService
                .rejectWorker(action.payload)
                .subscribe((result) => {
                    this._spinner.hide();
                    if (result.message == 'Success') {
                        if (localStorage.getItem('editWorkerId') != undefined) {
                            this.store.dispatch({
                                type: worker.actionTypes.APP_GET_WORKER_DETAIL,
                                payload: {
                                    userId: localStorage.getItem('editWorkerId')
                                }
                            });
                        }
                        let message = 'Worker Rejected';
                        let title = 'Success';
                        this.toastrService.clear();
                        this.toastrService.success(message, title);
                    }
                }, (error) => {
                    this._spinner.hide();
                    if (error.statusCode === 401 || error.statusCode === 403) {
                        this.store.dispatch({
                            type: app.actionTypes.APP_AUTHENTICATION_FAIL, payload: error
                        });
                    } else {
                        this.store.dispatch({
                            type: worker.actionTypes.WORKER_ERROR, payload: error
                        });
                    }
                });
        });

    @Effect({ dispatch: false })
    changeWorkerDocumentApproval$ = this.actions$
        .ofType('CHANGE_WORKER_DOCUMENT_APPROVAL')
        .withLatestFrom(this.store)
        .do((storeState) => {

            let action = storeState[0];
            let state = storeState[1].worker;
            this._spinner.show();
            this.UserService
                .changeWorkerDocumentApproval(action.payload.data)
                .subscribe((result) => {
                    this._spinner.hide();
                    if (result.message == 'Success') {
                        if (localStorage.getItem('editWorkerId') != undefined) {
                            this.store.dispatch({
                                type: worker.actionTypes.APP_GET_WORKER_DETAIL,
                                payload: {
                                    userId: localStorage.getItem('editWorkerId')
                                }
                            });
                        }
                        let message;
                        if (action.payload.rejection == true) {
                            message = 'Worker Document Rejected';
                        } else {
                            message = 'Worker Document Approved';
                        }
                        let title = 'Success';
                        this.toastrService.clear();
                        this.toastrService.success(message, title);
                    }
                }, (error) => {
                    this._spinner.hide();
                    if (error.statusCode === 401 || error.statusCode === 403) {
                        this.store.dispatch({
                            type: app.actionTypes.APP_AUTHENTICATION_FAIL, payload: error
                        });
                    } else {
                        this.store.dispatch({
                            type: worker.actionTypes.WORKER_ERROR, payload: error
                        });
                    }
                });
        });

    @Effect({ dispatch: false })
    EditWorkerSuccess$ = this.actions$
        .ofType('EDIT_WORKER_SUCCESS')
        .do((action) => {
        });

    @Effect({ dispatch: false })
    uploadWorkerFile$ = this.actions$
        .ofType('UPLOAD_WORKER_FILE')
        .withLatestFrom(this.store)
        .do((storeState) => {
            let action = storeState[0];
            let state = storeState[1].worker;
            this.UserService
                .uploadFile(action.payload.data)
                .subscribe((result) => {
                    if (result.message == 'Success') {
                        let fileUplaod;
                        if (action.payload.index != undefined && action.payload.parentIndex != undefined) {
                            fileUplaod = {
                                fileUploadUrl: result.data,
                                type: action.payload.type,
                                index: action.payload.index,
                                parentIndex: action.payload.parentIndex
                            };
                        } else if (action.payload.index != undefined) {
                            fileUplaod = {
                                fileUploadUrl: result.data,
                                type: action.payload.type,
                                index: action.payload.index
                            };
                        } else {
                            fileUplaod = {
                                fileUploadUrl: result.data,
                                type: action.payload.type
                            };
                        }
                        this.store.dispatch({
                            type: worker.actionTypes.UPLOAD_WORKER_FILE_SUCCESS, payload: {
                                fileUpload: fileUplaod
                            }
                        });
                    }
                }, (error) => {
                    if (error.statusCode === 401 || error.statusCode === 403) {
                        this.store.dispatch({
                            type: app.actionTypes.APP_AUTHENTICATION_FAIL, payload: error
                        });
                    } else {
                        this.store.dispatch({
                            type: worker.actionTypes.WORKER_ERROR, payload: error
                        });
                    }
                });
        });

    @Effect({ dispatch: false })
    uploadWorkerFileSuccess: Observable<Action> = this.actions$
        .ofType('UPLOAD_WORKER_FILE_SUCCESS')
        .do((action) => {

        });

    @Effect({ dispatch: false })
    uploadWorkerMultipleFile$ = this.actions$
        .ofType('UPLOAD_WORKER_MULTIPLE_FILE')
        .withLatestFrom(this.store)
        .do((storeState) => {
            let action = storeState[0];
            let state = storeState[1].worker;
            this.UserService
                .uploadMultipleFile(action.payload.data)
                .subscribe((result) => {
                    if (result.message == 'Success') {
                        this.store.dispatch({
                            type: worker.actionTypes.UPLOAD_WORKER_MULTIPLE_FILE_SUCCESS, payload: {
                                fileUpload: {
                                    fileUploadUrl: result.data[0],
                                    fileUploadUrls: result.data,
                                    type: action.payload.type
                                }
                            }
                        });
                    }
                }, (error) => {
                    if (error.statusCode === 401 || error.statusCode === 403) {
                        this.store.dispatch({
                            type: app.actionTypes.APP_AUTHENTICATION_FAIL, payload: error
                        });
                    } else {
                        this.store.dispatch({
                            type: worker.actionTypes.WORKER_ERROR, payload: error
                        });
                    }
                });
        });

    @Effect({ dispatch: false })
    uploadWorkerMultipleFileSuccess: Observable<Action> = this.actions$
        .ofType('UPLOAD_WORKER_MULTIPLE_FILE_SUCCESS')
        .do((action) => {

        });

    @Effect({ dispatch: false })
    getAllEmployers$ = this.actions$
        .ofType('APP_GETALL_EMPLOYER')
        .do((action) => {
            this._spinner.show();
            this.UserService.getAllEmployers(action.payload).subscribe((result) => {
                this._spinner.hide();
                if (result.message == 'Success') {
                    // console.log(result);
                    let filters = (action.payload.filter) ? action.payload.filter : null;
                    let payload = {
                        employers: result.data.users,
                        count: result.data.count,
                        currentPage: action.payload.currentPage,
                        limit: action.payload.limit,
                        filter: filters
                    };

                    this.store.dispatch(new employer.AppEmployerDetailSuccess(payload));
                }
            }
                , (error) => {
                    this._spinner.hide();
                    if (error.statusCode === 401 || error.statusCode === 403) {
                        this.store.dispatch({
                            type: app.actionTypes.APP_AUTHENTICATION_FAIL, payload: error
                        });
                    } else {
                        this.store.dispatch({
                            type: employer.actionTypes.EMPLOYER_ERROR, payload: error
                        });
                    }
                }
            );
        });

    @Effect({ dispatch: false })
    getEmployerDetail$ = this.actions$
        .ofType('APP_GET_EMPLOYER_DETAIL')
        .do((action) => {
            this._spinner.show();
            this.UserService.getEmployerDetail(action.payload).subscribe((result) => {
                this._spinner.hide();
                if (result.message == 'Success') {
                    let payload = {
                        employer: result.data
                    };
                    this.store.dispatch(new employer.AppGetEmployerDetailSuccess(payload));
                }
            }
                , (error) => {
                    this._spinner.hide();
                    if (error.statusCode === 401 || error.statusCode === 403) {
                        this.store.dispatch({
                            type: app.actionTypes.APP_AUTHENTICATION_FAIL, payload: error
                        });
                    } else {
                        this.store.dispatch({
                            type: employer.actionTypes.EMPLOYER_ERROR, payload: error
                        });
                    }
                }
            );
        });

    @Effect({ dispatch: false })
    SearchEmployer$ = this.actions$
        .ofType('SEARCH_EMPLOYER_DETAIL')
        .withLatestFrom(this.store)
        .do((storeState) => {
            let action = storeState[0];
            let state = storeState[1].employer;
            this.UserService
                .getAllEmployers(action.payload)
                .subscribe((result) => {
                    if (result.message == 'Success') {

                        let filters = (action.payload.filter) ? action.payload.filter : null;
                        if (result.data.count == 0) {

                            let payload = {
                                employers: result.data.users,
                                count: result.data.count,
                                currentPage: action.payload.currentPage,
                                limit: action.payload.limit,
                                filter: filters
                            };

                            this.store.dispatch(new employer.AppEmployerDetailSuccess(payload));

                        }
                        // creating state payload for next action
                        let payload = {
                            employers: result.data.users,
                            count: result.data.count,
                            currentPage: action.payload.currentPage,
                            limit: action.payload.limit,
                            filter: filters
                        };

                        //console.log(payload);
                        this.store.dispatch(new employer.AppEmployerDetailSuccess(payload));

                    }
                }, (error) => {
                    if (error.statusCode === 401 || error.statusCode === 403) {
                        this.store.dispatch({
                            type: app.actionTypes.APP_AUTHENTICATION_FAIL, payload: error
                        });
                    } else {
                        this.store.dispatch({
                            type: employer.actionTypes.EMPLOYER_ERROR, payload: error
                        });
                    }
                });
        });

    @Effect({ dispatch: false })
    employerDetailSuccess: Observable<Action> = this.actions$
        .ofType('APP_EMPLOYER_DETAIL_SUCCESS')
        .do((action) => {

        });

    @Effect({ dispatch: false })
    showEmployerDetail: Observable<Action> = this.actions$
        .ofType('SHOW_EMPLOYER_DETAIL')
        .do((action) => {

        });

    @Effect({ dispatch: false })
    deleteEmployerRecordConfirm$ = this.actions$
        .ofType('DELETE_EMPLOYER_RECORD_CONFIRM')
        .do((action) => {

        });

    @Effect({ dispatch: false })
    blockThisEmployer$ = this.actions$
        .ofType('BLOCK_THIS_EMPLOYER')
        .withLatestFrom(this.store)
        .do((storeState) => {
            let action = storeState[0];
            let state = storeState[1].employer;
            this._spinner.show();
            this.UserService
                .blockThisEmployer(action.payload.blockId)
                .subscribe((result) => {
                    this._spinner.hide();
                    if (result.message == 'Success') {
                        this.store.dispatch({
                            type: employer.actionTypes.APP_GETALL_EMPLOYER, payload: {
                                currentPage: state.currentPage, limit: state.limit,
                                role: action.payload.role,
                                filter: state.filter
                            }
                        });
                    }

                    let message;
                    let title = 'Success';
                    if (action.payload.blockId && action.payload.blockId.isBlocked == true) {
                        message = 'Employer successfully blocked';
                    } else {
                        message = 'Employer successfully unblocked';
                    }
                    this.toastrService.clear();
                    this.toastrService.success(message, title);

                }, (error) => {
                    this._spinner.hide();
                    if (error.statusCode === 401 || error.statusCode === 403) {
                        this.store.dispatch({
                            type: app.actionTypes.APP_AUTHENTICATION_FAIL, payload: error
                        });
                    } else {
                        this.store.dispatch({
                            type: employer.actionTypes.EMPLOYER_ERROR, payload: error
                        });
                    }
                });
        });

    @Effect({ dispatch: false })
    deleteEmployerRecord$ = this.actions$
        .ofType('DELETE_EMPLOYER_RECORD')
        .withLatestFrom(this.store)
        .do((storeState) => {
            let action = storeState[0];
            let state = storeState[1].employer;
            this._spinner.show();
            this.UserService
                .deleteEmployerRecord(action.payload.deleteId)
                .subscribe((result) => {
                    this._spinner.hide();
                    if (result.message == 'Success') {
                        this.store.dispatch({
                            type: employer.actionTypes.APP_GETALL_EMPLOYER, payload: {
                                currentPage: state.currentPage, limit: state.limit,
                                role: action.payload.role,
                                filter: state.filter
                            }
                        });
                    }
                    let message = 'Employer successfully deleted';
                    let title = 'Success';
                    this.toastrService.clear();
                    this.toastrService.success(message, title);
                }
                , (error) => {
                    this._spinner.hide();
                    if (error.statusCode === 401 || error.statusCode === 403) {
                        this.store.dispatch({
                            type: app.actionTypes.APP_AUTHENTICATION_FAIL, payload: error
                        });
                    } else {
                        this.store.dispatch({
                            type: employer.actionTypes.EMPLOYER_ERROR, payload: error
                        });
                    }
                });
        });

    @Effect({ dispatch: false })
    blockEmployerRecordConfirm$ = this.actions$
        .ofType('BLOCK_THIS_EMPLOYER_CONFIRM')
        .do((action) => {

        });

    @Effect({ dispatch: false })
    errorEmployer$ = this.actions$
        .ofType('EMPLOYER_ERROR')
        .do((action) => {
            this._spinner.hide();
            let message = action.payload.message;
            let title = 'Error';
            this.toastrService.clear();
            this.toastrService.error(message, title);
        });

    @Effect({ dispatch: false })
    editEmployerRecordConfirm$ = this.actions$
        .ofType('EDIT_THIS_EMPLOYER_CONFIRM')
        .do((action) => {

        });

    @Effect({ dispatch: false })
    createEmployer$ = this.actions$
        .ofType('CREATE_EMPLOYER')
        .withLatestFrom(this.store)
        .do((storeState) => {

            let action = storeState[0];
            let state = storeState[1].employer;

            this.UserService
                .createEmployer(action.payload.data)
                .subscribe((result) => {
                    if (result.message == 'Success') {
                        this.store.dispatch({
                            type: employer.actionTypes.CREATE_EMPLOYER_SUCCESS,
                            payload: result
                        });
                        this.store.dispatch({
                            type: employer.actionTypes.APP_GETALL_EMPLOYER,
                            payload: {
                                currentPage: state.currentPage,
                                limit: state.limit,
                                role: action.payload.role,
                                filter: state.filter
                            }
                        });
                        let message = 'Employer successfully created';
                        let title = 'Success';
                        this.toastrService.clear();
                        this.toastrService.success(message, title);
                    }
                }, (error) => {
                    if (error.statusCode === 401 || error.statusCode === 403) {
                        this.store.dispatch({
                            type: app.actionTypes.APP_AUTHENTICATION_FAIL, payload: error
                        });
                    } else {
                        this.store.dispatch({
                            type: employer.actionTypes.EMPLOYER_ERROR, payload: error
                        });
                    }
                });
        });

    @Effect({ dispatch: false })
    createEmployerFileSuccess: Observable<Action> = this.actions$
        .ofType('CREATE_EMPLOYER_SUCCESS')
        .do((action) => {

        });

    @Effect({ dispatch: false })
    editThisEmployer$ = this.actions$
        .ofType('EDIT_THIS_EMPLOYER')
        .withLatestFrom(this.store)
        .do((storeState) => {

            let action = storeState[0];
            let state = storeState[1].employer;

            this.UserService
                .updateEmployer(action.payload)
                .subscribe((result) => {
                    if (result.message == 'Success') {
                        if (localStorage.getItem('editEmployerId') != undefined) {
                            this.store.dispatch({
                                type: employer.actionTypes.APP_GET_EMPLOYER_DETAIL,
                                payload: {
                                    userId: localStorage.getItem('editEmployerId')
                                }
                            });
                        }
                        this.store.dispatch({
                            type: employer.actionTypes.EDIT_EMPLOYER_SUCCESS,
                            payload: result
                        });
                        let message = 'Employer successfully updated';
                        let title = 'Success';
                        this.toastrService.clear();
                        this.toastrService.success(message, title);
                    }
                }, (error) => {
                    if (error.statusCode === 401 || error.statusCode === 403) {
                        this.store.dispatch({
                            type: app.actionTypes.APP_AUTHENTICATION_FAIL, payload: error
                        });
                    } else {
                        this.store.dispatch({
                            type: employer.actionTypes.EMPLOYER_ERROR, payload: error
                        });
                    }
                });
        });

    @Effect({ dispatch: false })
    approveThisEmployer$ = this.actions$
        .ofType('APPROVE_EMPLOYER')
        .withLatestFrom(this.store)
        .do((storeState) => {
            this._spinner.show();
            let action = storeState[0];
            let state = storeState[1].employer;

            this.UserService
                .approveEmployer(action.payload)
                .subscribe((result) => {
                    this._spinner.hide();
                    if (result.message == 'Success') {
                        if (localStorage.getItem('editEmployerId') != undefined) {
                            this.store.dispatch({
                                type: employer.actionTypes.APP_GET_EMPLOYER_DETAIL,
                                payload: {
                                    userId: localStorage.getItem('editEmployerId')
                                }
                            });
                        }
                        this.store.dispatch({
                            type: employer.actionTypes.APPROVE_EMPLOYER_SUCCESS,
                            payload: result
                        });
                        let message = 'Employer successfully approved';
                        let title = 'Success';
                        this.toastrService.clear();
                        this.toastrService.success(message, title);
                    }
                }, (error) => {
                    this._spinner.hide();
                    if (error.statusCode === 401 || error.statusCode === 403) {
                        this.store.dispatch({
                            type: app.actionTypes.APP_AUTHENTICATION_FAIL, payload: error
                        });
                    } else {
                        this.store.dispatch({
                            type: employer.actionTypes.EMPLOYER_ERROR, payload: error
                        });
                    }
                });
        });

    @Effect({ dispatch: false })
    rejectThisEmployer$ = this.actions$
        .ofType('REJECT_EMPLOYER')
        .withLatestFrom(this.store)
        .do((storeState) => {

            let action = storeState[0];
            let state = storeState[1].employer;
            this._spinner.show();
            this.UserService
                .rejectEmployer(action.payload)
                .subscribe((result) => {
                    this._spinner.hide();
                    if (result.message == 'Success') {
                        if (localStorage.getItem('editEmployerId') != undefined) {
                            this.store.dispatch({
                                type: employer.actionTypes.APP_GET_EMPLOYER_DETAIL,
                                payload: {
                                    userId: localStorage.getItem('editEmployerId')
                                }
                            });
                        }
                        let message = 'Employer successfully rejected';
                        let title = 'Success';
                        this.toastrService.clear();
                        this.toastrService.success(message, title);
                    }
                }, (error) => {
                    this._spinner.hide();
                    if (error.statusCode === 401 || error.statusCode === 403) {
                        this.store.dispatch({
                            type: app.actionTypes.APP_AUTHENTICATION_FAIL, payload: error
                        });
                    } else {
                        this.store.dispatch({
                            type: employer.actionTypes.EMPLOYER_ERROR, payload: error
                        });
                    }
                });
        });

    @Effect({ dispatch: false })
    changeEmployerDocumentApproval$ = this.actions$
        .ofType('CHANGE_EMPLOYER_DOCUMENT_APPROVAL')
        .withLatestFrom(this.store)
        .do((storeState) => {

            let action = storeState[0];
            let state = storeState[1].employer;
            this._spinner.show();
            this.UserService
                .changeEmployerDocumentApproval(action.payload.data)
                .subscribe((result) => {
                    this._spinner.hide();
                    if (result.message == 'Success') {
                        if (localStorage.getItem('editEmployerId') != undefined) {
                            this.store.dispatch({
                                type: employer.actionTypes.APP_GET_EMPLOYER_DETAIL,
                                payload: {
                                    userId: localStorage.getItem('editEmployerId')
                                }
                            });
                        }
                        let message;
                        if (action.payload.rejection == true) {
                            message = 'Employer document successfully rejected';
                        } else {
                            message = 'Employer document successfully approved';
                        }
                        let title = 'Success';
                        this.toastrService.clear();
                        this.toastrService.success(message, title);
                    }
                }, (error) => {
                    this._spinner.hide();
                    if (error.statusCode === 401 || error.statusCode === 403) {
                        this.store.dispatch({
                            type: app.actionTypes.APP_AUTHENTICATION_FAIL, payload: error
                        });
                    } else {
                        this.store.dispatch({
                            type: employer.actionTypes.EMPLOYER_ERROR, payload: error
                        });
                    }
                });
        });

    @Effect({ dispatch: false })
    EditEmployerSuccess$ = this.actions$
        .ofType('EDIT_EMPLOYER_SUCCESS')
        .do((action) => {
        });

    @Effect({ dispatch: false })
    uploadEmployerFile$ = this.actions$
        .ofType('UPLOAD_EMPLOYER_FILE')
        .withLatestFrom(this.store)
        .do((storeState) => {
            let action = storeState[0];
            let state = storeState[1].employer;
            this.UserService
                .uploadFile(action.payload.data)
                .subscribe((result) => {
                    if (result.message == 'Success') {
                        let fileUplaod;
                        if (action.payload.index != undefined) {
                            fileUplaod = {
                                fileUploadUrl: result.data,
                                type: action.payload.type,
                                index: action.payload.index
                            };
                        } else {
                            fileUplaod = {
                                fileUploadUrl: result.data,
                                type: action.payload.type
                            };
                        }
                        this.store.dispatch({
                            type: employer.actionTypes.UPLOAD_EMPLOYER_FILE_SUCCESS, payload: {
                                fileUpload: fileUplaod
                            }
                        });
                    }
                }, (error) => {
                    if (error.statusCode === 401 || error.statusCode === 403) {
                        this.store.dispatch({
                            type: app.actionTypes.APP_AUTHENTICATION_FAIL, payload: error
                        });
                    } else {
                        this.store.dispatch({
                            type: employer.actionTypes.EMPLOYER_ERROR, payload: error
                        });
                    }
                });
        });

    @Effect({ dispatch: false })
    uploadEmployerFileSuccess: Observable<Action> = this.actions$
        .ofType('UPLOAD_EMPLOYER_FILE_SUCCESS')
        .do((action) => {

        });

    @Effect({ dispatch: false })
    uploadEmployerMultipleFile$ = this.actions$
        .ofType('UPLOAD_EMPLOYER_MULTIPLE_FILE')
        .withLatestFrom(this.store)
        .do((storeState) => {
            let action = storeState[0];
            let state = storeState[1].employer;
            this.UserService
                .uploadMultipleFile(action.payload.data)
                .subscribe((result) => {
                    if (result.message == 'Success') {
                        this.store.dispatch({
                            type: employer.actionTypes.UPLOAD_EMPLOYER_MULTIPLE_FILE_SUCCESS, payload: {
                                fileUpload: {
                                    fileUploadUrl: result.data[0],
                                    fileUploadUrls: result.data,
                                    type: action.payload.type
                                }
                            }
                        });
                    }
                }, (error) => {
                    if (error.statusCode === 401 || error.statusCode === 403) {
                        this.store.dispatch({
                            type: app.actionTypes.APP_AUTHENTICATION_FAIL, payload: error
                        });
                    } else {
                        this.store.dispatch({
                            type: employer.actionTypes.EMPLOYER_ERROR, payload: error
                        });
                    }
                });
        });

    @Effect({ dispatch: false })
    uploadEmployerMultipleFileSuccess: Observable<Action> = this.actions$
        .ofType('UPLOAD_EMPLOYER_MULTIPLE_FILE_SUCCESS')
        .do((action) => {

        });

    @Effect({ dispatch: false })
    getCountryCodes$ = this.actions$
        .ofType('GET_COUNTRY_CODE')
        .do((action) => {
            this.UserService.getCountryCodes(action.payload).subscribe((result) => {
                this.store.dispatch({
                    type: employer.actionTypes.GET_COUNTRY_CODE_SUCCESS, payload: result
                });
                this.store.dispatch({
                    type: worker.actionTypes.GET_COUNTRY_CODE_SUCCESS, payload: result
                });
            }
                , (error) => {
                }
            );
        });

    @Effect({ dispatch: false })
    getCountryCodesSuccess: Observable<Action> = this.actions$
        .ofType('GET_COUNTRY_CODE_SUCCESS')
        .do((action) => {

        });

    constructor(
        private actions$: Actions,
        private store: Store<any>,
        private router: Router,
        private UserService: UserService,
        private toastrService: ToastrService,
        private _spinner: BaThemeSpinner
    ) { }

}

