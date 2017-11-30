import { Component, ViewChild, ViewChildren, QueryList, ElementRef, Renderer } from '@angular/core';
import { Store } from '@ngrx/store';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import * as setting from '../../state/setting.actions';
import * as app from '../../../../state/app.actions';
import { CalendarService } from '../../../../services/calendar-service/calendar.service';
import { FormGroup, AbstractControl, FormBuilder, Validators, FormArray } from '@angular/forms';
import { BaThemeSpinner } from '../../../../theme/services';
import { IMultiSelectOption } from 'angular-2-dropdown-multiselect';
import { ToastrService, ToastrConfig } from 'ngx-toastr';
import 'style-loader!./availability-calendar.scss';

@Component({
    selector: 'availability-calendar',
    templateUrl: './availability-calendar.html',
})
export class AvailabilityCalendar {

    @ViewChild('file') public _fileUpload: ElementRef;
    @ViewChildren('file') public _filesUpload: QueryList<HTMLInputElement>;
    @ViewChild('scrollBottom') private _scrollContainer: ElementRef;
    @ViewChild('scrollBottomQual') private _scrollContainerQual: ElementRef;
    @ViewChild('scrollBottomExp') private _scrollContainerExp: ElementRef;
    @ViewChild('machineName') private _machineName: ElementRef;
    @ViewChild('qualificationName') private _qualificationName: ElementRef;
    @ViewChild('expertiseName') private _expertiseName: ElementRef;
    public calendarConfiguration: any;
    private _calendar: Object;
    public settings;
    public form: FormGroup;
    public serviceRadii: AbstractControl;
    public imageUploading: boolean = false;
    public fileUploadIndex;
    public imageUploadChildrenArray;
    public settingStore;
    constructor(
        private store: Store<any>,
        private modalService: NgbModal,
        private fb: FormBuilder,
        private toastrService: ToastrService,
        private renderer: Renderer,
        private _calendarService: CalendarService
    ) {
        this.calendarConfiguration = this._calendarService.getData();
        this.calendarConfiguration.select = (start, end) => this._onSelect(start, end);
        this.settingStore = this.store
            .select('setting')
            .subscribe((res: any) => {

            });
    }

    public onCalendarReady(calendar) {
        this._calendar = calendar;
    }

    scrollToBottom() {
        if (this._machineName) {
            setTimeout(() => {
                this._machineName.nativeElement.focus();
            }, 500);
            jQuery('html, body').animate({ scrollTop: this._scrollContainer.nativeElement.scrollHeight }, { duration: 500 });
        }
    }

    scrollToBottomQual() {
        if (this._qualificationName) {
            setTimeout(() => {
                this._qualificationName.nativeElement.focus();
            }, 500);
            jQuery('html, body').animate({ scrollTop: this._scrollContainerQual.nativeElement.scrollHeight }, { duration: 500 });
        }
    }

    scrollToBottomExp() {
        if (this._expertiseName) {
            setTimeout(() => {
                this._expertiseName.nativeElement.focus();
            }, 500);
            jQuery('html, body').animate({ scrollTop: this._scrollContainerExp.nativeElement.scrollHeight + this._scrollContainerQual.nativeElement.scrollHeight }, { duration: 500 });
        }
    }

    ngOnInit() {

    }

    private _onSelect(start, end) {

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
        /* if (this.settingStore) {
            this.settingStore.unsubscribe();
        } */
    }
    ngAfterViewInit() {

    }

}