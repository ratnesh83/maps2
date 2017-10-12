import { get } from 'lodash';
import { Injectable } from '@angular/core';
import { Effect, Actions } from '@ngrx/effects';
import { Action, Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { Router } from '@angular/router';
import { DashboardService } from '../../../services/dashboard-service/dashboard.service';



import * as dashBoard from './dashboard.actions';
import * as app from '../../../state/app.actions';

@Injectable()
export class DashboardEffects {


    @Effect({ dispatch: false })
    dashboardCount: Observable<Action> = this.actions$
        .ofType(dashBoard.actionTypes.GET_DASHBOARD_COUNT)
        .do((action) => {
            this.dashboardService.getDashBoardData()
                .subscribe((result) => {
                    //console.log(result)
                    if (result.message == 'Success') {
                        this.store.dispatch(new dashBoard.AppGetDashBoardCountSuccess(result));
                        //console.log("deleted")
                    }


                }
                , (error) => {

                    if (error.statusCode === 401 || error.statusCode === 403) {
                        this.store.dispatch({
                            type: app.actionTypes.APP_AUTHENTICATION_FAIL, payload: error
                        });
                    }
                });
        });


    @Effect({ dispatch: false })
    dashboardCountSuccess: Observable<Action> = this.actions$
        .ofType(dashBoard.actionTypes.GET_DASHBOARD_COUNT_SUCCESS)
        .do((action) => {

        });


    constructor(
        private actions$: Actions,
        private store: Store<any>,
        private router: Router,
        private dashboardService: DashboardService
    ) {
    }

}

