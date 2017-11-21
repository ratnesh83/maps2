import { Routes, RouterModule } from '@angular/router';

import { Jobs } from './jobs.component';
import { AllJobs } from './components/all-jobs/all-jobs.component';
import { JobDetails } from './components/job-details/job-details.component';

const routes: Routes = [
    {
        path: '',
        component: Jobs,
        children: [

            { path: '', redirectTo: 'alljobs', pathMatch: 'full' },
            { path: 'alljobs', component: AllJobs },
            { path: 'jobdetails', component: JobDetails }

        ]
    }
];

export const routing = RouterModule.forChild(routes);
