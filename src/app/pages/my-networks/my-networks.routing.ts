import { Routes, RouterModule } from '@angular/router';

import { MyNetworks } from './my-networks.component';
import { AllLaborList } from './components/all-labors/all-labors.component';
import { AllEmployerList } from './components/all-employers/all-employers.component';

const routes: Routes = [
    {
        path: '',
        component: MyNetworks,
        children: [

            { path: '', redirectTo: 'alllabors', pathMatch: 'full' },
            { path: 'alllabors', component: AllLaborList },
            { path: 'allemployers', component: AllEmployerList }

        ]
    }
];

export const routing = RouterModule.forChild(routes);
