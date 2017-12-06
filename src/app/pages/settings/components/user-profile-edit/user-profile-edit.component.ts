// import { Component, ViewChild, ViewChildren, QueryList, ElementRef, Renderer } from '@angular/core';
// import { Store } from '@ngrx/store';
// import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
// import * as setting from '../../state/setting.actions';
// import * as app from '../../../../state/app.actions';
// import { FormGroup, AbstractControl, FormBuilder, Validators, FormArray, FormControl } from '@angular/forms';
// import { BaThemeSpinner } from '../../../../theme/services';
// import { IMultiSelectOption } from 'angular-2-dropdown-multiselect';
// import { ToastrService, ToastrConfig } from 'ngx-toastr';

// import 'style-loader!./user-profile-edit.scss';
// import * as labor from '../../../labors/state/labor.actions';

// @Component({
//     selector: 'user-profile-edit',
//     templateUrl: './user-profile-edit.html',
// })
// export class UserProfileEdit {
//     selectedSubCategory: any[] = [];
//     submitted = false;
//     subCategories: any[];
//     country: any;
//     zipCode: any;
//     state: any;
//     city: any;
//     longitude: any;
//     latitude: any;
//     streetAddress: any;
//     locationAddress: any;
//     categories: any;
//     selectedCategory: any;
//     selectedCategory1;
//     subCategory: any[];


//     @ViewChild('file') public _fileUpload: ElementRef;
//     @ViewChildren('file') public _filesUpload: QueryList<HTMLInputElement>;
//     @ViewChild('scrollBottom') private _scrollContainer: ElementRef;
//     @ViewChild('scrollBottomQual') private _scrollContainerQual: ElementRef;
//     @ViewChild('scrollBottomExp') private _scrollContainerExp: ElementRef;
//     @ViewChild('machineName') private _machineName: ElementRef;
//     @ViewChild('qualificationName') private _qualificationName: ElementRef;
//     @ViewChild('expertiseName') private _expertiseName: ElementRef;
//     public settings;
//     public serviceRadii: AbstractControl;
//     public imageUploading: boolean = false;
//     public fileUploadIndex;
//     public imageUploadChildrenArray;
//     public settingStore;
//     public products;
//     public isEditMode = false;
//     public isEdited;
//     public profile;
//     public showButton;

//     public profileName;
//     public phone;
//     public profilePic;
//     public profileEmail;
//     public profileNumber;
//     public profileAddress;
//     public profileDescription;
//     public categoryId;
//     public SubCategory;
//     public a = ['a', 'b'];
//     public message = '';
//     public checkFlag: boolean = true;
//     constructor(
//         private store: Store<any>,
//         private modalService: NgbModal,
//         private fb: FormBuilder,
//         private toastrService: ToastrService,
//         private renderer: Renderer
//     ) {
//         this.settingStore = this.store
//             .select('setting')
//             .subscribe((res: any) => {
//                 console.log(res);
//                 this.profile = res;
//                 this.profilePic = res.profilePicture;
//                 this.profileName = res.fullName;
//                 this.profileNumber = res.phoneNumber;
//                 if(res.edit){
//                     this.isEditMode = res.edit;
//                 }
//                 if(res.categoryId && !res.selectedCat){
//                     this.selectedCategory1 = res.categoryId._id;
//                     this.changeCategory({isUserInput:'yes'},res.categoryId);
//                     this.selectedSubCategory = res.subCategoryIds[0]._id;
//                     this.subCategories = res.subCategories;
//                 }
//                 else{
//                     if(res.selectedCat)
//                     {
//                         this.selectedCategory = res.selectedCat.name;
//                         this.subCategories = res.subCategories;                        
//                     }
//                 }
//                 if (res.locationDetails) {
//                     this.profileAddress = res.locationDetails.addressLine1;
//                 }
//                 if (res.categoryId) {
//                     this.categoryId = res.categoryId.name;
//                 }
//                 this.profileEmail = res.email;
//                 this.profileDescription = res.description;
//             });

