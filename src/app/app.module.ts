import { NgModule, ApplicationRef } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';
import { removeNgStyles, createNewHosts, createInputTransfer } from '@angularclass/hmr';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { AdminAuthModule } from './auth/auth.module';
import { AUTH_PROVIDERS, provideAuth, JwtHelper } from 'angular2-jwt';
import { AuthGuard } from './auth/service/auth-service/auth-guard.service';
import { AuthGuardPublic } from './auth/service/auth-service/auth-guard-public.service';
import { AuthService } from './auth/service/auth-service/auth.service';

import { AuthGuardAdmin } from './auth/service/auth-service/auth-guard-admin.service';
import { AuthGuardCustomer } from './auth/service/auth-service/auth-guard-customer.service';
import { AuthGuardServiceProvider } from './auth/service/auth-service/auth-guard-service-provider.service';
import { AuthGuardDriver } from './auth/service/auth-service/auth-guard-driver.service';

import { CommonService } from './services/common.service';
import { UserService } from './services/user-service/user.service';
import { DataService } from './services/data-service/data.service';
import { JobService } from './services/job-service/job.service';
import { PostService } from './services/post-service/post.service';
import { FeedbackService } from './services/feedback-service/feedback.service';
import { ChangePasswordService } from './services/change-password/change-password.service';
import { HomeService } from './services/home-service/home.service';
import { NotificationService } from './services/notification/notification.service';
import { ApiService } from './services/api-service/api.service';
import { SettingsService } from './services/settings/settings.service';
import { SubscriptionService } from './services/subscription/subscription.service';
import { NgxPaginationModule } from 'ngx-pagination';
import { ToastModule } from 'ng2-toastr/ng2-toastr';

/*
 * Platform and Environment providers/directives/pipes
 */
import { ENV_PROVIDERS } from './environment';
import { routing } from './app.routing';

// App is our top level component
import { App } from './app.component';
import { AppState, InternalStateType } from './app.service';
import { AppStoreModule } from './app.store';
import { GlobalState } from './global.state';
import { NgaModule } from './theme/nga.module';
import { PagesModule } from './pages/pages.module';
import { ToastrModule } from 'ngx-toastr';
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { PublicPageModule } from './publicPages/public-pages.module';
import { CustomOption } from './theme/components/toaster/toaster-option';
import { ToastOptions } from 'ng2-toastr/src/toast-options';
import { FacebookModule } from 'ngx-facebook';
import { AngularFireModule } from 'angularfire2';
import { AngularFireAuthModule, AngularFireAuth } from 'angularfire2/auth';

// Application wide providers
const APP_PROVIDERS = [
    AppState,
    GlobalState
];

export const firebaseConfig = {
    apiKey: 'AIzaSyA15lGgPiGwKbYPonteaKgx8WoNUdkoPy8',
    authDomain: 'labor-go.firebaseapp.com',
    databaseURL: 'https://labor-go.firebaseio.com',
    storageBucket: 'labor-go.appspot.com',
    messagingSenderId: '602227286001'
};

export type StoreType = {
    state: InternalStateType,
    restoreInputValues: () => void,
    disposeOldHosts: () => void
};

/**
 *  AppModule` is the main entry point into Angular2's bootstraping process
 */
@NgModule({
    bootstrap: [App],
    declarations: [
        App
    ],
    imports: [
        BrowserModule,
        HttpModule,
        RouterModule,
        FormsModule,
        AdminAuthModule,
        BrowserAnimationsModule,
        CommonModule,
        FacebookModule.forRoot(),
        ToastModule.forRoot(),
        ToastrModule.forRoot({
            positionClass: 'toast-bottom-left',
            preventDuplicates: true,
            enableHtml: true
        }),
        AngularFireModule.initializeApp(firebaseConfig),
        AngularFireAuthModule,
        AppStoreModule,
        ReactiveFormsModule,
        NgaModule.forRoot(),
        NgbModule.forRoot(),
        PagesModule,
        PublicPageModule,
        NgxPaginationModule,
        routing
    ],
    providers: [
        ENV_PROVIDERS,
        APP_PROVIDERS,
        AuthService,
        UserService,
        DataService,
        JobService,
        PostService,
        FeedbackService,
        NgbActiveModal,
        CommonService,
        HomeService,
        ApiService,
        AuthGuard,
        AuthGuardPublic,
        AuthGuardAdmin,
        AuthGuardCustomer,
        AuthGuardServiceProvider,
        AuthGuardDriver,
        JwtHelper,
        NotificationService,
        ChangePasswordService,
        SettingsService,
        SubscriptionService,
        provideAuth({
            headerName: 'Authorization',
            tokenName: 'token',
            tokenGetter: (() => sessionStorage.getItem('token')),
            globalHeaders: [{ 'Content-Type': 'application/json' }],
            noJwtError: true
        }),
        { provide: ToastOptions, useClass: CustomOption }
    ]
})

export class AppModule {

    constructor(public appRef: ApplicationRef,
        public appState: AppState) {
    }

    hmrOnInit(store: StoreType) {
        if (!store || !store.state) return;
        // set state
        this.appState._state = store.state;
        // set input values
        if ('restoreInputValues' in store) {
            let restoreInputValues = store.restoreInputValues;
            setTimeout(restoreInputValues);
        }
        this.appRef.tick();
        delete store.state;
        delete store.restoreInputValues;
    }

    hmrOnDestroy(store: StoreType) {
        const cmpLocation = this.appRef.components.map(cmp => cmp.location.nativeElement);
        // save state
        const state = this.appState._state;
        store.state = state;
        // recreate root elements
        store.disposeOldHosts = createNewHosts(cmpLocation);
        // save input values
        store.restoreInputValues = createInputTransfer();
        // remove styles
        removeNgStyles();
    }

    hmrAfterDestroy(store: StoreType) {
        // display new elements
        store.disposeOldHosts();
        delete store.disposeOldHosts;
    }
}
