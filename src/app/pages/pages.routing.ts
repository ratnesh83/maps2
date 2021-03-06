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
            { path: 'home', loadChildren: 'app/pages/home/home.module#HomeModule' },
            { path: 'payments', loadChildren: 'app/pages/payments/payments.module#PaymentsModule' },
            { path: 'settings', loadChildren: 'app/pages/settings/settings.module#SettingsModule' },
            { path: 'subscriptions', loadChildren: 'app/pages/subscriptions/subscriptions.module#SubscriptionsModule' },
            { path: 'jobs', loadChildren: 'app/pages/jobs/jobs.module#JobsModule', canActivate: [AuthGuardCustomer] },
            { path: 'labors', loadChildren: 'app/pages/labors/labors.module#LaborsModule' },
            { path: 'posts', loadChildren: 'app/pages/posts/posts.module#PostsModule' },
            { path: 'requests', loadChildren: 'app/pages/requests/requests.module#RequestsModule' },
            { path: 'mynetworks', loadChildren: 'app/pages/my-networks/my-networks.module#MyNetworksModule' },
            { path: 'notification', loadChildren: 'app/pages/notification/notifications.module#NotificationsModule' },
            { path: 'feedbacks', loadChildren: 'app/pages/feedbacks/feedbacks.module#FeedbacksModule' },
            { path: 'helpcenter', loadChildren: 'app/pages/help-center/help-center.module#HelpCenterModule' },
            { path: 'appversion', loadChildren: 'app/pages/app-version/app-version.module#AppVersionModule' },
            { path: 'donations', loadChildren: 'app/pages/donations/donations.module#DonationsModule' }
        ]
    }
];

export const routing: ModuleWithProviders = RouterModule.forChild(routes);
