import { Component } from '@angular/core';

@Component({
    selector: 'highchart',
    styleUrls: ['./highcharts.scss'],
    templateUrl: './highcharts.html'
})
export class Highcharts {

    constructor() {
        this.options = {
            title: { text: 'Example' },
            chart: { type: 'column', zoomType: 'x' }, // type : 'spline' , 'column'
            series: [
                { name: 'series 1', data: [29.9, 71.5, 106.4, 129.2, 45, 13, 120, 29.9, 71.5, 106.4, 129.2, 45, 13, 120] },
                { name: 'series 2', data: [30, 4, 106.4, 0, 10, -100, 120, 29.9, 71.5, 106.4, 129.2, 45, 13, 120] }
            ]
        };
    }
    options: Object;
    seriesName: string;
    onSeriesMouseOver(e) {
        this.seriesName = e.context.name;
    }
}
