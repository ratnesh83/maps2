import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response, URLSearchParams } from '@angular/http';
import { BaThemeConfigProvider } from '../../theme/theme.configProvider';
import { environment } from '../../environment/environment';
import { ApiService } from '../api-service/api.service';

@Injectable()
export class CalendarService {

    authRequired;
    utcOffset;

    constructor(private _baConfig: BaThemeConfigProvider, private http: Http, private apiService: ApiService) {
    }

    getAllAvailability(payload) {
        let url;
        let skip = payload.hasOwnProperty('skip') ? payload.skip : ((payload.currentPage - 1) * payload.limit);
        url = environment.APP.API_URL + environment.APP.GET_ALL_AVAILABILITY;
        this.authRequired = true;
        this.utcOffset = false;
        return this.apiService.getApi(url, this.authRequired, this.utcOffset);
    }

    getData(busyDates) {
        let dashboardColors = this._baConfig.get().colors.dashboard;
        let events = [];
        if (busyDates) {
            for (let i = 0; i < busyDates.length; i++) {
                let event = {
                    title: 'Scheduled',
                    start: this.getLocalToUtcTimeString(new Date(busyDates[i]), new Date(busyDates[i]).getTimezoneOffset()),
                    color: '026eff'
                };
                events.push(event);
            }
        }

        return {
            header: {
                left: 'today',
                center: 'title', 
                right: 'prev, next'
            },
            defaultDate: new Date(),
            selectable: true,
            selectHelper: true,
            editable: true,
            eventLimit: true,
            events: events
        };
    }

    getLocalToUtcTimeString(date, offset) {
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

}