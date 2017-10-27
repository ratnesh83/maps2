import { Routes, RouterModule } from '@angular/router';

import { VerificationEmail } from './verification-email.component';
import { ModuleWithProviders } from '@angular/core';

export const routes: Routes = [
    {
        path: '',
        component: VerificationEmail
    }
];

export const routing: ModuleWithProviders = RouterModule.forChild(routes);