//         this.store.select('labor')
//             .subscribe((res: any) => {
//                 this.categories = res.categories;
//                 console.log(res);
//             });
//         this.store.dispatch({ type: setting.actionTypes.GET_PROFILE_INFO });
//         this.store.dispatch({
//             type: labor.actionTypes.APP_GET_CATEGORIES_LABOR,
//             payload: {}
//         }); 

//         this.checkFlag=true;        

//     }



//     onSubmit() {
//         console.log(this.streetAddress);
//         let fd = new FormData();
//         if(this.profilePic){
//             fd.append('profilePicture',this.profilePic);
//         }
//         if(this.profileName){
//             fd.append('fullName', this.profileName);
//         }else{
//         }
//             fd.append('description', this.profileDescription);

//             if(this.selectedCategory1){
//             fd.append('categoryId',this.selectedCategory1);
//             }else{
//             }

//             if(this.selectedSubCategory){

//             fd.append('subCategoryIds',JSON.stringify([this.selectedSubCategory]));
//             }
//             let locationDetails = {};
//             if(this.latitude && this.longitude){
//                 Object.assign(locationDetails,{'latitude': this.latitude});
//                 Object.assign(locationDetails,{'longitude': this.longitude});
//                 if(this.locationAddress){
//                     Object.assign(locationDetails,{'addressLine1': this.locationAddress});                    
//                 }
//                 if(this.city){
//                     Object.assign(locationDetails,{'city': this.city});                                      
//                 }
//                 if(this.state){
//                     Object.assign(locationDetails,{'state': this.state});                                      
//                 }
//                 if(this.country){
//                     Object.assign(locationDetails,{ 'country': this.country});                                      
//                 }
//                 if(this.zipCode){
//                     Object.assign(locationDetails,{ 'zipCode': this.zipCode});                                      
//                 }
//                 fd.append('locationDetails',JSON.stringify(locationDetails));

//             }

//             this.store.dispatch({ type: setting.actionTypes.UPDATE_PROFILE_INFO, payload: fd});

//     }
//     changeCategory(event,data){
//         if (event && event.isUserInput) {
//             this.subCategories = [];
//             this.store.dispatch({
//                 type: setting.actionTypes.APP_GET_SUB_CATEGORIES,
//                 payload: { id: data._id, selectedCategory:data  }
//             });
//         }        
//     }
//     changeSubCategory(event){
//     console.log(this.selectedSubCategory);
//     }
//     getAddress(event) {
//         console.log(event);
//         let addressComponents = event.address_components;
//         let latitude = event.geometry.location.lat();
//         let longitude = event.geometry.location.lng();
//         let formattedAddress = event.formatted_address;
//         let locationName = event.streetAddress;
//         let route = '';
//         let locality = '';
//         let city = '';
//         let state = '';
//         let country = '';
//         let postal = '';
//         for (let i = 0; i < addressComponents.length; i++) {
//             let types = addressComponents[i].types;
//             for (let j = 0; j < types.length; j++) {
//                 if (types[j] == 'administrative_area_level_1') {
//                     state = addressComponents[i].long_name;
//                 } else if (types[j] == 'administrative_area_level_2') {
//                     city = addressComponents[i].long_name;
//                 } else if (types[j] == 'locality') {
//                     locality = addressComponents[i].long_name;
//                 } else if (types[j] == 'country') {
//                     country = addressComponents[i].long_name;
//                 } else if (types[j] == 'postal_code') {
//                     postal = addressComponents[i].long_name;
//                 } else if (types[j] == 'route') {
//                     route = addressComponents[i].long_name;
//                 }
//             }
//         }
//         this.locationAddress = formattedAddress;
//         this.streetAddress = locationName;
//         this.latitude = latitude;
//         this.longitude = longitude;
//         this.city = city;
//         this.state = state;
//         this.zipCode = postal;
//         this.country = country;
//     }

//     bringFileSelector(): boolean {
//         this.renderer.invokeElementMethod(this._fileUpload.nativeElement, 'click');
//         return false;
//     }
//     bringFilesSelector(index): boolean {
//         this.renderer.invokeElementMethod(this.imageUploadChildrenArray[index].nativeElement, 'click');
//         return false;
//     }

