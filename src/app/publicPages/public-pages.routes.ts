import { Routes, RouterModule } from '@angular/router';

import { PublicPages } from './public-pages.component';
import { Login } from './components/login/login.component';

import { Register } from './components/register/register.component';

import { ForgotPassword } from './components/forgot-password/forgot-password-modal.component';
import { Highcharts } from './lib/highcharts/highcharts.component';
import { AuthGuardPublic } from '../auth/service/auth-service/auth-guard-public.service';
import { AuthGuard } from '../auth/service/auth-service/auth-guard.service';
import { AuthGuardAdmin } from '../auth/service/auth-service/auth-guard-admin.service';
import { AuthGuardCustomer } from '../auth/service/auth-service/auth-guard-customer.service';
import { AuthGuardServiceProvider } from '../auth/service/auth-service/auth-guard-service-provider.service';
import { AuthGuardDriver } from '../auth/service/auth-service/auth-guard-driver.service';

export const routes: Routes = [
    {
        path: '',
        component: PublicPages,
        children: [
            { path: '', redirectTo: '/pages/dashboard', pathMatch: 'full' },
            { path: 'login', component: Login, canActivate: [AuthGuardPublic] },
            { path: 'register', component: Register, canActivate: [AuthGuardPublic] },
            { path: 'forgot', component: ForgotPassword, canActivate: [AuthGuardPublic] },
            { path: 'highcharts', component: Highcharts },
        ]
    }
];

export const routing = RouterModule.forChild(routes);
