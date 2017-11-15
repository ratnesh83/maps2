import { Component } from '@angular/core';
import { GlobalState } from '../../../global.state';
import 'style-loader!./baPageTop.scss';
import { DataService } from '../../../services/data-service/data.service';
import { Store } from '@ngrx/store';
import * as auth from '../../../auth/state/auth.actions';
import { JwtHelper } from 'angular2-jwt';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';

@Component({
    selector: 'ba-page-top',
    templateUrl: './baPageTop.html',
})
export class BaPageTop {

    public isScrolled: boolean;
    public isMenuCollapsed: boolean = false;
    public jwtHelper: JwtHelper = new JwtHelper();
    public user;
    public storeData;
    public name;
    public profilePicture;

    constructor(private _state: GlobalState,
        private store: Store<any>,
        private router: Router,
        private dataService: DataService) {

        this._state.subscribe('menu.isCollapsed', (isCollapsed) => {
            this.isMenuCollapsed = isCollapsed;
        });

        this.profilePicture = 'assets/img/user.png';

        this.storeData = this.store
            .select('auth')
            .subscribe((res: any) => {
                if (res && res.userDetails) {
                    if (res.userDetails.fullName) {
                        this.name = this.titleCase(res.userDetails.fullName);
                    } else if (res.userDetails.firstName) {
                        this.name = this.titleCase(res.userDetails.firstName);
                    }
                    this.profilePicture = res.userDetails.profilePicture ? res.userDetails.profilePicture.thumb ? res.userDetails.profilePicture.thumb : res.userDetails.profilePicture.original : null;
                }
            });
    }

    ngOnInit() {
        let token = localStorage.getItem('tokenSession');
        if (token && !this.jwtHelper.isTokenExpired(token)) {
            this.user = this.jwtHelper.decodeToken(token);
            this.store.dispatch({
                type: auth.actionTypes.AUTH_GET_USER_DETAILS_BY_ID,
                payload: {
                    userId: this.user._id
                }
            });
        }
    }

    ngOnDestroy() {
        if (this.storeData) {
            this.storeData.unsubscribe();
        }
    }

    toggleMenu() {
        this.isMenuCollapsed = !this.isMenuCollapsed;
        this._state.notifyDataChanged('menu.isCollapsed', this.isMenuCollapsed);
        return false;
    }

    scrolledChanged(isScrolled) {
        if (this.isScrolled != undefined) {
            this.isScrolled = isScrolled;
        }
    }

    logout() {
        this.store.dispatch(new auth.AuthLogoutAction());
    }

    titleCase(input) {
        if (input != undefined) {
            let smallWords = /^(a|an|and|as|at|but|by|en|for|if|in|nor|of|on|or|per|the|to|vs?\.?|via)$/i;
            input = input.toLowerCase();
            return input.replace(/[A-Za-z0-9\u00C0-\u00FF]+[^\s-]*/g, function (match, index, title) {
                if (index > 0 && index + match.length !== title.length &&
                    match.search(smallWords) > -1 && title.charAt(index - 2) !== ':' &&
                    (title.charAt(index + match.length) !== '-' || title.charAt(index - 1) === '-') &&
                    title.charAt(index - 1).search(/[^\s-]/) < 0) {
                    return match.toLowerCase();
                }
                if (match.substr(1).search(/[A-Z]|\../) > -1) {
                    return match;
                }
                return match.charAt(0).toUpperCase() + match.substr(1);
            });
        }
    }

}
