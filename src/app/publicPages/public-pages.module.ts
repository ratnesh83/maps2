import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { routing } from './public-pages.routes';
import { PublicPages } from './public-pages.component';
import { RouterModule } from '@angular/router';
import { Login } from './components/login/login.component';
import { Register } from './components/register/register.component';
import { ForgotPassword } from './components/forgot-password/forgot-password-modal.component';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        RouterModule,
        routing
    ],
    declarations: [
        PublicPages,
        Login,
        Register,
        ForgotPassword
    ],

})

export class PublicPageModule { }
