import { Component } from '@angular/core';
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

    public calendarConfiguration: any;
    private _calendar: Object;
    public settings;
    public form: FormGroup;
    public settingStore;
    constructor(
        private store: Store<any>,
        private fb: FormBuilder,
        private toastrService: ToastrService,
        private _calendarService: CalendarService
    ) {

        this.calendarConfiguration = this._calendarService.getData();
        this.calendarConfiguration.select = (start, end) => {
            this._onSelect(start, end);
        };

        this.settingStore = this.store
            .select('setting')
            .subscribe((res: any) => {

            });
    }

    onCalendarReady(calendar) {
        this._calendar = calendar;
    }

    ngOnInit() {

    }

    _onSelect(start, end) {
        if (this._calendar != null) {
            let title = prompt('Event Title:');
            let eventData;
            if (title) {
                eventData = {
                    title: title,
                    start: start,
                    end: end
                };
                jQuery(this._calendar).fullCalendar('renderEvent', eventData, true);
            }
            jQuery(this._calendar).fullCalendar('unselect');
        }
    }

    ngOnDestroy() {
        if (this.settingStore) {
            this.settingStore.unsubscribe();
        }
    }

    ngAfterViewInit() {

    }

}