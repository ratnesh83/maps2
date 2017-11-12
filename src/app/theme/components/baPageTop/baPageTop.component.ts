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

    constructor(private _state: GlobalState,
        private store: Store<any>,
        private router: Router,
        private dataService: DataService) {

        this._state.subscribe('menu.isCollapsed', (isCollapsed) => {
            this.isMenuCollapsed = isCollapsed;
        });

        this.storeData = this.store
            .select('auth')
            .subscribe((res: any) => {
                if (res) {

                }
            });
    }

    ngOnInit() {
        let token = localStorage.getItem('tokenSession');
        if (token && !this.jwtHelper.isTokenExpired(token)) {
            this.user = this.jwtHelper.decodeToken(token);
            // this.store.dispatch({ type: auth.actionTypes.AUTH_GET_USER_DETAILS, payload: { userId: this.user._id } });
        }

    }

    ngOnDestroy() {
        if (this.storeData) {
            //this.storeData.unsubscribe();
        }
    }

    public toggleMenu() {
        this.isMenuCollapsed = !this.isMenuCollapsed;
        this._state.notifyDataChanged('menu.isCollapsed', this.isMenuCollapsed);
        return false;
    }

    public scrolledChanged(isScrolled) {
        if (this.isScrolled != undefined) {
            this.isScrolled = isScrolled;
        }
    }

    logout() {
        this.store.dispatch(new auth.AuthLogoutAction());
    }

}
