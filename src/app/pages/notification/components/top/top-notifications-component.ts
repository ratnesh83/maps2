import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { AuthService } from '../../../../auth/service/auth-service/auth.service';
import { NotificationService } from '../../../../services/notification-service';
//import { Observable } from 'rxjs/Rx';

//import {Notification} from './baMsgCenter.service';

import * as notification from '../../state/notification.actions';

@Component({
    selector: 'top-notification',
    styleUrls: ['top-notifications.scss'],
    template: `
        <ul class="top-notification  clearfix">
        <li class="dropdown">
            <a href class="dropdown-toggle" id="msg-dd1" data-toggle="dropdown" aria-expanded="false">
            <i class="fa fa-bell-o"></i><span>{{ unreadNotificationCount }}</span>

            <div class="notification-ring"></div>
            </a>

            <div class="top-dropdown-menu dropdown-menu" aria-labelledby="msg-dd1">
            <i class="dropdown-arr"></i>

            <div class="header clearfix">
                <strong>Notifications</strong>
                <!-- <a  (click)="readAllNotification({markAllRead:true})">Mark All as Read</a> -->
                <!-- <a href>Settings</a> -->
            </div>
            <div class="msg-list">
                <a *ngFor="let msg of notifications" class="clearfix" (click)="read(msg)" [ngClass]="{'text-muted': msg.isRead,'text-primary': !msg.isRead}">
                <div class="msg-area">
                    <div>{{ msg.text }}</div>
                    <span style="max-width: 100%">{{ getDuration(msg.createdAt) ? getDuration(msg.createdAt) + ' ago' : msg.createdAt | date: 'MMM dd' }}</span>
                </div>
                </a>
            </div>
            <a routerLink="notification/all-notifications">See all</a>
            </div>
        </li>

        </ul>
    `
})
export class TopNotifications {


    public notifications;
    public page = 1;
    public limit = 40;
    public count: number;
    public activeNotification;
    public unreadNotificationCount;

    constructor(private authService: AuthService,
        private store: Store<any>) {

        this.store
            .select('notification')
            .subscribe((res: any) => {

                this.notifications = res.notifications;
                //console.log(res.notification);
                // this.notifications = this.notifications.map(function (record,index) {
                //    record.createdAt = new Date(record.createdAt).toLocaleDateString()
                //   return record;
                // })
                this.count = res.notificationCount;
                this.activeNotification = (res.activeNotification) ? res.activeNotification : null;
                this.unreadNotificationCount = res.unreadNotificationCount;
                // console.log("notification1...........................",res)

            });

        if (this.authService.getSocketConnection()) {
            this.authService.getSocketConnection().on('connect', (socket) => {
            });

            this.authService.getSocketConnection().on('notification', (data) => {
                //console.log(data);
                if (data.notification && data.unreadNotificationCount) {
                    this.notifications.unshift(data.notification);
                    this.notifications.pop();


                    this.store.dispatch({
                        type: notification.actionTypes.PUSH_NOTIFICATION, payload: {
                            notification: this.notifications,
                            unreadNotificationCount: data.unreadNotificationCount
                        }
                    });
                }

            });
        }

        this.store.dispatch({ type: notification.actionTypes.GET_ALL_NOTIFICATION, payload: { currentPage: this.page, limit: this.limit } });

    }

    readAllNotification(data) {
        if (!data.isRead) {
            //this.store.dispatch({ type: notification.actionTypes.READ_NOTIFICATION, payload: data });
        }
        this.store.dispatch({ type: notification.actionTypes.GET_ALL_NOTIFICATION, payload: { currentPage: this.page, limit: this.limit } });
    }

    read(data) {
        //console.log("notification2...........................",this.notifications)
        //this.store.dispatch({ type: notification.actionTypes.GET_ALL_NOTIFICATION, payload: {currentPage: this.page, limit: this.limit} });

        if (!data.isRead) {
            //console.log('READ_NOTIFICATION is FIRING .....');
            //this.store.dispatch({ type: notification.actionTypes.READ_NOTIFICATION, payload: data });
        }
        else {
            //this.store.dispatch({ type: notification.actionTypes.SHOW_NOTIFICATION, payload: data });
        }

    }

    getDuration(time) {
        let timeOfEvent = (new Date()).getTime() - (new Date(time)).getTime();
        let timeDiffMinutes = timeOfEvent / 60000;
        let timeDiffhours = timeDiffMinutes / 60;
        let timeDiffDays = timeDiffhours / 24;
        let timeDiffString = timeDiffMinutes.toString();
        if (timeDiffhours < 1) {
            if (timeDiffMinutes < 2) {
                return '1 min';
            } else {
                return Math.floor(timeDiffMinutes).toString() + ' min';
            }
        } else if (timeDiffDays < 1) {
            if (timeDiffhours < 2) {
                return '1 hr';
            } else {
                return Math.floor(timeDiffhours).toString() + ' hrs';
            }
        } else {
            return false;
        }
    }

}

