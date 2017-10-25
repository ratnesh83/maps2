import { Routes, RouterModule } from '@angular/router';

import { Documents } from './document.component';

const routes: Routes = [
    {
        path: '',
        component: Documents
    }
];

export const routing = RouterModule.forChild(routes);
