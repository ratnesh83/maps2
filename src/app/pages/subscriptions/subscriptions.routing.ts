import { Routes, RouterModule } from '@angular/router';
import { Subscriptions } from './subscriptions.component';
import { AllSubscriptions } from './components/all-subscriptions/all-subscriptions.component';

const routes: Routes = [
    {
        path: '',
        component: Subscriptions,
        children: [ ]
    }
];

export const routing = RouterModule.forChild(routes);
