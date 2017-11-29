
import { Injectable } from '@angular/core';
import { Effect, Actions } from '@ngrx/effects';
import { Action, Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { Router } from '@angular/router';
import { NotificationService } from '../../../services/notification/notification.service';

import * as notification from './notification.actions';
import * as app from '../../../state/app.actions';
import * as payment from '../../payments/state/payment.actions';
import * as user from '../../users/state/user.actions';

@Injectable()
export class NotificationEffects {
    notificationData;

    constructor(
        private actions$: Actions,
        private store: Store<any>,
        private notificationService: NotificationService,
        private router: Router
    ) { }

    @Effect({ dispatch: false })
    getAllNotifications$ = this.actions$
        .ofType('GET_ALL_NOTIFICATION')
        .do((action) => {
            this.notificationService.getAllNotifications(action.payload).subscribe((result) => {
                if (result.message == 'Action complete.' || result.statusCode == 200) {
                    //console.log("result of notification.....................",result)
                    let notificationType = (action.payload.type) ? action.payload.currentPage.type : 'all';
                    // creating state payload for next action
                    if (result && result.data && result.data.notification && result.data.notification.length > 0) {
                        result.data.notification = result.data.notification.map(function (record, index) {
                            /* let currentTime = new Date(record.createdAt);
                            let currentOffset = currentTime.getTimezoneOffset();
                            let ISTOffset = currentOffset;
                            let createdAt = new Date(currentTime.getTime() + (ISTOffset + currentOffset) * 60000);
                            let minutes = (createdAt.getMinutes() > 9) ? createdAt.getMinutes() : '0' + createdAt.getMinutes();
                            record.createdAt = createdAt.getDate() + '-' + (createdAt.getMonth() + 1) + '-' + createdAt.getFullYear() + ' ' + createdAt.getHours() + ':' + minutes; */
                            record.createdAt = new Date(record.createdAt);
                            return record;
                        });
                    }
                    let notifications;
                    let unReadCount = 0;
                    let totalCount = 0;
                    if(result && result.data && result.data.notification) {
                        notifications = result.data.notification;
                        unReadCount = result.data.unReadCount;
                        totalCount = result.data.totalCount;
                    }
                    console.log(result.data);
                    let payload = {
                        notifications: notifications,
                        count: totalCount,
                        currentPage: action.payload.currentPage,
                        limit: action.payload.limit,
                        unreadNotificationCount: unReadCount,
                        type: notificationType
                    };
                    this.notificationData = payload;

                    this.store.dispatch(new notification.GetAllNotificationSuccessAction(payload));
                }
            }
                , (error) => {

                    if (error.statusCode === 401 || error.statusCode === 403) {
                        this.store.dispatch({
                            type: app.actionTypes.APP_AUTHENTICATION_FAIL, payload: error
                        });

                    }
                }
            );
        });


    @Effect({ dispatch: false })
    getAllNotificationsSuccess: Observable<Action> = this.actions$
        .ofType('GET_ALL_NOTIFICATION_SUCCESS')
        .do((action) => {
            // console.log('Success fully executed notfication update  ');
        });

    @Effect({ dispatch: false })
    readNotification: Observable<any> = this.actions$
        .ofType('READ_NOTIFICATION')
        .withLatestFrom(this.store)
        .do((storeState) => {
            let action = storeState[0];
            let state = storeState[1].notification;
            //console.log(action.payload);
            this.notificationService.readNotification(action.payload).subscribe((result) => {
                if (result.statusCode === 200) {
                    action.payload.isRead = true;
                    // this.store.dispatch({ type: notification.actionTypes.SHOW_NOTIFICATION, payload: action.payload });
                    this.store.dispatch({ type: notification.actionTypes.GET_ALL_NOTIFICATION, payload: { currentPage: state.currentPage, limit: state.limit } });
                }
            }
                , (error) => {
                    if (error.statusCode === 401 || error.statusCode === 403) {
                        this.store.dispatch({
                            type: app.actionTypes.APP_AUTHENTICATION_FAIL, payload: error
                        });

                    }

                }
            );
        });

    @Effect({ dispatch: false })
    pushNotificationsSuccess: Observable<Action> = this.actions$
        .ofType('PUSH_NOTIFICATION')
        .do((action) => {
            // console.log('Success fully executed socket push  ');
        });

    @Effect({ dispatch: false })
    showNotifications: Observable<Action> = this.actions$
        .ofType('SHOW_NOTIFICATION')
        .do((action) => {
            this.notificationService.getUserById(action.payload.eventID).subscribe((result) => {

                if (result.statusCode === 200) {
                    this.store.dispatch({ type: notification.actionTypes.SHOW_NOTIFICATION_SUCCESS, payload: this.notificationData });

                    switch (action.payload.eventType) {
                        case 'NEW_CUSTOMER_REGISTER':
                            this.store.dispatch({ type: user.actionTypes.NEW_CUSTOMER_DATA, payload: result });
                            this.router.navigate(['pages/users/singleCustomer']);
                            break;

                        default:
                            break;
                    }

                };
            }
                , (error) => {

                    if (error.statusCode === 401 || error.statusCode === 403) {
                        this.store.dispatch({
                            type: app.actionTypes.APP_AUTHENTICATION_FAIL, payload: error
                        });

                    }

                }
            );

        });

}


