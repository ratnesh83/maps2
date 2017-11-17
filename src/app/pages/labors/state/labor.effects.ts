import { Injectable } from '@angular/core';
import { Effect, Actions } from '@ngrx/effects';
import { Action, Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { Router } from '@angular/router';
import { ToastrService, ToastrConfig } from 'ngx-toastr';
import { cloneDeep, random } from 'lodash';
import { LaborService } from '../../../services/labor-service/labor.service';
import * as labor from './labor.actions';
import * as app from '../../../state/app.actions';
import { BaImageLoaderService, BaThemePreloader, BaThemeSpinner } from '../../../theme/services';


@Injectable()
export class LaborEffects {

    @Effect({ dispatch: false })
    getCategories$ = this.actions$
        .ofType('APP_GET_CATEGORIES')
        .do((action) => {
            this._spinner.show();
            this.LaborService.getAllCategories(action.payload).subscribe((result) => {
                this._spinner.hide();
                if (result.message == 'Action complete.' || result.statusCode == 200) {
                    let payload = result.data;
                    this.store.dispatch(new labor.AppGetCategoriesSuccess(payload));
                }
            }
                , (error) => {
                    this._spinner.hide();
                    if (error) {
                        if (error.statusCode === 401 || error.statusCode === 403) {
                            this.store.dispatch({
                                type: app.actionTypes.APP_AUTHENTICATION_FAIL, payload: error
                            });
                        } else {
                            this.toastrService.clear();
                            this.toastrService.error(error.message || 'Something went wrong', 'Error');
                        }
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
    getAllLabors$ = this.actions$
        .ofType('APP_GETALL_LABOR')
        .do((action) => {
            this._spinner.show();
            this.LaborService.getAllLabors(action.payload).subscribe((result) => {
                this._spinner.hide();
                if (result.message == 'Action complete.' || result.statusCode == 200) {
                    let filters = (action.payload.filter) ? action.payload.filter : null;
                    let payload = {
                        labors: result.data,
                        count: result.data.length
                    };
                    this.store.dispatch(new labor.AppLaborDetailSuccess(payload));
                    this.toastrService.clear();
                    if (payload.count == 0) {
                        this.toastrService.warning(payload.count > 1 ? payload.count + ' labors found' : payload.count == 0 ? 'No labors found in this area' : '1 labor found', 'Success');
                    } else {
                        this.toastrService.info(payload.count > 1 ? payload.count + ' labors found' : payload.count == 0 ? 'No labors found in this area' : '1 labor found', 'Success');
                    }
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

    constructor(
        private actions$: Actions,
        private store: Store<any>,
        private router: Router,
        private LaborService: LaborService,
        private toastrService: ToastrService,
        private _spinner: BaThemeSpinner
    ) { }

}

