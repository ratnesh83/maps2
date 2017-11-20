import { Routes, RouterModule } from '@angular/router';

import { LaborList } from './labor-list.component';
import { AllLaborList } from './components/all-labors/all-labors.component';

const routes: Routes = [
    {
        path: '',
        component: LaborList,
        children: [

            { path: '', redirectTo: 'alllabors', pathMatch: 'full' },
            { path: 'alllabors', component: AllLaborList }

        ]
    }
];

export const routing = RouterModule.forChild(routes);
