import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { GooglePlaceModule } from 'ng2-google-place-autocomplete';
import { routing } from './public-pages.routes';
import { PublicPages } from './public-pages.component';
import { RouterModule } from '@angular/router';
import { Login } from './components/login/login.component';
import { Register } from './components/register/register.component';
import { Address } from './components/address/address.component';
import { Documents } from './components/document/document.component';
import { Verification } from './components/verification/verification.component';
import { Terms } from './components/terms/terms.component';
import { VerificationEmail } from './components/verification-email/verification-email.component';
import { VerificationMobile } from './components/verification-mobile/verification-mobile.component';
import { ForgotPasswordDialog } from './components/forgot-password-dialog/forgot-password-dialog.component';
import { ChangeMobileDialog } from './components/change-mobile-dialog/change-mobile-dialog.component';
import { ChangeEmailDialog } from './components/change-email-dialog/change-email-dialog.component';
import { ChangePasswordDialog } from './components/change-password-dialog/change-password-dialog.component';
import { ApprovalDialog } from './components/approval-dialog/approval-dialog.component';
import {
    MdInputModule,
    MdButtonModule,
    MdAutocompleteModule,
    MdIconModule,
    MdCheckboxModule,
    MdRadioModule,
    MdDialogModule,
    MdTooltipModule
} from '@angular/material';
import { FileUploadModule } from 'ng2-file-upload';


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
        MdTooltipModule,
        GooglePlaceModule,
        FileUploadModule
    ],
    declarations: [
        PublicPages,
        Login,
        Register,
        Address,
        Documents,
        Verification,
        Terms,
        VerificationEmail,
        VerificationMobile,
        ForgotPasswordDialog,
        ChangeMobileDialog,
        ChangeEmailDialog,
        ChangePasswordDialog,
        ApprovalDialog
    ],
    entryComponents: [
        ForgotPasswordDialog,
        ChangeMobileDialog,
        ChangeEmailDialog,
        ChangePasswordDialog,
        ApprovalDialog
    ]
})
export class PublicPageModule { }
