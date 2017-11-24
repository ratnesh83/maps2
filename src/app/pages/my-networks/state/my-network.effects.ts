import { Injectable } from '@angular/core';
import { Effect, Actions } from '@ngrx/effects';
import { Action, Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { Router } from '@angular/router';
import { ToastrService, ToastrConfig } from 'ngx-toastr';
import { cloneDeep, random } from 'lodash';
import { MyNetworkService } from '../../../services/network-service/network.service';
import * as network from './my-network.actions';
import * as app from '../../../state/app.actions';
import { BaImageLoaderService, BaThemePreloader, BaThemeSpinner } from '../../../theme/services';

@Injectable()
export class MyNetworkEffects {

    @Effect({ dispatch: false })
    getLaborList$ = this.actions$
        .ofType('APP_GET_LABORS_LIST')
        .do((action) => {
            this._spinner.show();
            this.MyNetworkService.getAllLaborList(action.payload).subscribe((result) => {
                this._spinner.hide();
                if (result.message == 'Action complete.' || result.statusCode == 200) {
                    /* let payload = {
                        jobs: result.data,
                        currentPage: action.payload.currentPage,
                        limit: action.payload.limit,
                        count: result.data.count
                    }; */
                    let payload = result.data;
                    this.store.dispatch(new network.AppGetLaborListSuccess(payload));
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

                        }
                    }
                }
            );
        });

    @Effect({ dispatch: false })
    getLaborListSuccess: Observable<Action> = this.actions$
        .ofType('APP_GET_LABORS_LIST_SUCCESS')
        .do((action) => {

        });

    constructor(
        private actions$: Actions,
        private store: Store<any>,
        private router: Router,
        private MyNetworkService: MyNetworkService,
        private toastrService: ToastrService,
        private _spinner: BaThemeSpinner
    ) { }

}
