import { Routes, RouterModule } from '@angular/router';
import { Donations } from './donations.component';
import { Donation } from './components/donations/donations.component';

const routes: Routes = [
    {
        path: '',
        component: Donations,
        children: [ ]
    }
];

export const routing = RouterModule.forChild(routes);
