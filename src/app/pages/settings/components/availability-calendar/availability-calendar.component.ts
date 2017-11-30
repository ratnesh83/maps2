import { Component, Input, SimpleChange } from '@angular/core';
import { Store } from '@ngrx/store';
import * as setting from '../../state/setting.actions';
import * as app from '../../../../state/app.actions';
import { CalendarService } from '../../../../services/calendar-service/calendar.service';
import { FormGroup, AbstractControl, FormBuilder, Validators, FormArray } from '@angular/forms';
import { BaThemeSpinner } from '../../../../theme/services';
import { ToastrService, ToastrConfig } from 'ngx-toastr';
import 'style-loader!./availability-calendar.scss';

@Component({
    selector: 'availability-calendar',
    templateUrl: './availability-calendar.html',
})
export class AvailabilityCalendar {

    @Input() changes;
    public calendarConfiguration: any;
    private _calendar: Object;
    public settings;
    public form: FormGroup;
    public settingStore;
    public busyDates = [];

    constructor(
        private store: Store<any>,
        private fb: FormBuilder,
        private toastrService: ToastrService,
        private _calendarService: CalendarService
    ) {

        this.settingStore = this.store
            .select('setting')
            .subscribe((res: any) => {
                if (res && res.availabilities) {
                    console.log(res.availabilities);
                    this.calendarConfiguration = res.availabilities;
                    
                    this.calendarConfiguration.select = (start, end) => {
                        this._onSelect(start, end);
                    };
                    this.calendarConfiguration.eventClick = (jsEvent, view) => {
                        this._onEventClick(jsEvent, view);
                    };
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
    }

    ngOnChanges(changes: SimpleChange) {
        console.log(changes);
    }

    _onSelect(start, end) {
        console.log(this.getLocalToUtcTime(start._d, start._d.getTimezoneOffset()));
        if (this._calendar != null) {
            let title = prompt('Event Title:');
            let eventData;
            if (title) {
                eventData = {
                    title: title,
                    start: start,
                    end: end
                };
                let formData = new FormData();
                formData.append('busyDates', JSON.stringify([this.getLocalToUtcTime(start._d, start._d.getTimezoneOffset())]));
                this.store.dispatch({
                    type: setting.actionTypes.UPDATE_PROFILE_INFO, 
                    payload: formData
                });
                jQuery(this._calendar).fullCalendar('renderEvent', eventData, true);
            }
            jQuery(this._calendar).fullCalendar('unselect');
        }
    }

    _onEventClick(jsEvent, view) {
        console.log(jsEvent, view);
        if (this._calendar != null) {
            let title = prompt('Event Title:');
            let eventData;
            if (jsEvent && jsEvent._id) {

                jQuery(this._calendar).fullCalendar('removeEvents', jsEvent._id);
            }
            
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
        if(month.length == 1) {
            month = '0' + month;
        }
        if(day.length == 1) {
            day = '0' + day;
        }
        return (year + '-' + month + '-' + day);
    }

    ngOnDestroy() {
        if (this.settingStore) {
            this.settingStore.unsubscribe();
        }
    }

    ngAfterViewInit() {

    }

}