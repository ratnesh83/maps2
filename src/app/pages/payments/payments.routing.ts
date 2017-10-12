import { Routes, RouterModule } from '@angular/router';

import { Payments } from './payments.component';
import { AllPayments } from './components/all-payments/all-payments.component';

const routes: Routes = [
    {
        path: '',
        component: Payments,
        children: [ ]
    }
];

export const routing = RouterModule.forChild(routes);
