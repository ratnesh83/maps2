import { Routes, RouterModule } from '@angular/router';

import { Terms } from './terms.component';
import { ModuleWithProviders } from '@angular/core';

export const routes: Routes = [
    {
        path: '',
        component: Terms
    }
];

export const routing: ModuleWithProviders = RouterModule.forChild(routes);
