import { Injectable } from '@angular/core';

@Injectable()
export class LoadingBarSer {

    state = {
        loggedIn: false,
    };

    logout() { 
        this.state.loggedIn = false; 
    }

    login() { 
        this.state.loggedIn = true; 
    }

}
