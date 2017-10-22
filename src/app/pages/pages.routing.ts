import { Routes, RouterModule } from '@angular/router';
import { Pages } from './pages.component';
import { ModuleWithProviders } from '@angular/core';
import { AuthGuard } from '../auth/service/auth-service/auth-guard.service';
import { AuthGuardAdmin } from '../auth/service/auth-service/auth-guard-admin.service';
import { AuthGuardCustomer } from '../auth/service/auth-service/auth-guard-customer.service';
import { AuthGuardServiceProvider } from '../auth/service/auth-service/auth-guard-service-provider.service';
import { AuthGuardDriver } from '../auth/service/auth-service/auth-guard-driver.service';

export const routes: Routes = [

    {
        path: 'pages',
        component: Pages,
        canActivate: [AuthGuard],
        children: [
            { path: 'dashboard', loadChildren: 'app/pages/dashboard/dashboard.module#DashboardModule' },
            { path: 'users', loadChildren: 'app/pages/users/users.module#UsersModule' },
            { path: 'payments', loadChildren: 'app/pages/payments/payments.module#PaymentsModule', canActivate: [AuthGuardAdmin] },
            { path: 'settings', loadChildren: 'app/pages/settings/settings.module#SettingsModule' },
            { path: 'subscriptions', loadChildren: 'app/pages/subscriptions/subscriptions.module#SubscriptionsModule' },
            { path: 'jobs', loadChildren: 'app/pages/jobs/jobs.module#JobsModule' },
            { path: 'notification', loadChildren: 'app/pages/notification/notifications.module#NotificationsModule' },
            { path: 'feedbacks', loadChildren: 'app/pages/feedbacks/feedbacks.module#FeedbacksModule' },
            { path: 'helpcenter', loadChildren: 'app/pages/help-center/help-center.module#HelpCenterModule' },
            { path: 'appversion', loadChildren: 'app/pages/app-version/app-version.module#AppVersionModule' },
            { path: 'changepassword', loadChildren: 'app/pages/change-password/change-password.module#ChangePasswordModule' } 
        ]
    }
];

export const routing: ModuleWithProviders = RouterModule.forChild(routes);
