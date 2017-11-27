import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { AuthService } from '../../../../auth/service/auth-service/auth.service';
import { NotificationService } from '../../../../services/notification-service';
import { BaMsgCenterService } from '../../../../theme/components/baMsgCenter/baMsgCenter.service';
import { DataService } from '../../../../services/data-service/data.service';
import { Router } from '@angular/router';
import { ToastrService, ToastrConfig } from 'ngx-toastr';
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
                    <!-- <a (click)="readAllNotification({markAllRead:true})">Mark All as Read</a> -->
                    <!-- <a href>Settings</a> -->
                </div>
                <div style="cursor: pointer" class="msg-list">
                    <a *ngFor="let msg of notifications" class="clearfix" (click)="read(msg)" [ngClass]="{'text-muted': msg.isRead}">
                        <div class="msg-area">
                            <div class="col-12 col-sm-12">
                                <div class="row">
                                    <div style="display: flex; padding: 0px" class="col-1 col-sm-1">
                                        <img mat-card-avatar style="width: 100%; height: auto; margin: auto 0px" [src]="msg.payload ? msg.payload.profilePicture ? msg.payload.profilePicture.thumb ? msg.payload.profilePicture.thumb : 'assets/img/user.png' : 'assets/img/user.png' : 'assets/img/user.png'">
                                    </div>
                                    <div style="display: flex; padding: 0px 10px" class="col-11 col-sm-11">
                                        <div style="margin: auto 0px; text-align: justify">
                                            {{ msg.text }}
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <span style="max-width: 100%">{{ getDuration(msg.createdAt) ? getDuration(msg.createdAt) + ' ago' : (msg.createdAt | date: 'MMM dd') + ' at ' + (msg.createdAt | date: 'h:mm a') }}</span>
                        </div>
                    </a>
                </div>
                <a style="font-weight: 500" routerLink="notification/all-notifications">See all</a>
                </div>
            </li>
        </ul>
    `
})

export class TopNotifications {

    public notifications;
    public toastId;
    public page = 1;
    public limit = 40;
    public count: number;
    public activeNotification;
    public unreadNotificationCount;
    public notificationStore;
    public socketStoreAcceptRejectJob;
    public socketStoreConfirmLabour;
    public socketStoreCancelLabour;
    public socketStoreNewJob;
    public socketStoreActiveToInProgress;
    public socketStoreInProgressToComplete;

    constructor(private authService: AuthService,
        private store: Store<any>,
        private toastrService: ToastrService,
        private router: Router,
        private dataService: DataService,
        private msgCenter: BaMsgCenterService) {

        this.socketStoreAcceptRejectJob = this.msgCenter.getNotifications('Accept Reject Job').subscribe((message: any) => {
            console.log(message);
            this.store.dispatch({ type: notification.actionTypes.GET_ALL_NOTIFICATION, payload: { currentPage: this.page, limit: this.limit } });
            this.showNotificationToast(this.getTemplate(message.message, message.image), message);
        });

        this.socketStoreConfirmLabour = this.msgCenter.getNotifications('confirmLabour').subscribe((message: any) => {
            console.log(message);
            this.store.dispatch({ type: notification.actionTypes.GET_ALL_NOTIFICATION, payload: { currentPage: this.page, limit: this.limit } });
            this.showNotificationToast(this.getTemplate(message.message, message.image), message);
        });

        this.socketStoreCancelLabour = this.msgCenter.getNotifications('cancelLabour').subscribe((message: any) => {
            console.log(message);
            this.store.dispatch({ type: notification.actionTypes.GET_ALL_NOTIFICATION, payload: { currentPage: this.page, limit: this.limit } });
            this.showNotificationToast(this.getTemplate(message.message, message.image), message);
        });

        this.socketStoreNewJob = this.msgCenter.getNotifications('new Job').subscribe((message: any) => {
            console.log(message);
            this.store.dispatch({ type: notification.actionTypes.GET_ALL_NOTIFICATION, payload: { currentPage: this.page, limit: this.limit } });
            this.showNotificationToast(this.getTemplate(message.message, message.image), message);
        });

        this.socketStoreActiveToInProgress = this.msgCenter.getNotifications('activeToInProgress').subscribe((message: any) => {
            console.log(message);
            this.store.dispatch({ type: notification.actionTypes.GET_ALL_NOTIFICATION, payload: { currentPage: this.page, limit: this.limit } });
            this.showNotificationToast(this.getTemplate(message.message, message.image), message);
        });

        this.socketStoreInProgressToComplete = this.msgCenter.getNotifications('inProgressToComplete').subscribe((message: any) => {
            console.log(message);
            this.store.dispatch({ type: notification.actionTypes.GET_ALL_NOTIFICATION, payload: { currentPage: this.page, limit: this.limit } });
            this.showNotificationToast(this.getTemplate(message.message, message.image), message);
        });

        this.notificationStore = this.store
            .select('notification')
            .subscribe((res: any) => {
                this.notifications = res.notifications;
                this.count = res.notificationCount;
                this.activeNotification = (res.activeNotification) ? res.activeNotification : null;
                this.unreadNotificationCount = res.unreadNotificationCount;
            });

        if (this.authService.getSocketConnection()) {
            this.authService.getSocketConnection().on('connect', (socket) => {
            });

            this.authService.getSocketConnection().on('notification', (data) => {
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
            // this.store.dispatch({ type: notification.actionTypes.READ_NOTIFICATION, payload: data });
        }
    }

    read(data) {
        //console.log("notification2...........................",this.notifications)
        //this.store.dispatch({ type: notification.actionTypes.GET_ALL_NOTIFICATION, payload: {currentPage: this.page, limit: this.limit} });
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

        if (!data.isRead) {
            //console.log('READ_NOTIFICATION is FIRING .....');
            //this.store.dispatch({ type: notification.actionTypes.READ_NOTIFICATION, payload: data });
        } else {
            //this.store.dispatch({ type: notification.actionTypes.SHOW_NOTIFICATION, payload: data });
        }

    }

    getTemplate(message, image) {
        let img = image ? image : 'assets/img/user.png';
        return `
            <div class="col-12 col-sm-12">
                <div class="row">
                    <div class="col-1 col-sm-1 image-class">
                        <img src="` + img + `">
                    </div>
                    <div class="col-11 col-sm-11 message-class">
                        <div>
                            ` + message + `
                        </div>
                    </div>
                </div>
            </div>
        `;
    }

    showNotificationToast(data, notification) {
        if (this.toastId) {
            this.toastrService.remove(this.toastId);
        }
        let toasterConfig: ToastrConfig = new ToastrConfig();
        toasterConfig.positionClass = 'toast-bottom-right';
        toasterConfig.closeButton = true;
        toasterConfig.enableHtml = true;
        toasterConfig.toastClass = 'toast toast-custom';
        toasterConfig.timeOut = 10000;
        let toast = this.toastrService.info(data, null, toasterConfig);
        if (toast) {
            this.toastId = toast.toastId;
            toast.onTap.toPromise().then(() => {
                console.log('clicked', notification);
                let eventType = notification ? notification.eventType : null;
                let id;
                switch (eventType) {
                    case 'ACCEPT_JOB':
                        id = notification ? notification.id : null;
                        this.dataService.setData('jobId', id);
                        this.router.navigate(['pages/posts/postdetails']);
                        break;
                    case 'REJECT_JOB':
                        id = notification ? notification.id : null;
                        this.dataService.setData('jobId', id);
                        this.router.navigate(['pages/posts/postdetails']);
                        break;
                    default:
                        break;
                }
            });
        }
    }

    ngOnDestroy() {
        if (this.socketStoreAcceptRejectJob) {
            this.socketStoreAcceptRejectJob.unsubscribe();
        }
        if (this.socketStoreConfirmLabour) {
            this.socketStoreConfirmLabour.unsubscribe();
        }
        if (this.socketStoreCancelLabour) {
            this.socketStoreCancelLabour.unsubscribe();
        }
        if (this.socketStoreNewJob) {
            this.socketStoreNewJob.unsubscribe();
        }
        if (this.socketStoreActiveToInProgress) {
            this.socketStoreActiveToInProgress.unsubscribe();
        }
        if (this.socketStoreInProgressToComplete) {
            this.socketStoreInProgressToComplete.unsubscribe();
        }
        if (this.notificationStore) {
            this.notificationStore.unsubscribe();
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

