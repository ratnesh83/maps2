
import { Component } from '@angular/core';
import { Store } from '@ngrx/store';

import * as notification from '../../state/notification.actions';

import 'style-loader!./all-notifications.scss';

@Component({
    selector: 'all-notifications',
    templateUrl: 'all-notifications.html',
})
export class AllNotifications {

    public notifications;
    public page = 1;
    public limit = 100;
    public count: number;
    public activeNotification;
    public unreadNotificationCount;

    constructor(private store: Store<any>) {

        this.store
            .select('notification')
            .subscribe((res: any) => {
                this.notifications = res.notifications;
                this.count = res.notificationCount;
                this.activeNotification = (res.activeNotification) ? res.activeNotification : null;
                this.unreadNotificationCount = res.unreadNotificationCount;
                //console.log(this.notifications);


            });

        this.store.dispatch({ type: notification.actionTypes.GET_ALL_NOTIFICATION, payload: { currentPage: this.page, limit: this.limit } });

    }


    pageChanged(page) {
        this.page = page;
        this.store.dispatch({ type: notification.actionTypes.GET_ALL_NOTIFICATION, payload: { currentPage: this.page, limit: this.limit } });
        //this.store.dispatch({ type: booking.actionTypes.APP_GETALL_BOOKING, payload: {currentPage:this.page,limit:this.limit,type:"all"} })
    }



    read(data) {
        //console.log("read notification.................",data.eventType)
    
        /* if (!data.isRead) {
            this.store.dispatch({ type: notification.actionTypes.READ_NOTIFICATION, payload: data });
            this.store.dispatch({ type: notification.actionTypes.SHOW_NOTIFICATION, payload: data });
        } else {
            this.store.dispatch({ type: notification.actionTypes.SHOW_NOTIFICATION, payload: data });
        } */

    }

}
