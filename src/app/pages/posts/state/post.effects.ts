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
    getCategories$ = this.actions$
        .ofType('APP_GET_CATEGORIES')
        .do((action) => {
            this._spinner.show();
            this.PostService.getAllCategories(action.payload).subscribe((result) => {
                this._spinner.hide();
                if (result.message == 'Action complete.' || result.statusCode == 200) {
                    let payload = result.data;
                    this.store.dispatch(new post.AppGetCategoriesSuccess(payload));
                }
            }
                , (error) => {
                    this._spinner.hide();
                    if (error.statusCode === 401 || error.statusCode === 403) {
                        this.store.dispatch({
                            type: app.actionTypes.APP_AUTHENTICATION_FAIL, payload: error
                        });
                    } else {

                    }
                }
            );
        });


    @Effect({ dispatch: false })
    getCategoriesSuccess: Observable<Action> = this.actions$
        .ofType('APP_GET_CATEGORIES_SUCCESS')
        .do((action) => {

        });

    @Effect({ dispatch: false })
    getSubCategories$ = this.actions$
        .ofType('APP_GET_SUB_CATEGORIES')
        .do((action) => {
            this._spinner.show();
            this.PostService.getAllSubCategories(action.payload).subscribe((result) => {
                this._spinner.hide();
                if (result.message == 'Action complete.' || result.statusCode == 200) {
                    let payload = result.data;
                    this.store.dispatch(new post.AppGetSubCategoriesSuccess(payload));
                }
            }
                , (error) => {
                    this._spinner.hide();
                    if (error.statusCode === 401 || error.statusCode === 403) {
                        this.store.dispatch({
                            type: app.actionTypes.APP_AUTHENTICATION_FAIL, payload: error
                        });
                    } else {

                    }
                }
            );
        });


    @Effect({ dispatch: false })
    getSubCategoriesSuccess: Observable<Action> = this.actions$
        .ofType('APP_GET_SUB_CATEGORIES_SUCCESS')
        .do((action) => {

        });

    @Effect({ dispatch: false })
    postJob$ = this.actions$
        .ofType('APP_POST_JOB')
        .do((action) => {
            this._spinner.show();
            this.PostService.postJob(action.payload).subscribe((result) => {
                this._spinner.hide();
                if (result.message == 'Action complete.' || result.statusCode == 200) {
                    let payload = result.data;
                    this.store.dispatch(new post.AppPostJobSuccess(payload));
                }
            }
                , (error) => {
                    this._spinner.hide();
                    if (error.statusCode === 401 || error.statusCode === 403) {
                        this.store.dispatch({
                            type: app.actionTypes.APP_AUTHENTICATION_FAIL, payload: error
                        });
                    } else {

                    }
                }
            );
        });


    @Effect({ dispatch: false })
    postJobSuccess: Observable<Action> = this.actions$
        .ofType('APP_POST_JOB_SUCCESS')
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