//     scrollToBottom() {
//         if (this._machineName) {
//             setTimeout(() => {
//                 this._machineName.nativeElement.focus();
//             }, 500);
//             jQuery('html, body').animate({ scrollTop: this._scrollContainer.nativeElement.scrollHeight }, { duration: 500 });
//         }
//     }

//     scrollToBottomQual() {
//         if (this._qualificationName) {
//             setTimeout(() => {
//                 this._qualificationName.nativeElement.focus();
//             }, 500);
//             jQuery('html, body').animate({ scrollTop: this._scrollContainerQual.nativeElement.scrollHeight }, { duration: 500 });
//         }
//     }

//     scrollToBottomExp() {
//         if (this._expertiseName) {
//             setTimeout(() => {
//                 this._expertiseName.nativeElement.focus();
//             }, 500);
//             jQuery('html, body').animate({ scrollTop: this._scrollContainerExp.nativeElement.scrollHeight + this._scrollContainerQual.nativeElement.scrollHeight }, { duration: 500 });
//         }
//     }

//     checkFileSize(size): boolean {
//         if (size > 5000000) {
//             return false;
//         } else {
//             return true;
//         }
//     }

//     checkFileType(type): boolean {
//         if (type.indexOf('image') != -1) {
//             return true;
//         } else {
//             return false;
//         }
//     }

//     ngOnInit() {
//         this.products = [
//             {
//                 title: 'Donec facilisis',
//                 subTitle: 'Last updated: Yesterday 3:41 AM ',
//                 imgPath: 'assets/img/product_img_1.png'
//             },
//             {
//                 title: 'Donec facilisis',
//                 subTitle: 'Last updated: Yesterday 3:41 AM ',
//                 imgPath: 'assets/img/product_img_2.png'
//             },
//             {
//                 title: 'Donec facilisis',
//                 subTitle: 'Last updated: Yesterday 3:41 AM ',
//                 imgPath: 'assets/img/product_img_3.png'
//             }
//         ];
//         this.profile = {
//             contactPerson: 'James Smith',
//             contactNumber: '+1 9888611221',
//             address: '1245 West Broadway, Vancouver…',
//             category: 'Health Care',
//             description: 'Donec facilisis tortor ut augue lacinia, at viverra est semp Donec facilisis tortor ut augue lacinia, at viverra est semp.'
//         };
//     }

//     ngOnDestroy() {
//         /* if (this.settingStore) {
//             this.settingStore.unsubscribe();
//         } */
//     }
//     ngAfterViewInit() {

//     }
//     _keyPressCsvNumber(event: any) {
//         const pattern = /^[0-9,]*$/;
//         let inputChar = event.target.value + String.fromCharCode(event.charCode);
//         if (!pattern.test(inputChar)) {
//             event.preventDefault();
//         }
//     }
//     toogleEdit() {
//         this.isEditMode = !this.isEditMode;
//         console.log(this.isEditMode);
//     }
//       //==============Get image============
//   getImage = (data: any): any =>{
//     let fileObject = data.target.files[0];
//     let imageType = /image.*/;
//     if (!fileObject.type.match(imageType)) {
//       return;
//     }

//     this.profilePic = data.target.files[0];
//     // var photoss=data.target.value.split('.');
//     //========only image===========
//     // if(photoss[photoss.length-1]=='png' || photoss[photoss.length-1]=='jpeg' || photoss[photoss.length-1]=='jpg' || photoss[photoss.length-1]=='svg')
//     // {

//       this.checkFlag=true;
//       let reader  = new FileReader();
//       reader.addEventListener('load', () =>{
//         document.getElementById('previewImage').setAttribute('src',reader.result) ;
//       }, false);
//       this.showButton=true;
//       if (fileObject) {
//         reader.readAsDataURL(fileObject);
//       }
//     }
//     triggerEvent = () =>{
//         document.getElementById('chooseFile').click();
//       }

//   //==============update new image============
//   makeValueNull = (data: any): any =>{
//     data.srcElement.value = null;
//   }
// }
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
import * as labor from '../../../labors/state/labor.actions';

