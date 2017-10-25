import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { routing } from './public-pages.routes';
import { PublicPages } from './public-pages.component';
import { RouterModule } from '@angular/router';
import { Login } from './components/login/login.component';
import { Register } from './components/register/register.component';
import { Address } from './components/address/address.component';
import { Documents } from './components/document/document.component';
import { ForgotPasswordDialog } from './components/forgot-password-dialog/forgot-password-dialog.component';
import {
    MdInputModule,
    MdButtonModule,
    MdAutocompleteModule,
    MdIconModule,
    MdCheckboxModule,
    MdRadioModule,
    MdDialogModule,
} from '@angular/material';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        RouterModule,
        routing,
        MdInputModule,
        MdButtonModule,
        MdAutocompleteModule,
        MdIconModule,
        MdCheckboxModule,
        MdRadioModule,
        MdDialogModule,
    ],
    declarations: [
        PublicPages,
        Login,
        Register,
        Address,
        Documents,
        ForgotPasswordDialog
    ],
    entryComponents: [
        ForgotPasswordDialog
    ]
})

export class PublicPageModule { }
