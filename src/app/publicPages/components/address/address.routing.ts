import { Routes, RouterModule } from '@angular/router';

import { Address } from './address.component';

const routes: Routes = [
    {
        path: '',
        component: Address
    }
];

export const routing = RouterModule.forChild(routes);
