import { NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { StoreLogMonitorModule, useLogMonitor } from '@ngrx/store-log-monitor';
import { EffectsModule } from '@ngrx/effects';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { app, AppEffects } from './state';
import { auth, AuthEffects } from './auth/state';
import { payment, PaymentEffects } from './pages/payments/state';
import { home, HomeEffects } from './pages/home/state';
import { customer, worker, employer, UserEffects } from './pages/users/state';
import { setting, SettingEffects } from './pages/settings/state';
import { donation, DonationsEffects } from './pages/donations/state';
import { job, JobEffects } from './pages/jobs/state';
import { labor, LaborEffects } from './pages/labors/state';
import { laborList, LaborListEffects } from './pages/labor-list/state';
import { post, PostEffects } from './pages/posts/state';
import { request, RequestEffects } from './pages/requests/state';
import { subscription, SubscriptionEffects } from './pages/subscriptions/state';
import { notification, NotificationEffects } from './pages/notification/state';
import { feedback, FeedbackEffects } from './pages/feedbacks/state';

@NgModule({
    imports: [
        StoreModule.provideStore({
            app,
            auth,
            payment,
            home,
            customer,
            worker,
            employer,
            job,
            labor,
            laborList,
            post,
            request,
            donation,
            notification,
            setting,
            subscription,
            feedback,
        }),

        StoreDevtoolsModule.instrumentStore({
            monitor: useLogMonitor({
                visible: false,
                position: 'right'
            })
        }),

        EffectsModule.run(AppEffects),
        EffectsModule.run(AuthEffects),
        EffectsModule.run(PaymentEffects),
        EffectsModule.run(HomeEffects),
        EffectsModule.run(UserEffects),
        EffectsModule.run(NotificationEffects),
        EffectsModule.run(SettingEffects),
        EffectsModule.run(SubscriptionEffects),
        EffectsModule.run(FeedbackEffects),
        EffectsModule.run(JobEffects),
        EffectsModule.run(LaborEffects),
        EffectsModule.run(LaborListEffects),
        EffectsModule.run(DonationsEffects),
        EffectsModule.run(PostEffects),
        EffectsModule.run(RequestEffects)
    ],
})

export class AppStoreModule { }
