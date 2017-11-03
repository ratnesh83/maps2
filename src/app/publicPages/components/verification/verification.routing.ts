import { Routes, RouterModule } from '@angular/router';

import { Verification } from './verification.component';
import { ModuleWithProviders } from '@angular/core';

export const routes: Routes = [
    {
        path: '',
        component: Verification
    }
];

export const routing: ModuleWithProviders = RouterModule.forChild(routes);
