import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { BaThemeConfigProvider, ColorHelper } from '../../../theme';
import * as dashBoard from '../state/dashboard.actions';

@Injectable()
export class PieChartService {
    totalBookingCount;
    customerCount;
    driverCount;
    serviceProviderCount;
    todaysBookingRequestsCount;
    todaysRevenue;
    totalRevenue;

    constructor(private _baConfig: BaThemeConfigProvider, private store: Store<any>) {
        this.store
            .select('dashBoard')
            .subscribe((res: any) => {
                //// // console.log(res)
                if (res.dashBoardCount != null) {
                    this.totalBookingCount = res.dashBoardCount.data.totalBookingCount;
                    this.customerCount = res.dashBoardCount.data.customerCount;
                    this.driverCount = res.dashBoardCount.data.driverCount;
                    this.serviceProviderCount = res.dashBoardCount.data.serviceProviderCount;
                    this.todaysBookingRequestsCount = res.dashBoardCount.data.todaysBookingRequestsCount;
                    this.todaysRevenue = res.dashBoardCount.data.todaysRevenue;
                    this.totalRevenue = res.dashBoardCount.data.totalRevenue;
                }
                // console.log(this.totalBookingCount)
            });
        //this.store.dispatch({ type: dashBoard.actionTypes.GET_DASHBOARD_COUNT});
    }

    getData() {

        let pieColor = this._baConfig.get().colors.custom.dashboardPieChart;
        if (this.totalBookingCount) {
            // // console.log('hi........................');
            //    return [
            //   {
            //     color: pieColor,
            //     description: 'general.dashboard.newVisits',
            //     stats: this.totalBookingCount,
            //     icon: 'person',
            //   }, {
            //     color: pieColor,
            //     description: 'general.dashboard.purchases',
            //     stats: this.customerCount,
            //     icon: 'money',
            //   }, {
            //     color: pieColor,
            //     description: 'general.dashboard.activeUsers',
            //     stats:  this.driverCount,
            //     icon: 'face',
            //   }, {
            //     color: pieColor,
            //     description: 'general.dashboard.returned',
            //     stats: '32,592',
            //     icon: 'refresh',
            //   }
            // ];
        }

    }
}
