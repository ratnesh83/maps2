import { Component, ViewChild, ViewChildren, QueryList, ElementRef, Renderer } from '@angular/core';
import { Store } from '@ngrx/store';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { MdDialog } from '@angular/material';
import * as setting from '../../state/setting.actions';
import * as app from '../../../../state/app.actions';
import * as labor from '../../../labors/state/labor.actions';
import { FormGroup, AbstractControl, FormBuilder, Validators, FormArray } from '@angular/forms';
import { OpenDocumentModal } from '../open-document-modal/open-document-modal.component';
import { BaThemeSpinner } from '../../../../theme/services';
import { IMultiSelectOption } from 'angular-2-dropdown-multiselect';
import { ToastrService, ToastrConfig } from 'ngx-toastr';

import 'style-loader!./user-profile.scss';

@Component({
    selector: 'user-profile',
    templateUrl: './user-profile.html',
})
export class UserProfile {

    @ViewChild('file') public _fileUpload: ElementRef;
    @ViewChildren('file') public _filesUpload: QueryList<HTMLInputElement>;
    @ViewChild('scrollBottom') private _scrollContainer: ElementRef;
    @ViewChild('scrollBottomQual') private _scrollContainerQual: ElementRef;
    @ViewChild('scrollBottomExp') private _scrollContainerExp: ElementRef;
    @ViewChild('machineName') private _machineName: ElementRef;
    @ViewChild('qualificationName') private _qualificationName: ElementRef;
    @ViewChild('expertiseName') private _expertiseName: ElementRef;
    public settings;
    public form: FormGroup;
    public serviceRadii: AbstractControl;
    public imageUploading: boolean = false;
    public fileUploadIndex;
    public imageUploadChildrenArray;
    public settingStore;
    public jobItems;
    public products;
    public profile;
    public documents;
    constructor(
        private store: Store<any>,
        private modalService: NgbModal,
        private fb: FormBuilder,
        private toastrService: ToastrService,
        private renderer: Renderer,
        private baThemeSpinner: BaThemeSpinner,
        public dialog: MdDialog
    ) {
        this.baThemeSpinner.show();
        this.settingStore = this.store
            .select('setting')
            .subscribe((res: any) => {
                if (res.userDetails) {
                    this.profile = res.userDetails[0];
                    this.documents = res.userDetails[0].documents;
                }
            });


        this.store.dispatch({ type: setting.actionTypes.GET_PROFILE_INFO_ID, payload: { role: 'user' } });

    };
    bringFileSelector(): boolean {
        this.renderer.invokeElementMethod(this._fileUpload.nativeElement, 'click');
        return false;
    }
    bringFilesSelector(index): boolean {
        this.renderer.invokeElementMethod(this.imageUploadChildrenArray[index].nativeElement, 'click');
        return false;
    }

    scrollToBottom() {
        if (this._machineName) {
            setTimeout(() => {
                this._machineName.nativeElement.focus();
            }, 500);
            jQuery('html, body').animate({ scrollTop: this._scrollContainer.nativeElement.scrollHeight }, { duration: 500 });
        }
    }

    scrollToBottomQual() {
        if (this._qualificationName) {
            setTimeout(() => {
                this._qualificationName.nativeElement.focus();
            }, 500);
            jQuery('html, body').animate({ scrollTop: this._scrollContainerQual.nativeElement.scrollHeight }, { duration: 500 });
        }
    }

    scrollToBottomExp() {
        if (this._expertiseName) {
            setTimeout(() => {
                this._expertiseName.nativeElement.focus();
            }, 500);
            jQuery('html, body').animate({ scrollTop: this._scrollContainerExp.nativeElement.scrollHeight + this._scrollContainerQual.nativeElement.scrollHeight }, { duration: 500 });
        }
    }

    checkFileSize(size): boolean {
        if (size > 5000000) {
            return false;
        } else {
            return true;
        }
    }

    checkFileType(type): boolean {
        if (type.indexOf('image') != -1) {
            return true;
        } else {
            return false;
        }
    }

    ngOnInit() {
        this.jobItems = [
            {
                title: 'Labor required',
                subTitle: 'Construction: Concre',
                imgPath: 'assets/img/crane.svg',
                rate: 40,
                location: '1245 West Broadway, Vancouver.',
            },
            {
                title: 'Labor required',
                subTitle: 'Construction: Concre',
                imgPath: 'assets/img/electrical.svg',
                rate: 40,
                location: '1245 West Broadway, Vancouver.',
            },
            {
                title: 'Labor required',
                subTitle: 'Construction: Concre',
                imgPath: 'assets/img/heart.svg',
                rate: 40,
                location: '1245 West Broadway, Vancouver.',
            },
            {
                title: 'Labor required',
                subTitle: 'Construction: Concre',
                imgPath: 'assets/img/teeth.svg',
                rate: 40,
                location: '1245 West Broadway, Vancouver.',
            }
        ];
        this.products = [
            {
                title: 'Donec facilisis',
                subTitle: 'Last updated: Yesterday 3:41 AM ',
                imgPath: 'assets/img/product_img_1.png'
            },
            {
                title: 'Donec facilisis',
                subTitle: 'Last updated: Yesterday 3:41 AM ',
                imgPath: 'assets/img/product_img_2.png'
            },
            {
                title: 'Donec facilisis',
                subTitle: 'Last updated: Yesterday 3:41 AM ',
                imgPath: 'assets/img/product_img_3.png'
            }
        ];

    }

    ngOnDestroy() {
        localStorage.removeItem('userId');
    }

    ngAfterViewInit() {
        this.imageUploadChildrenArray = this._filesUpload.toArray();
        this._filesUpload.changes.subscribe(childern => {
            this.imageUploadChildrenArray = childern.toArray();
        });
    }

    openDocument(document) {
        if (document && document.toString() && (document.toString().toLowerCase().indexOf('.jpg') != -1 || document.toString().toLowerCase().indexOf('.jpeg') != -1) || document.toString().toLowerCase().indexOf('.png') != -1) {
            let dialogRef = this.dialog.open(OpenDocumentModal);
            dialogRef.componentInstance.document = document;
        }
    }

    _keyPressCsvNumber(event: any) {
        const pattern = /^[0-9,]*$/;
        let inputChar = event.target.value + String.fromCharCode(event.charCode);
        if (!pattern.test(inputChar)) {
            event.preventDefault();
        }
    }
}