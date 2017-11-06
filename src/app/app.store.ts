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
import { job, JobEffects } from './pages/jobs/state';
import { subscription, SubscriptionEffects } from './pages/subscriptions/state';
import { notification, NotificationEffects } from './pages/notification/state';
import { pass, ChangePasswordEffects } from './pages/change-password/state';
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
            notification,
            setting,
            subscription,
            pass,
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
        EffectsModule.run(ChangePasswordEffects),
        EffectsModule.run(FeedbackEffects),
        EffectsModule.run(JobEffects)
    ],
})

export class AppStoreModule { }
