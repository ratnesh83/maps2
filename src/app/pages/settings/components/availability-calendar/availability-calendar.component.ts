import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import * as setting from '../../state/setting.actions';
import * as app from '../../../../state/app.actions';
import { CalendarService } from '../../../../services/calendar-service/calendar.service';
import { FormGroup, AbstractControl, FormBuilder, Validators, FormArray } from '@angular/forms';
import { BaThemeSpinner } from '../../../../theme/services';
import { JwtHelper } from 'angular2-jwt';
import { Router } from '@angular/router';
import { ToastrService, ToastrConfig } from 'ngx-toastr';
import 'style-loader!./availability-calendar.scss';

@Component({
    selector: 'availability-calendar',
    templateUrl: './availability-calendar.html',
})

export class AvailabilityCalendar {

    public calendarConfiguration: any;
    private _calendar: Object;
    public settings;
    public form: FormGroup;
    public settingStore;
    public user;
    public jwtHelper: JwtHelper = new JwtHelper();
    public busyDates = [];

    constructor(
        private store: Store<any>,
        private fb: FormBuilder,
        private router: Router,
        private toastrService: ToastrService,
        private _calendarService: CalendarService
    ) {

        this.settingStore = this.store
            .select('setting')
            .subscribe((res: any) => {
                if (res && res.busyDates) {
                    this.busyDates = [];
                    for (let i = 0; i < res.busyDates.length; i++) {
                        this.busyDates.push(this.getLocalToUtcTime(new Date(res.busyDates[i]), new Date(res.busyDates[i]).getTimezoneOffset));
                    }
                }
                if (res && res.availabilities) {
                    this.calendarConfiguration = res.availabilities;
                    this.calendarConfiguration.select = (start, end) => {
                        this._onSelect(start, end);
                    };
                    this.calendarConfiguration.selectAllow = (selectInfo) => {
                        this._onSelectAllow(selectInfo);
                    };
                    this.calendarConfiguration.eventClick = (jsEvent, view) => {
                        this._onEventClick(jsEvent, view);
                    };
                    this.calendarConfiguration.selectOverlap = false;
                    this.calendarConfiguration.selectHelper = true;
                }
            });
    }

    onCalendarReady(calendar) {
        this._calendar = calendar;
    }

    ngOnInit() {
        this.store.dispatch({
            type: setting.actionTypes.APP_GET_AVAILABILITY, payload: {}
        });
        let token = localStorage.getItem('tokenSession');
        if (token && !this.jwtHelper.isTokenExpired(token)) {
            this.user = this.jwtHelper.decodeToken(token);
        }
    }

    _onSelect(start, end) {
        if (this._calendar != null) {
            let eventData;
            eventData = {
                title: 'Scheduled',
                start: start,
                end: end
            };
            let formData = new FormData();
            formData.append('busyDates', JSON.stringify(this.busyDates));
            this.store.dispatch({
                type: setting.actionTypes.UPDATE_CALENDER_INFO,
                payload: formData
            });
            jQuery(this._calendar).fullCalendar('renderEvent', eventData, true);
            jQuery(this._calendar).fullCalendar('unselect');
        }
    }

    _onEventClick(jsEvent, view) {
        let start = jsEvent.start;
        let dateToRemove = this.getLocalToUtcTime(start._d, start._d.getTimezoneOffset());
        for (let i = 0; i < this.busyDates.length; i++) {
            if (this.busyDates[i].toString().indexOf(dateToRemove.toString()) != -1) {
                this.busyDates.splice(i, 1);
            }
        }
        if (this._calendar != null) {
            if (jsEvent && jsEvent._id) {
                let formData = new FormData();
                formData.append('busyDates', JSON.stringify(this.busyDates));
                this.store.dispatch({
                    type: setting.actionTypes.UPDATE_CALENDER_INFO,
                    payload: formData
                });
                jQuery(this._calendar).fullCalendar('removeEvents', jsEvent._id);
            }
        }
    }

    _onSelectAllow(selectInfo) {
        let end = new Date(new Date(selectInfo.end).setTime(new Date(selectInfo.end).getTime() - (24 * 60 * 60 * 1000)));
        if (this.checkUniqueFromArray(this.busyDates, this.getLocalToUtcTime(end, end.getTimezoneOffset()))) {
            this.busyDates.push(this.getLocalToUtcTime(end, end.getTimezoneOffset()));
        }
    }

    getLocalToUtcTime(date, offset) {
        let localDate = new Date();
        let timezoneOffset = new Date().getTimezoneOffset();
        if (date) {
            localDate = new Date(date);
        }
        if (offset) {
            timezoneOffset = localDate.getTimezoneOffset();
        }
        let newDate = new Date(localDate.setTime(localDate.getTime() + timezoneOffset * 60000));
        return this.getDateString(newDate);
    }

    getDateString(date) {
        let localDate = new Date();
        if (date) {
            localDate = new Date(date);
        }
        let year = localDate.getFullYear().toString();
        let month = (localDate.getMonth() + 1).toString();
        let day = localDate.getDate().toString();
        if (month.length == 1) {
            month = '0' + month;
        }
        if (day.length == 1) {
            day = '0' + day;
        }
        return (year + '-' + month + '-' + day);
    }

    checkUniqueFromArray(datesArray: any[], date): boolean {
        for (let i = 0; i < datesArray.length; i++) {
            if (datesArray[i].toString().indexOf(date.toString()) != -1) {
                return false;
            }
        }
        return true;
    }

    ngOnDestroy() {
        if (this.settingStore) {
            this.settingStore.unsubscribe();
        }
    }

    goToProfile() {
        let token = localStorage.getItem('tokenSession');
        if (token && !this.jwtHelper.isTokenExpired(token)) {
            this.user = this.jwtHelper.decodeToken(token);
            if (this.user.userType == 'EMPLOYER') {
                this.router.navigate(['/pages/settings/employerprofileedit']);
            } else if (this.user.userType == 'USER') {
                this.router.navigate(['/pages/settings/userprofileedit']);
            }
        }
    }

    ngAfterViewInit() {

    }

}