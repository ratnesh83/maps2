import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
    selector: 'home',
    styleUrls: ['./home.scss'],
    templateUrl: './home.html'
})
export class Home {

    public companiesNotifications = [];
    public jobsNotifications = [];
    public usersNotifications = [];

    constructor(private router: Router) {
        this.companiesNotifications = [
            {
                name: 'Kate',
                picture: 'assets/img/kate.png',
                time: new Date()
            },
            {
                name: 'Lee',
                picture: 'assets/img/lee.png',
                time: new Date()
            }
        ];
        this.jobsNotifications = [
            {
                name: 'Kate',
                picture: 'assets/img/kate.png',
                time: new Date()
            },
            {
                name: 'Lee',
                picture: 'assets/img/lee.png',
                time: new Date()
            }
        ];
        this.usersNotifications = [
            {
                name: 'Kate',
                picture: 'assets/img/kate.png',
                time: new Date()
            },
            {
                name: 'Lee',
                picture: 'assets/img/lee.png',
                time: new Date()
            }
        ];
    }

    getDuration(time) {
        let timeOfEvent = (new Date('Wed Nov 08 2017 16:21:49 GMT+0530 (IST)')).getTime() - (new Date(time)).getTime();
        let timeDiff = timeOfEvent / 60000;
        let timeDiffString = timeDiff.toString();
        if (Math.round(timeOfEvent / 3600000) < 1) {
            if (Math.round(timeOfEvent / 60000) > 1) {
                timeDiffString = Math.round(timeOfEvent / 60000).toString() + 'mins';
            } else {
                timeDiffString = Math.round(timeOfEvent / 60000).toString() + 'min';
            }
        } else if (Math.round(timeOfEvent / 3600000) < 24) {
            if (Math.round(timeOfEvent / 3600000) > 1) {
                timeDiffString = Math.round(timeOfEvent / 3600000).toString() + 'hrs';
            } else {
                timeDiffString = Math.round(timeOfEvent / 3600000).toString() + 'hr';
            }
        } else {
            if (Math.round(timeOfEvent / 3600000) > 1) {
                timeDiffString = Math.round(timeOfEvent / 3600000).toString() + 'days';
            } else {
                timeDiffString = Math.round(timeOfEvent / 3600000).toString() + 'day';
            }
        }
        // console.log(timeDiffString);
    }

    goToPostJobs() {
        this.router.navigate(['/pages/feedbacks']);
    }

    goToMyPosts() {

    }

    goToLaborList() {

    }

    goToDonations() {

    }

}
