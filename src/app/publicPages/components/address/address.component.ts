import { Component, ChangeDetectorRef, ViewChild, ElementRef } from '@angular/core';
import { Store } from '@ngrx/store';
import * as auth from '../../../auth/state/auth.actions';
import { Observable } from 'rxjs/Observable';
import { DataService } from '../../../services/data-service/data.service';
import { FormGroup, AbstractControl, FormBuilder, Validators } from '@angular/forms';
import { ToastrService, ToastrConfig } from 'ngx-toastr';

import 'style-loader!./address.scss';

@Component({
    selector: 'location',
    templateUrl: './address.html',
})
export class Address {

    @ViewChild('inputLocationAddress') public _locationAddress: ElementRef;
    @ViewChild('inputStreetAddress') public _streetAddress: ElementRef;
    @ViewChild('inputCity') public _city: ElementRef;
    @ViewChild('inputState') public _state: ElementRef;
    @ViewChild('inputZipCode') public _zipCode: ElementRef;
    @ViewChild('inputCountry') public _country: ElementRef;
    public storeData;
    public form: FormGroup;
    public streetAddress: AbstractControl;
    public locationAddress: AbstractControl;
    public city: AbstractControl;
    public zipCode: AbstractControl;
    public state: AbstractControl;
    public country: AbstractControl;
    public latitude: AbstractControl;
    public longitude: AbstractControl;
    public userId;

    public submitted: boolean = false;

    constructor(private fb: FormBuilder,
        private store: Store<any>,
        private cdRef: ChangeDetectorRef,
        private toastrService: ToastrService,
        private dataService: DataService) {

        this.storeData = this.store
            .select('auth')
            .subscribe((res: any) => {

            });

        this.form = fb.group({
            'streetAddress': [''],
            'locationAddress': ['', Validators.compose([Validators.required])],
            'latitude': ['', Validators.compose([Validators.required])],
            'longitude': ['', Validators.compose([Validators.required])],
            'city': ['', Validators.compose([Validators.required])],
            'state': ['', Validators.compose([Validators.required])],
            'zipCode': ['', Validators.compose([Validators.required])],
            'country': ['', Validators.compose([Validators.required])]
        });

        this.streetAddress = this.form.controls['streetAddress'];
        this.locationAddress = this.form.controls['locationAddress'];
        this.latitude = this.form.controls['latitude'];
        this.longitude = this.form.controls['longitude'];
        this.city = this.form.controls['city'];
        this.state = this.form.controls['state'];
        this.zipCode = this.form.controls['zipCode'];
        this.country = this.form.controls['country'];
    }

    ngOnInit() {
        if (this.dataService.getUserRegisterationId()) {
            this.userId = this.dataService.getUserRegisterationId();
        }
    }

    ngOnDestroy() {
        if (this.storeData) {
            // this.storeData.unsubscribe();
        }
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

    onSubmit() {

        this.submitted = true;
        if (this.dataService.getUserRegisterationId()) {
            this.userId = this.dataService.getUserRegisterationId();
        }
        if(!this.locationAddress.value) {
            this.toastrService.clear();
            this.toastrService.error('Street address 1 is required', 'Error');
            if(this._locationAddress) {
                this._locationAddress.nativeElement.focus();
            }
            return;
        }
        if (!this.latitude.value || !this.longitude.value) {
            this.toastrService.clear();
            this.toastrService.error('Please select a location from google autocomplete', 'Error');
            if (this._locationAddress) {
                this._locationAddress.nativeElement.focus();
            }
            return;
        }
        if(!this.city.value) {
            this.toastrService.clear();
            this.toastrService.error('City is required', 'Error');
            if(this._city) {
                this._city.nativeElement.focus();
            }
            return;
        }
        if(!this.state.value) {
            this.toastrService.clear();
            this.toastrService.error('State is required', 'Error');
            if(this._state) {
                this._state.nativeElement.focus();
            }
            return;
        }
        if(!this.zipCode.value) {
            this.toastrService.clear();
            this.toastrService.error('Zip code is required', 'Error');
            if(this._zipCode) {
                this._zipCode.nativeElement.focus();
            }
            return;
        }
        if(!this.country.value) {
            this.toastrService.clear();
            this.toastrService.error('Country is required', 'Error');
            if(this._country) {
                this._country.nativeElement.focus();
            }
            return;
        }

        let locationDetails = {
            latitude: this.latitude.value,
            longitude: this.longitude.value,
            addressLine1: this.locationAddress.value,
            addressLine2: this.streetAddress.value || '',
            city: this.city.value,
            state: this.state.value,
            country: this.country.value,
            zipCode: this.zipCode.value
        };

        if(!this.streetAddress.value) {
            delete locationDetails.addressLine2;
        }

        let data = {
            userId: this.userId,
            locationDetails: locationDetails,
            stepNumber: 2
        };

        this.store.dispatch({
            type: auth.actionTypes.AUTH_REGISTER_ADDRESS,
            payload: data
        });
    }

    _keyPressNumber(event: any) {
        const pattern = /^[0-9]*$/;
        let inputChar = event.target.value + String.fromCharCode(event.charCode);
        if (event.charCode != 0 && !pattern.test(inputChar)) {
            event.preventDefault();
        }
    }
}
