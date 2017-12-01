import { Component, ViewChild, ViewChildren, QueryList, ElementRef, Renderer } from '@angular/core';
import { Store } from '@ngrx/store';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';
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
    country: any;
    zipCode: any;
    state: any;
    city: any;
    longitude: any;
    latitude: any;
    streetAddress: any;
    locationAddress: any;

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
    public profileNumber;
    public profileAddress;
    public profileDescription;
    public categoryId;

    constructor(
        private store: Store<any>,
        private modalService: NgbModal,
        private fb: FormBuilder,
        private toastrService: ToastrService,
        private renderer: Renderer,
        private router: Router
    ) {
        this.settingStore = this.store
            .select('setting')
            .subscribe((res: any) => {
                console.log(res); 
                this.profile = res; 
                this.profilePic = res.profilePicture;                
                this.profileName = res.fullName;
                this.profileNumber = res.phoneNumber;  
                if(res.locationDetails)
                {        
                this.profileAddress = res.locationDetails.addressLine1;
                }
                if(res.categoryId){
                this.categoryId = res.categoryId.name;
                }
                this.profileEmail = res.email;
                this.profileDescription = res.description; 
                this.isEditMode = false;                    
            });
            this.store.dispatch({ type: setting.actionTypes.GET_PROFILE_INFO});   
                             
    }

    onSubmit(){
      
          let fd = new FormData();
          if(this.profileName){
          fd.append('fullName',this.profileName);   
          fd.append('description',this.profileDescription); 
          }
          this.store.dispatch({type: setting.actionTypes.UPDATE_PROFILE_INFO, payload: fd});
        }
        getAddress(event) {
            let addressComponents = event.address_components;
            let latitude = event.geometry.location.lat();
            let longitude = event.geometry.location.lng();
            let formattedAddress = event.formatted_address;
            let locationName = event.streetAddress;
            let route = '';
            let locality = '';
            let city = '';
            let state = '';
            let country = '';
            let postal = '';
            for (let i = 0; i < addressComponents.length; i++) {
                let types = addressComponents[i].types;
                for (let j = 0; j < types.length; j++) {
                    if (types[j] == 'administrative_area_level_1') {
                        state = addressComponents[i].long_name;
                    } else if (types[j] == 'administrative_area_level_2') {
                        city = addressComponents[i].long_name;
                    } else if (types[j] == 'locality') {
                        locality = addressComponents[i].long_name;
                    } else if (types[j] == 'country') {
                        country = addressComponents[i].long_name;
                    } else if (types[j] == 'postal_code') {
                        postal = addressComponents[i].long_name;
                    } else if (types[j] == 'route') {
                        route = addressComponents[i].long_name;
                    }
                }
            }
            this.locationAddress.setValue(formattedAddress);
            this.streetAddress.setValue(locationName);
            this.latitude.setValue(latitude);
            this.longitude.setValue(longitude);
            this.city.setValue(city);
            this.state.setValue(state);
            this.zipCode.setValue(postal);
            this.country.setValue(country);
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

    openCalendar() {
        this.router.navigate(['/pages/settings/calender']);
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