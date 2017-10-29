import { Routes, RouterModule } from '@angular/router';
import { PublicPages } from './public-pages.component';
import { Login } from './components/login/login.component';
import { Register } from './components/register/register.component';
import { Address } from './components/address/address.component';
import { Verification } from './components/verification/verification.component';
import { VerificationEmail } from './components/verification-email/verification-email.component';
import { VerificationMobile } from './components/verification-mobile/verification-mobile.component';
import { Documents } from './components/document/document.component';
import { AuthGuardPublic } from '../auth/service/auth-service/auth-guard-public.service';

export const routes: Routes = [
    {
        path: '',
        component: PublicPages,
        children: [
            { path: '', redirectTo: '/pages/dashboard', pathMatch: 'full' },
            { path: 'login', component: Login, canActivate: [AuthGuardPublic] },
            { path: 'register', component: Register, canActivate: [AuthGuardPublic] },
            { path: 'address', component: Address, canActivate: [AuthGuardPublic] },
            { path: 'document', component: Documents, canActivate: [AuthGuardPublic] },
            { path: 'verification', component: Verification, canActivate: [AuthGuardPublic] },
            { path: 'verifyEmail', component: VerificationEmail, canActivate: [AuthGuardPublic] },
            { path: 'verifyMobile', component: VerificationMobile, canActivate: [AuthGuardPublic] }
        ]
    }
];
export const routing = RouterModule.forChild(routes);
