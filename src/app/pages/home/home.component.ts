import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
    selector: 'home',
    styleUrls: ['./home.scss'],
    templateUrl: './home.html'
})
export class Home {

    constructor(private router: Router) {
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
