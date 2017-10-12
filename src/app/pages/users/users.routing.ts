import { Routes, RouterModule } from '@angular/router';

import { Users } from './users.component';
import { RegisterCustomers } from './components/RegisterCustomers/register-customer.component';
import { AllCustomers } from './components/all-customers/all-customers.component';
import { AllEmployers } from './components/all-employers/all-employers.component';
import { AllWorkers } from './components/all-workers/all-workers.component';
import { EditWorker } from './components/edit-worker/edit-worker.component';
import { EditEmployer } from './components/edit-employer/edit-employer.component';
import { SingleCustomer } from './components/single-customer/single-customer.component';

// noinspection TypeScriptValidateTypes
const routes: Routes = [
    {
        path: '',
        component: Users,
        children: [

            { path: '', redirectTo: 'employers', pathMatch: 'full' },
            { path: 'employers', component: AllEmployers },
            { path: 'workers', component: AllWorkers },
            { path: 'editworker', component: EditWorker },
            { path: 'editemployer', component: EditEmployer },
            { path: 'singleCustomer', component: SingleCustomer }

        ]
    }
];

export const routing = RouterModule.forChild(routes);
