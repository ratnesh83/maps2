
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { DataService } from '../../../../services/data-service/data.service';
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

    constructor(private store: Store<any>,
        private router: Router,
        private dataService: DataService) {

        this.store
            .select('notification')
            .subscribe((res: any) => {
                this.notifications = res.notifications;
                this.count = res.notificationCount;
                this.activeNotification = (res.activeNotification) ? res.activeNotification : null;
                this.unreadNotificationCount = res.unreadNotificationCount;
                //console.log(this.notifications);
            });

        // this.store.dispatch({ type: notification.actionTypes.GET_ALL_NOTIFICATION, payload: { currentPage: this.page, limit: this.limit } });

    }

    pageChanged(page) {
        this.page = page;
        // this.store.dispatch({ type: notification.actionTypes.GET_ALL_NOTIFICATION, payload: { currentPage: this.page, limit: this.limit } });
        // this.store.dispatch({ type: booking.actionTypes.APP_GETALL_BOOKING, payload: {currentPage:this.page,limit:this.limit,type:"all"} })
    }

    read(data) {
        console.log(data);
        let eventType = data.flag;
        let id;
        switch (eventType) {
            case 'ACCEPT_JOB':
                id = data.payload ? data.payload.jobId : null;
                if (id) {
                    this.dataService.setData('jobId', id);
                    this.router.navigate(['pages/posts/postdetails']);
                }
                break;
            case 'REJECT_JOB':
                id = data.payload ? data.payload.jobId : null;
                if (id) {
                    this.dataService.setData('jobId', id);
                    this.router.navigate(['pages/posts/postdetails']);
                }
                break;
            case 'CONFIRM_LABOUR':
                id = data.payload ? data.payload.jobId : null;
                if (id) {
                    this.dataService.setData('jobId', id);
                    this.router.navigate(['pages/posts/postdetails']);
                }
                break;
            case 'CONFIRM_LABOUR':
                id = data.payload ? data.payload.jobId : null;
                if (id) {
                    this.dataService.setData('jobId', id);
                    this.router.navigate(['pages/posts/postdetails']);
                }
                break;
            case 'CANCEL_LABOUR':
                id = data.payload ? data.payload.jobId : null;
                if (id) {
                    this.dataService.setData('jobId', id);
                    this.router.navigate(['pages/posts/postdetails']);
                }
                break;
            case 'POST_JOB':
                id = data.payload ? data.payload.jobId : null;
                if (id) {
                    this.dataService.setData('jobId', id);
                    this.router.navigate(['pages/posts/postdetails']);
                }
                break;
            default:
                break;
        }

        /* if (!data.isRead) {
            this.store.dispatch({ type: notification.actionTypes.READ_NOTIFICATION, payload: data });
            this.store.dispatch({ type: notification.actionTypes.SHOW_NOTIFICATION, payload: data });
        } else {
            this.store.dispatch({ type: notification.actionTypes.SHOW_NOTIFICATION, payload: data });
        } */
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
