import { Routes, RouterModule } from '@angular/router';

import { Labors } from './labors.component';
import { AllLabors } from './components/all-labors/all-labors.component';

const routes: Routes = [
    {
        path: '',
        component: Labors,
        children: [

            { path: '', redirectTo: 'alllabors', pathMatch: 'full' },
            { path: 'alllabors', component: AllLabors }

        ]
    }
];

export const routing = RouterModule.forChild(routes);
