import { Component } from '@angular/core';
import { BaThemeConfigProvider, ColorHelper } from '../../../theme';
import { PieChartService } from './pieChart.service';
import { Store } from '@ngrx/store';
import 'easy-pie-chart/dist/jquery.easypiechart.js';
import 'style-loader!./pieChart.scss';
import * as dashBoard from '../state/dashboard.actions';

@Component({
    selector: 'pie-chart',
    templateUrl: './pieChart.html'
})
// TODO: move easypiechart to component
export class PieChart {

    public charts: Array<Object>;
    private _init = false;


    constructor(private _pieChartService: PieChartService, private _baConfig: BaThemeConfigProvider, private store: Store<any>) {
        let pieColor = this._baConfig.get().colors.custom.dashboardPieChart;
        
        this.store
            .select('dashBoard')
            .subscribe((res: any) => {

                if (res.dashBoardCount != null) {
                    this.charts =
                        [{
                            color: pieColor,
                            description: '1',
                            stats: res.dashBoardCount.data.totalBookingCount,
                            icon: 'person',
                        },
                        {
                            color: pieColor,
                            description: '2',
                            stats: res.dashBoardCount.data.totalCustomerCount,
                            icon: 'money',
                        },
                        {
                            color: pieColor,
                            description: '3',
                            stats: res.dashBoardCount.data.totalDriverCount,
                            icon: 'face',
                        },
                        {
                            color: pieColor,
                            description: '4',
                            stats: res.dashBoardCount.data.totalServiceProviderCount,
                            icon: 'refresh',
                        },
                        {
                            color: pieColor,
                            description: '5',
                            stats: res.dashBoardCount.data.todaysBookingRequestsCount,
                            icon: 'money',
                        },
                        {
                            color: pieColor,
                            description: '6',
                            stats: res.dashBoardCount.data.todaysRevenue,
                            icon: 'money',
                        },
                        {
                            color: pieColor,
                            description: '7',
                            stats: res.dashBoardCount.data.todaysBookingRequestsCount,
                            icon: 'money',
                        }
                        ];
                }


            });
        /* this.store.dispatch({ type: dashBoard.actionTypes.GET_DASHBOARD_COUNT }); */
    }

    // ngAfterViewInit() {
    //   if (!this._init) {
    //     this._loadPieCharts();
    //     this._updatePieCharts();
    //     this._init = true;
    //   }
    // }

    private _loadPieCharts() {

        jQuery('.chart').each(function () {
            let chart = jQuery(this);
            chart.easyPieChart({
                easing: 'easeOutBounce',
                onStep: function (from, to, percent) {
                    jQuery(this.el).find('.percent').text(Math.round(percent));
                },
                barColor: jQuery(this).attr('data-rel'),
                trackColor: 'rgba(0,0,0,0)',
                size: 84,
                scaleLength: 0,
                animation: 2000,
                lineWidth: 9,
                lineCap: 'round',
            });
        });
    }

    private _updatePieCharts() {
        let getRandomArbitrary = (min, max) => { return Math.random() * (max - min) + min; };

        jQuery('.pie-charts .chart').each(function (index, chart) {
            jQuery(chart).data('easyPieChart').update(getRandomArbitrary(55, 90));
        });
    }
}
