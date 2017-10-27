import { Routes, RouterModule } from '@angular/router';
import { VerificationMobile } from './verification-mobile.component';
import { ModuleWithProviders } from '@angular/core';

export const routes: Routes = [
    {
        path: '',
        component: VerificationMobile
    }
];

export const routing: ModuleWithProviders = RouterModule.forChild(routes);
