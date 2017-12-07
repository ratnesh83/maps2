import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import * as labor from '../labors/state/labor.actions';
import 'style-loader!./side-panel.scss';

@Component({
    selector: 'side-panel',
    templateUrl: 'side-panel.html',
})

export class TopLists implements OnInit {

    public page = 1;
    public limit;
    public pageIndex;
    public count: number;
    public name: string;
    public role: string;
    public value: 'all';
    public filter;
    public showLoading: boolean = false;
    public topListStore;
    public topList;

    public companiesNotifications = [];
    public jobsNotifications = [];
    public usersNotifications = [];
    public laborsNotifications = [];

    constructor(
        private store: Store<any>
    ) {

        this.topListStore = this.store
            .select('topList')
            .subscribe((res: any) => {
                this.topList = res.topList;
                this.companiesNotifications = [];
                this.jobsNotifications = [];
                this.usersNotifications = [];
                this.laborsNotifications = [];
                if (res.topList) {
                    this.topList = res.topList;

                    if (this.topList.companyName) {
                        let company;
                        for (let i = 0; i < this.topList.companyName.length; i++) {
                            company = {
                                name: this.topList.companyName[i].companyName,
                                createdAt: this.topList.companyName[i].createdAt,
                                picture: this.topList.companyName[i].profilePicture ? this.topList.companyName[i].profilePicture.thumb : 'assets/img/user.png'
                            };
                            this.companiesNotifications.push(company);
                        }
                    }

                    if (this.topList.labours) {
                        let labor;
                        for (let i = 0; i < this.topList.labours.length; i++) {
                            labor = {
                                name: this.topList.labours[i].fullName ? this.topList.labours[i].fullName : this.topList.labours[i].lastName ? this.topList.labours[i].firstName + ' ' + this.topList.labours[i].lastName : this.topList.labours[i].firstName,
                                createdAt: this.topList.labours[i].createdAt,
                                picture: this.topList.labours[i].profilePicture ? this.topList.labours[i].profilePicture.thumb : 'assets/img/user.png'
                            };
                            this.laborsNotifications.push(labor);
                        }
                    }

                    if (this.topList.employers) {
                        let employer;
                        for (let i = 0; i < this.topList.employers.length; i++) {
                            employer = {
                                name: this.topList.employers[i].fullName ? this.topList.employers[i].fullName : this.topList.employers[i].lastName ? this.topList.employers[i].firstName + ' ' + this.topList.employers[i].lastName : this.topList.employers[i].firstName,
                                createdAt: this.topList.employers[i].createdAt,
                                picture: this.topList.employers[i].profilePicture ? this.topList.employers[i].profilePicture.thumb : 'assets/img/user.png'
                            };
                            this.usersNotifications.push(employer);
                        }
                    }

                    if (this.topList.newJobs) {
                        let job;
                        for (let i = 0; i < this.topList.newJobs.length; i++) {
                            job = {
                                name: this.topList.newJobs[i].title,
                                createdAt: this.topList.newJobs[i].createdAt,
                                picture: this.topList.newJobs[i].categoryId ? this.topList.newJobs[i].categoryId.image.thumb : 'assets/img/image-placeholder.jpg'
                            };
                            this.jobsNotifications.push(job);
                        }
                    }
                }
            });  
    };

    ngOnInit() {
        this.store.dispatch({
            type: labor.actionTypes.APP_GET_TOP_LIST_COPY,
            payload: {}
        });
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
            if (timeDiffDays < 2) {
                return '1 day';
            } else {
                return Math.floor(timeDiffDays).toString() + ' days';
            }
        }
    }

    ngOnDestroy() {
        if (this.topListStore) {
            this.topListStore.unsubscribe();
        }
    }

}