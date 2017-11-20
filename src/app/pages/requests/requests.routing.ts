import { Routes, RouterModule } from '@angular/router';

import { Requests } from './requests.component';
import { AllRequests } from './components/all-requests/all-requests.component';
import { RequestDetails } from './components/request-details/request-details.component';

const routes: Routes = [
    {
        path: '',
        component: Requests,
        children: [

            { path: '', redirectTo: 'allrequests', pathMatch: 'full' },
            { path: 'allrequests', component: AllRequests },
            { path: 'requestdetails', component: RequestDetails }

        ]
    }
];

export const routing = RouterModule.forChild(routes);
