import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { NgaModule } from '../theme/nga.module';
import { UserService } from './service/user-service/user.service';
import { AuthGuard } from './service/auth-service/auth-guard.service';
import { AuthService } from './service/auth-service/auth.service';
// import { AuthPublicPagesService } from './service/auth-guard-public-pages/auth-public.service';



@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        RouterModule,
        NgaModule
    ],
    declarations: [

    ],
    providers: [
        UserService,
        AuthGuard,
        AuthService
    ]
})
export class AdminAuthModule { }