@Component({
    selector: 'user-profile-edit',
    templateUrl: './user-profile-edit.html',
})
export class UserProfileEdit {
    selectedSubCategory: any;
    selectedCategory: any;
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
    public changePic;

    public categories = [];
    public subCategories = [];

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
                this.categories = res.categories;
                if (res.locationDetails) {
                    this.profileAddress = res.locationDetails.addressLine1;
                }
                if (res.categoryId && !res.selectedCat) {
                    this.selectedCategory = res.categoryId._id;
                    this.changeCategory({ isUserInput: 'yes' }, res.categoryId, false);
                    this.selectedSubCategory = res.subCategoryIds[0]._id;
                    this.subCategories = res.subCategories;
                }
                else {
                    if (res.selectedCat && Array.isArray(res.subCategories)) {
                        this.selectedCategory = res.selectedCat._id;
                        this.subCategories = res.subCategories;
                    }
                }
                this.profileEmail = res.email;
                this.profileDescription = res.description;
                this.isEditMode = res.edit;                                      

            });


        this.store.dispatch({ type: setting.actionTypes.GET_PROFILE_INFO });
        this.store.dispatch({
            type: setting.actionTypes.APP_GET_CATEGORIES_EDIT,
            payload: {}
        });

    }

    onSubmit() {
        let fd = new FormData();
        if (this.profileName) {
            fd.append('fullName', this.profileName);
        }
        fd.append('description', this.profileDescription);

        if (this.changePic) {
            fd.append('profilePicture', this.changePic);
        }
        if (this.selectedCategory) {
            fd.append('categoryId', this.selectedCategory);
        }
        if (this.selectedSubCategory) {         
            fd.append('subCategoryIds', JSON.stringify([this.selectedSubCategory]));
        }
        let locationDetails = {};
        if (this.latitude && this.longitude) {
            Object.assign(locationDetails, { 'latitude': this.latitude });
            Object.assign(locationDetails, { 'longitude': this.longitude });
            if (this.locationAddress) {
                Object.assign(locationDetails, { 'addressLine1': this.locationAddress });
            }
            if (this.city) {
                Object.assign(locationDetails, { 'city': this.city });
            }
            if (this.state) {
                Object.assign(locationDetails, { 'state': this.state });
            }
            if (this.country) {
                Object.assign(locationDetails, { 'country': this.country });
            }
            if (this.zipCode) {
                Object.assign(locationDetails, { 'zipCode': this.zipCode });
            }
            fd.append('locationDetails', JSON.stringify(locationDetails));
        }
       this.store.dispatch({ type: setting.actionTypes.UPDATE_PROFILE_INFO, payload: fd });
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
        this.locationAddress = formattedAddress;
        this.streetAddress = locationName;
        this.latitude = latitude;
        this.longitude = longitude;
        this.city = city;
        this.state = state;
        this.zipCode = postal;
        this.country = country;
        console.log(this.locationAddress);
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
        this.profile = {
            contactPerson: 'James Smith',
            contactNumber: '+1 9888611221',
            address: '1245 West Broadway, Vancouver…',
            category: 'Health Care',
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
    toogleEdit() {
        this.isEditMode = !this.isEditMode;
        console.log(this.isEditMode);
    }
    changeCategory(event, data, editmode) {
        if (event && event.isUserInput) {
            this.subCategories = [];
            this.store.dispatch({
                type: setting.actionTypes.APP_GET_SUB_CATEGORIES,
                payload: { id: data._id, selectedCategory: data, edit: editmode  }
            });
        }
    }

    getImage = (data: any): any => {
        let fileObject = data.target.files[0];
        let imageType = /image.*/;
        if (!fileObject.type.match(imageType)) {
            return;
        }

        this.changePic = data.target.files[0];
        let reader = new FileReader();
        reader.addEventListener('load', () => {
            document.getElementById('previewImage').setAttribute('src', reader.result);
        }, false);
        if (fileObject) {
            reader.readAsDataURL(fileObject);
        }
    }
    triggerEvent = () => {
        document.getElementById('chooseFile').click();
    }

    //==============update new image============
    makeValueNull = (data: any): any => {
        data.srcElement.value = null;
    }

}