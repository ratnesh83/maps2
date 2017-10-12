import { Routes, RouterModule } from '@angular/router';

import { Jobs } from './jobs.component';
import { AllJobs } from './components/all-jobs/all-jobs.component';

const routes: Routes = [
    {
        path: '',
        component: Jobs,
        children: [

            { path: '', redirectTo: 'jobs', pathMatch: 'full' },
            { path: 'jobs', component: AllJobs }

        ]
    }
];

export const routing = RouterModule.forChild(routes);
