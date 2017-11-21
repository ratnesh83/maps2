import { Component, ViewChild, ViewChildren, QueryList, ElementRef, Renderer } from '@angular/core';
import { Store } from '@ngrx/store';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import * as setting from '../../state/setting.actions';
import * as app from '../../../../state/app.actions';
import { FormGroup, AbstractControl, FormBuilder, Validators, FormArray } from '@angular/forms';
import { BaThemeSpinner } from '../../../../theme/services';
import { IMultiSelectOption } from 'angular-2-dropdown-multiselect';
import { ToastrService, ToastrConfig } from 'ngx-toastr';

import 'style-loader!./user-profile-edit.scss';

@Component({
    selector: 'user-profile-edit',
    templateUrl: './user-profile-edit.html',
})
export class UserProfileEdit {

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
    public products;
    public isEditMode = false;
    public isEdited;
    public profile;

    public profileName;
    public profilePic;
    public profileEmail;
    public profileContactNo;
    public profileAddress;
    public profileDescription;

    constructor(
        private store: Store<any>,
        private modalService: NgbModal,
        private fb: FormBuilder,
        private toastrService: ToastrService,
        private renderer: Renderer
    ) {
        this.settingStore = this.store
            .select('setting')
            .subscribe((res: any) => {
                console.log(res); 
                this.profile = res; 
                this.profileName = res.fullName;
                this.profileContactNo = res.phoneNumber;  
                if(res.locationDetails)
                {        
                this.profileAddress = res.locationDetails.addressLine1;
                }
                this.profileEmail = res.email;
                this.profileDescription = res.description;     
            });
            this.store.dispatch({ type: setting.actionTypes.GET_PROFILE_INFO});                        
    }

    onSubmit(){
      
          let fd = new FormData();
          if(this.profileName){
          fd.append('fullName',this.profileName);
          }
          this.store.dispatch({type: setting.actionTypes.UPDATE_PROFILE_INFO, payload: fd});
        }
      
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
        this.profile ={
            contactPerson:'James Smith',
            contactNumber:'+1 9888611221',
            address:'1245 West Broadway, Vancouver…',
            category:'Health Care',
            description: 'Donec facilisis tortor ut augue lacinia, at viverra est semp Donec facilisis tortor ut augue lacinia, at viverra est semp.'
        };
    }

    ngOnDestroy() {
        /* if (this.settingStore) {
            this.settingStore.unsubscribe();
        } */
    }
    ngAfterViewInit() {
        
    }
    _keyPressCsvNumber(event: any) {
        const pattern = /^[0-9,]*$/;
        let inputChar = event.target.value + String.fromCharCode(event.charCode);
        if (!pattern.test(inputChar)) {
            event.preventDefault();
        }
    }
    toogleEdit(){
        this.isEditMode = !this.isEditMode;
        console.log(this.isEditMode);
    }
}