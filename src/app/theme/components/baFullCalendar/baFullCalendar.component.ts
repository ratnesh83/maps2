import { Component, ViewChild, Input, Output, ElementRef, EventEmitter, SimpleChange } from '@angular/core';
import 'fullcalendar/dist/fullcalendar.js';
import 'style-loader!./baFullCalendar.scss';

@Component({
    selector: 'ba-full-calendar',
    templateUrl: './baFullCalendar.html',
})
export class BaFullCalendar {

    @Input() baFullCalendarConfiguration: any;
    @Input() baFullCalendarClass: string;
    @Input() baRenderEvent: any;
    @Output() onCalendarReady = new EventEmitter<any>();

    @ViewChild('baFullCalendar') public _selector: ElementRef;

    ngAfterViewInit() {
        let calendar = jQuery(this._selector.nativeElement).fullCalendar(this.baFullCalendarConfiguration);
        this.onCalendarReady.emit(calendar);
    }

    ngOnChanges(changes: SimpleChange) {
        
    }


}
