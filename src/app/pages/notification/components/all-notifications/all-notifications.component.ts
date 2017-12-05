
import { Component, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import {
    MdDialog,
    MdPaginator
} from '@angular/material';
import { JwtHelper } from 'angular2-jwt';
import { ConfirmInvitationDialog } from '../../../confirm-invitation-dialog/confirm-invitation-dialog.component';
import { DataService } from '../../../../services/data-service/data.service';
import * as notification from '../../state/notification.actions';
import 'style-loader!./all-notifications.scss';

@Component({
    selector: 'all-notifications',
    templateUrl: 'all-notifications.html',
})
export class AllNotifications {

    @ViewChild('notificationsPaginator') private _paginator: MdPaginator;
    public notifications;
    public page = 1;
    public limit = 10;
    public pageIndex = 0;
    public count: number;
    public activeNotification;
    public unreadNotificationCount;
    public length;
    public pageSize = 10;
    public pageSizeOptions = [5, 10, 25, 100, 500];

    constructor(private store: Store<any>,
        private router: Router,
        private dialog: MdDialog,
        private dataService: DataService) {

        this.limit = this.pageSize;

        this.store
            .select('notification')
            .subscribe((res: any) => {
                this.notifications = res.allNotifications;
                this.count = res.totalCount;
                this.activeNotification = (res.activeNotification) ? res.activeNotification : null;
                this.unreadNotificationCount = res.unreadNotificationCount;
                this.length = this.count;
                this.limit = this.pageSize;
                this.pageIndex = res.allCurrentPage - 1;
            });

        this.store.dispatch({
            type: notification.actionTypes.GET_ALL_NOTIFICATIONS,
            payload: {
                currentPage: this.page,
                limit: this.limit
            }
        });

    }

    pageChanged(page) {
        this.page = page;
        // this.store.dispatch({ type: notification.actionTypes.GET_ALL_NOTIFICATION, payload: { currentPage: this.page, limit: this.limit } });
        // this.store.dispatch({ type: booking.actionTypes.APP_GETALL_BOOKING, payload: {currentPage:this.page,limit:this.limit,type:"all"} })
    }

    confirmInvitation(id) {
        let user;
        let jwtHelper: JwtHelper = new JwtHelper();
        let token = localStorage.getItem('tokenSession');
        if (token && !jwtHelper.isTokenExpired(token)) {
            user = jwtHelper.decodeToken(token);
        }
        let dialogRef = this.dialog.open(ConfirmInvitationDialog);
        dialogRef.componentInstance.id = id;
    }

    read(data) {
        let eventType = data.flag;
        let id;
        let role;
        switch (eventType) {
            case 'INVITATION':
                id = data.inviteId;
                this.confirmInvitation(id);
                break;
            case 'ACCEPT_INVITATION':
                id = data.userAccepted;
                role = data.invitedUserRole;
                if (id) {
                    this.dataService.setData('userId', id);
                    if (role == 'EMPLOYER') {
                        this.router.navigate(['/pages/settings/employerprofile']).then((result) => {
                            if (!result && window && window.location) {
                                window.location.reload();
                            }
                        });
                    } else {
                        this.router.navigate(['/pages/settings/userprofile']).then((result) => {
                            if (!result && window && window.location) {
                                window.location.reload();
                            }
                        });
                    }
                }
                break;
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
                    this.router.navigate(['pages/jobs/jobdetails']);
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
                    this.router.navigate(['pages/jobs/jobdetails']);
                }
                break;
            default:
                break;
        }

        if (data && !data.isRead && data._id) {
            this.store.dispatch({ type: notification.actionTypes.READ_NOTIFICATION, payload: { _id: data._id } });
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

    pageChange(page) {
        this.store.dispatch({
            type: notification.actionTypes.GET_ALL_NOTIFICATIONS,
            payload: {
                currentPage: page.pageIndex + 1,
                limit: page.pageSize
            }
        });
        this.pageSize = page.pageSize;
    }

    goToLastPage(index) {
        this._paginator.pageIndex = Math.ceil(this.length / this.pageSize) - 1;
        let page = {
            pageIndex: Math.ceil(this.length / this.pageSize) - 1,
            pageSize: this.pageSize,
            length: this.length
        };
        this.pageChange(page);
        this._paginator._changePageSize(this.pageSize);
    }

    goToFirstPage(index) {
        this._paginator.pageIndex = 0;
        let page = {
            pageIndex: 0,
            pageSize: this.pageSize,
            length: this.length
        };
        this.pageChange(page);
        this._paginator._changePageSize(this.pageSize);
    }

}
