import { Injectable } from '@angular/core';
import { Effect, Actions } from '@ngrx/effects';
import { Action, Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { Router } from '@angular/router';
import { ToastrService, ToastrConfig } from 'ngx-toastr';
const types = ['success', 'error', 'info', 'warning'];
import { cloneDeep, random } from 'lodash';
import { PostService } from '../../../services/post-service/post.service';
import * as post from './post.actions';
import * as app from '../../../state/app.actions';
import { BaImageLoaderService, BaThemePreloader, BaThemeSpinner } from '../../../theme/services';


@Injectable()
export class PostEffects {

    @Effect({ dispatch: false })
    getAllPosts$ = this.actions$
        .ofType('APP_GETALL_JOB')
        .do((action) => {
            this._spinner.show();
            this.PostService.getAllStaticPosts(action.payload).subscribe((result) => {
                this._spinner.hide();
                if (result.message == 'Success') {
                    let filters = (action.payload.filter) ? action.payload.filter : null;
                    let payload = {
                        posts: result.data,
                        count: result.data.length
                    };

                    this.store.dispatch(new post.AppPostDetailSuccess(payload));
                }
            }
                , (error) => {
                    this._spinner.hide();
                    if (error.statusCode === 401 || error.statusCode === 403) {
                        this.store.dispatch({
                            type: app.actionTypes.APP_AUTHENTICATION_FAIL, payload: error
                        });

                    } else {
                        /* this.store.dispatch({
                            type: post.actionTypes.JOB_ERROR, payload: error
                        }); */
                    }
                }
            );
        });

    @Effect({ dispatch: false })
    getPostDetail$ = this.actions$
        .ofType('APP_GET_JOB_DETAIL')
        .do((action) => {
            this._spinner.show();
            this.PostService.getPostDetail(action.payload).subscribe((result) => {
                this._spinner.hide();
                if (result.message == 'Success') {
                    let payload = {
                        post: result.data
                    };
                    this.store.dispatch(new post.AppGetPostDetailSuccess(payload));
                }
            }
                , (error) => {
                    this._spinner.hide();
                    if (error.statusCode === 401 || error.statusCode === 403) {
                        this.store.dispatch({
                            type: app.actionTypes.APP_AUTHENTICATION_FAIL, payload: error
                        });
                    } else {
                        /* this.store.dispatch({
                            type: post.actionTypes.JOB_ERROR, payload: error
                        }); */
                    }
                }
            );
        });

    @Effect({ dispatch: false })
    SearchPost$ = this.actions$
        .ofType('SEARCH_JOB_DETAIL')
        .withLatestFrom(this.store)
        .do((storeState) => {
            let action = storeState[0];
            let state = storeState[1].post;
            this.PostService
                .getAllPosts(action.payload)
                .subscribe((result) => {
                    if (result.message == 'Success') {

                        let filters = (action.payload.filter) ? action.payload.filter : null;
                        if (result.data.count == 0) {

                            let payload = {
                                posts: result.data.posts,
                                count: result.data.count,
                                currentPage: action.payload.currentPage,
                                limit: action.payload.limit,
                                filter: filters
                            };

                            this.store.dispatch(new post.AppPostDetailSuccess(payload));

                        } else {
                            let payload = {
                                posts: result.data.posts,
                                count: result.data.count,
                                currentPage: action.payload.currentPage,
                                limit: action.payload.limit,
                                filter: filters
                            };

                            this.store.dispatch(new post.AppPostDetailSuccess(payload));
                        }

                    }
                }, (error) => {
                    if (error.statusCode === 401 || error.statusCode === 403) {
                        this.store.dispatch({
                            type: app.actionTypes.APP_AUTHENTICATION_FAIL, payload: error
                        });

                    } else {
                        /* this.store.dispatch({
                            type: post.actionTypes.JOB_ERROR, payload: error
                        }); */
                    }
                });
        });

    @Effect({ dispatch: false })
    employerDetailSuccess: Observable<Action> = this.actions$
        .ofType('APP_JOB_DETAIL_SUCCESS')
        .do((action) => {

        });

    @Effect({ dispatch: false })
    showPostDetail: Observable<Action> = this.actions$
        .ofType('SHOW_JOB_DETAIL')
        .do((action) => {

        });

    @Effect({ dispatch: false })
    deletePostRecordConfirm$ = this.actions$
        .ofType('DELETE_JOB_RECORD_CONFIRM')
        .do((action) => {

        });

    @Effect({ dispatch: false })
    blockThisPost$ = this.actions$
        .ofType('BLOCK_THIS_JOB')
        .withLatestFrom(this.store)
        .do((storeState) => {
            let action = storeState[0];
            let state = storeState[1].post;
            this._spinner.show();
            this.PostService
                .blockThisPost(action.payload.blockId)
                .subscribe((result) => {
                    this._spinner.hide();
                    if (result.message == 'Success') {
                        this.store.dispatch({
                            type: post.actionTypes.APP_GETALL_JOB, payload: {
                                currentPage: state.currentPage, limit: state.limit,
                                role: action.payload.role,
                                filter: state.filter
                            }
                        });
                    }

                    let message;
                    let title = 'Success';
                    if (action.payload.blockId && action.payload.blockId.isBlocked == true) {
                        message = 'Post successfully blocked';
                    } else {
                        message = 'Post successfully unblocked';
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
                        /* this.store.dispatch({
                            type: post.actionTypes.JOB_ERROR, payload: error
                        }); */
                    }
                });
        });

    @Effect({ dispatch: false })
    blockPostRecordConfirm$ = this.actions$
        .ofType('BLOCK_THIS_JOB_CONFIRM')
        .do((action) => {

        });

    @Effect({ dispatch: false })
    errorPost$ = this.actions$
        .ofType('JOB_ERROR')
        .do((action) => {
            this._spinner.hide();
            let message = action.payload.message;
            let title = 'Error';
            this.toastrService.clear();
            this.toastrService.error(message, title);
        });

    @Effect({ dispatch: false })
    editPostRecordConfirm$ = this.actions$
        .ofType('EDIT_THIS_JOB_CONFIRM')
        .do((action) => {

        });

    @Effect({ dispatch: false })
    createPost$ = this.actions$
        .ofType('CREATE_JOB')
        .withLatestFrom(this.store)
        .do((storeState) => {

            let action = storeState[0];
            let state = storeState[1].post;

            this.PostService
                .createPost(action.payload.data)
                .subscribe((result) => {
                    if (result.message == 'Success') {
                        this.store.dispatch({
                            type: post.actionTypes.CREATE_JOB_SUCCESS,
                            payload: result
                        });
                        this.store.dispatch({
                            type: post.actionTypes.APP_GETALL_JOB,
                            payload: {
                                currentPage: state.currentPage,
                                limit: state.limit,
                                role: action.payload.role,
                                filter: state.filter
                            }
                        });
                        let message = 'Post successfully created';
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
                        /* this.store.dispatch({
                            type: post.actionTypes.JOB_ERROR, payload: error
                        }); */
                    }
                });
        });

    @Effect({ dispatch: false })
    createPostFileSuccess: Observable<Action> = this.actions$
        .ofType('CREATE_JOB_SUCCESS')
        .do((action) => {

        });

    @Effect({ dispatch: false })
    editThisPost$ = this.actions$
        .ofType('EDIT_THIS_JOB')
        .withLatestFrom(this.store)
        .do((storeState) => {

            let action = storeState[0];
            let state = storeState[1].post;

            this.PostService
                .updatePost(action.payload)
                .subscribe((result) => {
                    if (result.message == 'Success') {
                        if (localStorage.getItem('editPostId') != undefined) {
                            this.store.dispatch({
                                type: post.actionTypes.APP_GET_JOB_DETAIL,
                                payload: {
                                    userId: localStorage.getItem('editPostId')
                                }
                            });
                        }
                        this.store.dispatch({
                            type: post.actionTypes.EDIT_JOB_SUCCESS,
                            payload: result
                        });
                        let message = 'Post successfully updated';
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
                        /* this.store.dispatch({
                            type: post.actionTypes.JOB_ERROR, payload: error
                        }); */
                    }
                });
        });

    @Effect({ dispatch: false })
    approveThisPost$ = this.actions$
        .ofType('APPROVE_JOB')
        .withLatestFrom(this.store)
        .do((storeState) => {
            this._spinner.show();
            let action = storeState[0];
            let state = storeState[1].post;

            this.PostService
                .approvePost(action.payload)
                .subscribe((result) => {
                    this._spinner.hide();
                    if (result.message == 'Success') {
                        if (localStorage.getItem('editPostId') != undefined) {
                            this.store.dispatch({
                                type: post.actionTypes.APP_GET_JOB_DETAIL,
                                payload: {
                                    userId: localStorage.getItem('editPostId')
                                }
                            });
                        }
                        this.store.dispatch({
                            type: post.actionTypes.APPROVE_JOB_SUCCESS,
                            payload: result
                        });
                        let message = 'Post successfully approved';
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
                        /* this.store.dispatch({
                            type: post.actionTypes.JOB_ERROR, payload: error
                        }); */
                    }
                });
        });

    @Effect({ dispatch: false })
    rejectThisPost$ = this.actions$
        .ofType('REJECT_JOB')
        .withLatestFrom(this.store)
        .do((storeState) => {

            let action = storeState[0];
            let state = storeState[1].post;
            this._spinner.show();
            this.PostService
                .rejectPost(action.payload)
                .subscribe((result) => {
                    this._spinner.hide();
                    if (result.message == 'Success') {
                        if (localStorage.getItem('editPostId') != undefined) {
                            this.store.dispatch({
                                type: post.actionTypes.APP_GET_JOB_DETAIL,
                                payload: {
                                    userId: localStorage.getItem('editPostId')
                                }
                            });
                        }
                        let message = 'Post successfully rejected';
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
                        /* this.store.dispatch({
                            type: post.actionTypes.JOB_ERROR, payload: error
                        }); */
                    }
                });
        });

    @Effect({ dispatch: false })
    changePostDocumentApproval$ = this.actions$
        .ofType('CHANGE_JOB_DOCUMENT_APPROVAL')
        .withLatestFrom(this.store)
        .do((storeState) => {

            let action = storeState[0];
            let state = storeState[1].post;
            this._spinner.show();
            this.PostService
                .changePostDocumentApproval(action.payload.data)
                .subscribe((result) => {
                    this._spinner.hide();
                    if (result.message == 'Success') {
                        if (localStorage.getItem('editPostId') != undefined) {
                            this.store.dispatch({
                                type: post.actionTypes.APP_GET_JOB_DETAIL,
                                payload: {
                                    userId: localStorage.getItem('editPostId')
                                }
                            });
                        }
                        let message;
                        if (action.payload.rejection == true) {
                            message = 'Post document successfully rejected';
                        } else {
                            message = 'Post document successfully approved';
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
                        /* this.store.dispatch({
                            type: post.actionTypes.JOB_ERROR, payload: error
                        }); */
                    }
                });
        });

    @Effect({ dispatch: false })
    EditPostSuccess$ = this.actions$
        .ofType('EDIT_JOB_SUCCESS')
        .do((action) => {
        });

    @Effect({ dispatch: false })
    uploadPostFile$ = this.actions$
        .ofType('UPLOAD_JOB_FILE')
        .withLatestFrom(this.store)
        .do((storeState) => {
            let action = storeState[0];
            let state = storeState[1].post;
            this.PostService
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
                            type: post.actionTypes.UPLOAD_JOB_FILE_SUCCESS, payload: {
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
                        /* this.store.dispatch({
                            type: post.actionTypes.JOB_ERROR, payload: error
                        }); */
                    }
                });
        });

    @Effect({ dispatch: false })
    uploadPostFileSuccess: Observable<Action> = this.actions$
        .ofType('UPLOAD_JOB_FILE_SUCCESS')
        .do((action) => {

        });

    @Effect({ dispatch: false })
    uploadPostMultipleFile$ = this.actions$
        .ofType('UPLOAD_JOB_MULTIPLE_FILE')
        .withLatestFrom(this.store)
        .do((storeState) => {
            let action = storeState[0];
            let state = storeState[1].post;
            this.PostService
                .uploadMultipleFile(action.payload.data)
                .subscribe((result) => {
                    if (result.message == 'Success') {
                        this.store.dispatch({
                            type: post.actionTypes.UPLOAD_JOB_MULTIPLE_FILE_SUCCESS, payload: {
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
                        /* this.store.dispatch({
                            type: post.actionTypes.JOB_ERROR, payload: error
                        }); */
                    }
                });
        });

    @Effect({ dispatch: false })
    uploadPostMultipleFileSuccess: Observable<Action> = this.actions$
        .ofType('UPLOAD_JOB_MULTIPLE_FILE_SUCCESS')
        .do((action) => {

        });

    @Effect({ dispatch: false })
    getCountryCodes$ = this.actions$
        .ofType('GET_COUNTRY_CODE')
        .do((action) => {
            this.PostService.getCountryCodes(action.payload).subscribe((result) => {
                this.store.dispatch({
                    type: post.actionTypes.GET_COUNTRY_CODE_SUCCESS, payload: result
                });
                this.store.dispatch({
                    type: post.actionTypes.GET_COUNTRY_CODE_SUCCESS, payload: result
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
        private PostService: PostService,
        private toastrService: ToastrService,
        private _spinner: BaThemeSpinner
    ) { }

}

