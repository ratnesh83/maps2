import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';
import { AuthHttp, JwtHelper } from 'angular2-jwt';
import * as io from 'socket.io-client';
import { environment } from '../../../environment/environment';
import { AuthService } from '../../../auth/service/auth-service/auth.service';

@Injectable()
export class BaMsgCenterService {

    private _notifications = [
        {
            name: 'Vlad',
            text: 'Vlad posted a new article.',
            time: '1 min ago'
        },
        {
            name: 'Kostya',
            text: 'Kostya changed his contact information.',
            time: '2 hrs ago'
        },
        {
            image: 'assets/img/shopping-cart.svg',
            text: 'New orders received.',
            time: '5 hrs ago'
        },
        {
            name: 'Andrey',
            text: 'Andrey replied to your comment.',
            time: '1 day ago'
        },
        {
            name: 'Nasta',
            text: 'Today is Nasta\'s birthday.',
            time: '2 days ago'
        },
        {
            image: 'assets/img/comments.svg',
            text: 'New comments on your post.',
            time: '3 days ago'
        },
        {
            name: 'Kostya',
            text: 'Kostya invited you to join the event.',
            time: '1 week ago'
        }
    ];

    private _messages = [
        {
            name: 'Nasta',
            text: 'After you get up and running, you can place Font Awesome icons just about...',
            time: '1 min ago'
        },
        {
            name: 'Vlad',
            text: 'You asked, Font Awesome delivers with 40 shiny new icons in version 4.2.',
            time: '2 hrs ago'
        },
        {
            name: 'Kostya',
            text: 'Want to request new icons? Here\'s how. Need vectors or want to use on the...',
            time: '10 hrs ago'
        },
        {
            name: 'Andrey',
            text: 'Explore your passions and discover new ones by getting involved. Stretch your...',
            time: '1 day ago'
        },
        {
            name: 'Nasta',
            text: 'Get to know who we are - from the inside out. From our history and culture, to the...',
            time: '1 day ago'
        },
        {
            name: 'Kostya',
            text: 'Need some support to reach your goals? Apply for scholarships across a variety of...',
            time: '2 days ago'
        },
        {
            name: 'Vlad',
            text: 'Wrap the dropdown\'s trigger and the dropdown menu within .dropdown, or...',
            time: '1 week ago'
        }
    ];

    private url = environment.APP.API_URL;
    private socket;
    public user;
    public jwtHelper: JwtHelper = new JwtHelper();

    public getMessages(): Array<Object> {
        return this._messages;
    }

    public getNotificationsArray(): Array<Object> {
        return this._notifications;
    }

    constructor(private authService: AuthService) {
        let token = localStorage.getItem('token');
        this.user = this.jwtHelper.decodeToken(token);
        let userType;
        if (this.user) {
            userType = this.user.userType;
        }
        let headerToken = token;
        if (this.authService.getSocketConnection()) {
            this.socket = this.authService.getSocketConnection();
        } else {
            this.socket = io(this.url + '?accessToken=' + token + '&userType=' + userType, {
                extraHeaders: {
                    Authorization: headerToken
                }
            });
        }
    }

    sendMessage(key, message) {
        this.socket.emit(key, message);
    }

    getNotifications(socket) {
        if (this.authService.getSocketConnection()) {
            this.socket = this.authService.getSocketConnection();
        }
        let observable = new Observable(observer => {
            this.socket.on(socket, (data) => {
                observer.next(data);
            });
        });
        return observable;
    }
}
